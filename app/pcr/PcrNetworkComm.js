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

class Debug {}
Debug.prototype.WriteLine = (text) => {
    console.log(text);
};

class ClientRequestCode {};
ClientRequestCode.prototype.UNKNOWN = 0;
ClientRequestCode.prototype.ECHO = 1;
ClientRequestCode.prototype.HASCONTROL = 2;
ClientRequestCode.prototype.TAKECONTROL = 3;
ClientRequestCode.prototype.DISCONNECT = 4;

/// <summary>
/// Received message structure.
/// </summary>
class RecvMsg
{
    constructor() {
	    /// <summary>
	    /// The message received.
	    /// </summary>
	    this.Message = null;

	    /// <summary>
	    /// The time the message was received.
	    /// </summary>
	    this.Time = new Date();
    }
}

/// <summary>
/// Unnessercery characters potentially returned in each message.
/// </summary>
const TrimChars = ['\n', '\r', ' ', '\t', '\0'];

/// <summary>
/// Number of 50ms timeouts to wait before aborting in SendWait.
/// </summary>
const RecvTimeout = 20;

/// <summary>
/// Client to connect to a remote radio.
/// </summary>
module.exports = class PcrNetworkClient extends EventEmitter
{
	ListenThread(datarecv)
	{
		try
		{
			if (AutoUpdate) {
			    this.emit('data', { time: Date.now(), data: datarecv });
			}

			_msgSlot2 = _msgSlot1;
			_msgSlot1 = new RecvMsg {Message = datarecv, Time = DateTime.Now};

			Debug.WriteLine(_server + ":" + _port + " : RECV -> " + datarecv);
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
			throw new "Invalid Instantiation Arguments";
		}
		this._password = password;
		this._server = server;
		this._port = port;
		this._tls = tls;
	    this._msgSlot1 = null;
        this._msgSlot2 = null;
	    this._listenActive = false;
	    this.AutoUpdate = false;
	}

	/// <summary>
	/// Disposes of the PcrNetworkClient
	/// </summary>
	Dispose()
	{
		if (!_tcpClient.Connected) return;
		PcrClose();
		_tcpListen.Abort();
		_tcpListen.Join();
		_tcpClient.Close();
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
			if (!AutoUpdate)
			{
				cmd += "\r\n";
			}
			_tcpStream.Write(Encoding.ASCII.GetBytes(cmd), 0, cmd.Length);
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
	SendWait(cmd, overrideAutoupdate = false)
	{
		Debug.WriteLine("PcrNetwork SendWait");
		Send(cmd);
		if (AutoUpdate && !overrideAutoupdate) return "";
		var dt = DateTime.Now;
		for (var i = 0; i < RecvTimeout; i++)
		{
			if (dt < _msgSlot1.Time)
			{
				return dt < _msgSlot2.Time ? _msgSlot2.Message : _msgSlot1.Message;
			}
			Thread.Sleep(50);
		}
		return "";
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
			return _msgSlot1.Message;
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
			return _msgSlot2.Message;
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
	PcrOpen()
	{
		try
		{
			if (this._tcpClient != null && this._tcpClient.Connected)
			{
				return true;
			}

            let self = this;
		    this._tcpClient = new net.Socket();
            this._tcpClient.connect(this._port, this._server, (err) => {
                if (err) {
                    throw err;
                }
                Debug.WriteLine('Connected to PCR server.');

                var code = this.PerformClientHello();
                if (code === this.ClientResponseCode.INF_AUTH_REQUIRED)
                {
                    this.PerformClientAuth();
                }
            });

            this._tcpClient.on('data', (data) => {
                self.ListenThread(data);
            });

			return true;
		}
		catch (ex)
		{
			Debug.WriteLine(ex.Message);
			return false;
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
			if (_tcpClient == null)
			{
				return true;
			}
			SendWait(ConnectedClient.ServerPrefix + "DISCONNECT");
			_listenActive = false;
			_tcpListen.Abort();
			_tcpBuffer = null;
			_tcpStream.Close();
			_tcpClient.Close();
			return true;
		}
		catch (ex)
		{
			Debug.WriteLine(ex.Message);
			return false;
		}
	}

	PerformClientHello()
	{
		const clientProtocolVersion = 2.0;

		var response = SendWait(`${ConnectedClient.ServerPrefix}HELLO ${clientProtocolVersion}`);
		var code = ParseClientCode(response);
		if (code != ClientResponseCode.SUC_HELLO_PASSED && code != ClientResponseCode.INF_AUTH_REQUIRED)
		{
			throw new InvalidOperationException("Cannot connect to server correctly. " + response + ".");
		}
		return code;
	}

	PerformClientAuth()
	{
		var response = SendWait(ConnectedClient.ServerPrefix + "AUTH \"" + _password + "\"");
		if (!response.StartsWith(ConnectedClient.ServerPrefix) || !response.Contains(" "))
		if (!response.StartsWith(ConnectedClient.ServerPrefix + ClientResponseCode.SUC_AUTH_PASSED))
		{
			throw new InvalidOperationException("Cannot authenticate with server correctly. " + response + ".");
		}
	}

	ParseClientCode(input)
	{
		if (string.IsNullOrEmpty(input) || !input.Contains(" ") || !input.StartsWith(ConnectedClient.ServerPrefix))
		{
			throw new InvalidOperationException("Invalid response received from server.");
		}

		input = input.Substring(1, input.IndexOf(" ", StringComparison.Ordinal) - 1);
		ClientResponseCode code;
		if (!Enum.TryParse(input, out code))
		{
			throw "Invalid response received from server.";
		}
		return code;
	}

	HasControl()
	{
		let response = SendWait(ConnectedClient.ServerPrefix + ClientRequestCode.HASCONTROL);
        if (response) response = response.trim();
		let respYes = ConnectedClient.ServerPrefix + ClientResponseCode.SUC_HASCONTROL_RESPONSE + "\"Yes\"";
		return response === respYes;
	}

	TakeControl()
	{
		Send(ConnectedClient.ServerPrefix + ClientRequestCode.TAKECONTROL);
	}
};
