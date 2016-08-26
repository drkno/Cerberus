/*
 * PcrNetwork
 * Network communication component of the PCR1000 Library
 * 
 * Copyright Matthew Knox © 2013-Present.
 * This program is distributed with no warentee or garentee
 * what so ever. Do what you want with it as long as attribution
 * to the origional authour and this comment is provided at the
 * top of this source file and any derivative works. Also any
 * modifications must be in real Australian, New Zealand or
 * British English where the language allows.
 */

const net = require('net'),
    EventEmitter = require('events');

let Debug = {
    WriteLine: (text) => {
        console.log(text);
    }
};

class ClientRequestCode {};
ClientRequestCode.prototype.UNKNOWN = 0;
ClientRequestCode.prototype.ECHO = 1;
ClientRequestCode.prototype.HASCONTROL = 2;
ClientRequestCode.prototype.TAKECONTROL = 3;
ClientRequestCode.prototype.DISCONNECT = 4;

class ClientResponseCode {};

// Client Hello
ClientResponseCode.prototype.ERR_HELLO_NOTFOUND = 0;
ClientResponseCode.prototype.ERR_HELLO_INVALID = 1;
ClientResponseCode.prototype.WAR_HELLO_UNKNOWN = 2;
ClientResponseCode.prototype.ERR_PROTOVER_TOOOLD = 3;
ClientResponseCode.prototype.SUC_HELLO_PASSED = 4;

// Auth
ClientResponseCode.prototype.INF_AUTH_REQUIRED = 6;
ClientResponseCode.prototype.ERR_AUTH_NOTFOUND = 7;
ClientResponseCode.prototype.ERR_AUTH_INVALID = 8;
ClientResponseCode.prototype.ERR_AUTH_INCORRECT = 9;
ClientResponseCode.prototype.SUC_AUTH_PASSED = 10;

// Other
ClientResponseCode.prototype.SUC_ECHO_RESPONSE = 11;
ClientResponseCode.prototype.SUC_HASCONTROL_RESPONSE = 12;
ClientResponseCode.prototype.SUC_TAKECONTROL_RESPONSE = 13;
ClientResponseCode.prototype.WAR_COMMAND_UNKNOWN = 14;
ClientResponseCode.prototype.INF_CLIENT_DISCONNECT = 15;

// Query
ClientResponseCode.prototype.ERR_QUERY_FAILED = 16;
ClientResponseCode.prototype.ERR_HASCONTROL_RESPONSE = 17;

const ServerPrefix = "$";

/// <summary>
/// Received message structure.
/// </summary>
class RecvMsg
{
    constructor(msg, time) {
	    /// <summary>
	    /// The message received.
	    /// </summary>
	    this.Message = msg;

	    /// <summary>
	    /// The time the message was received.
	    /// </summary>
	    this.Time = time;
    }
}

/// <summary>
/// Unnessercery characters potentially returned in each message.
/// </summary>
const TrimChars = ['\n', '\r', ' ', '\t', '\0'];

/// <summary>
/// Client to connect to a remote radio.
/// </summary>
module.exports = class PcrNetworkClient extends EventEmitter
{
	ListenThread(datarecv)
	{
		try
		{
            if (this._listenQueue.length > 0) {
                let callback = this._listenQueue.shift();
                callback(datarecv);
            }
            else {
                this.emit('data', datarecv);
            }

			Debug.WriteLine(this._server + ":" + this._port + " : RECV -> " + datarecv);
		}
		catch (e)
		{
			Debug.WriteLine("A socket read failure occurred:\n" + e.Message + "\r\n" + e.StackTrace);
		}
	}

	/// <summary>
	/// Instantiates a new PCR1000 network client.
	/// </summary>
	/// <param name="server">The server to connect to.</param>
	/// <param name="port">The port to connect to.</param>
	/// <param name="tls">Use TLS to secure connections. This MUST be symmetric.</param>
	/// <param name="password">The password to connect with.</param>
	/// <exception cref="ArgumentException">If invalid arguments are provided.</exception>
	constructor(server, port = 4456, tls = false, password = "")
	{
		if (!server || server.trim().length === 0 || port <= 0)
		{
			throw "Invalid Instantiation Arguments";
		}
	    super();
		this._password = password;
		this._server = server;
		this._port = port;
		this._tls = tls;
	    this._msgSlot1 = null;
        this._msgSlot2 = null;
	    this._listenActive = false;
	    this.AutoUpdate = false;
	    this._listenQueue = [];
	}

	/// <summary>
	/// Disposes of the PcrNetworkClient
	/// </summary>
	Dispose()
	{
		if (!this._tcpClient.Connected) return;
		this.PcrClose();
	}

	/// <summary>
	/// Sends a command to the radio.
	/// </summary>
	/// <param name="cmd">Command to send.</param>
	/// <returns>Success.</returns>
	Send(cmd)
	{
		try
		{
			if (!this.AutoUpdate)
			{
				cmd += "\r\n";
			}
			this._tcpClient.write(cmd);
			return true;
		}
		catch (ex)
		{
			Debug.WriteLine(ex);
			return false;
		}
	}

	/// <summary>
	/// Sends a message to the PCR1000 and waits for a reply.
	/// </summary>
	/// <param name="cmd">The command to send.</param>
	/// <param name="overrideAutoupdate">When in autoupdate mode behaves like Send()
	/// this overrides that behaviour.</param>
	/// <returns>The reply or "" if nothing is received.</returns>
	SendWait(cmd, callback)
	{
		Debug.WriteLine("PcrNetwork SendWait");
        if (!callback) {
            throw 'Use send instead of sendwait...';
        }
	    this._listenQueue.push(callback);
		this.Send(cmd);
	}

	/// <summary>
	/// Gets the latest message from the PCR1000.
	/// </summary>
	/// <returns>The latest message.</returns>
	GetLastReceived()
	{
		Debug.WriteLine("PcrNetwork Last Recv");
		try
		{
			return this._msgSlot1.Message;
		}
		catch (ex)
		{
			Debug.WriteLine(ex.Message);
			return "";
		}
	}

	/// <summary>
	/// Gets the previously received message.
	/// </summary>
	/// <returns>The previous message.</returns>
	GetPrevReceived()
	{
		Debug.WriteLine("PcrNetwork PrevRecv");
		try
		{
			return this._msgSlot2.Message;
		}
		catch (ex)
		{
			Debug.WriteLine(ex.Message);
			return "";
		}
	}

	/// <summary>
	/// Opens the connection to the remote radio.
	/// </summary>
	/// <returns>Success.</returns>
	PcrOpen(callback)
	{
		try
		{
			if (this._tcpClient != null && this._tcpClient.Connected)
			{
				return callback(true);
			}

            let self = this;
		    this._tcpClient = new net.Socket();
            this._tcpClient.setNoDelay(true);
            this._tcpClient.on('data', (data) => {
                self.ListenThread(data);
            });
		    this._tcpClient.Connected = false;
            this._tcpClient.connect(this._port, this._server, (err) => {
                if (err) {
                    throw err;
                }
                Debug.WriteLine('Connected to PCR server.');
                this._tcpClient.Connected = true;
                this.PerformClientHello((code) => {
                    if (code === this.ClientResponseCode.INF_AUTH_REQUIRED) {
                        this.PerformClientAuth(callback);
                    }
                    else {
                        callback(true);
                    }
                });
            });
		}
		catch (ex)
		{
			Debug.WriteLine(ex.Message);
			return callback(false);
		}
	}

	/// <summary>
	/// Closes the connection to the remote radio.
	/// </summary>
	/// <returns>Success.</returns>
	PcrClose()
	{
		try
		{
			if (this._tcpClient == null)
			{
				return true;
			}
			this.SendWait(ServerPrefix + "DISCONNECT", () => {
			    this._listenActive = false;
			    this._tcpClient.end();
	            this._tcpClient.destroy();
	            this._tcpClient.Connected = false;
			});
			
			return true;
		}
		catch (ex)
		{
			Debug.WriteLine(ex.Message);
			return false;
		}
	}

	PerformClientHello(callback)
	{
		const clientProtocolVersion = 2.0;

		this.SendWait(`${ServerPrefix}HELLO ${clientProtocolVersion}`, (response) => {
		    var code = this.ParseClientCode(response);
		    if (code !== ClientResponseCode.SUC_HELLO_PASSED && code !== ClientResponseCode.INF_AUTH_REQUIRED)
		    {
			    throw "Cannot connect to server correctly. " + response + ".";
		    }
		    callback(code);
		});
	}

	PerformClientAuth(callback)
	{
		this.SendWait(ServerPrefix + "AUTH \"" + this._password + "\"", (response) => {
		    if (!response.StartsWith(ServerPrefix + ClientResponseCode.SUC_AUTH_PASSED))
		    {
			    throw "Cannot authenticate with server correctly. " + response + ".";
		    }
		    callback(true);
		});
	}

	ParseClientCode(input)
	{
		if (!input || input.trim().length === 0 || !input.Contains(" ") || !input.StartsWith(ServerPrefix))
		{
			throw "Invalid response received from server.";
		}

		input = input.substring(1, input.indexOf(" ") - 1);
		let code = ClientResponseCode.prototype[input];
		if (!code)
		{
			throw "Invalid response received from server.";
		}
		return code;
	}

	HasControl(callback)
	{
		this.SendWait(ServerPrefix + ClientRequestCode.HASCONTROL, (response) => {
		    if (response) response = response.trim();
		    let respYes = this.ConnectedClient.ServerPrefix + ClientResponseCode.SUC_HASCONTROL_RESPONSE + "\"Yes\"";
		    callback(response === respYes);
		});
	}

	TakeControl()
	{
		this.Send(ServerPrefix + ClientRequestCode.TAKECONTROL);
	}
};
