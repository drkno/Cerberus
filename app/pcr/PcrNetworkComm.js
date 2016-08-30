'use strict';

﻿/*
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
    EventEmitter = require('events'),
    Debug = require('./PcrDebug.js')('Network');

let ClientRequestCode = {
    UNKNOWN: 0,
    ECHO: 1,
    HASCONTROL: 2,
    TAKECONTROL: 3,
    DISCONNECT: 4
};

let ClientResponseCode = {
    // Client Hello
    ERR_HELLO_NOTFOUND: 0,
    ERR_HELLO_INVALID: 1,
    WAR_HELLO_UNKNOWN: 2,
    ERR_PROTOVER_TOOOLD: 3,
    SUC_HELLO_PASSED: 4,

    // Auth
    INF_AUTH_REQUIRED: 6,
    ERR_AUTH_NOTFOUND: 7,
    ERR_AUTH_INVALID: 8,
    ERR_AUTH_INCORRECT: 9,
    SUC_AUTH_PASSED: 10,

    // Other
    SUC_ECHO_RESPONSE: 11,
    SUC_HASCONTROL_RESPONSE: 12,
    SUC_TAKECONTROL_RESPONSE: 13,
    WAR_COMMAND_UNKNOWN: 14,
    INF_CLIENT_DISCONNECT: 15,

    // Query
    ERR_QUERY_FAILED: 16,
    ERR_HASCONTROL_RESPONSE: 17
};

const ServerPrefix = "$";

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
                callback(datarecv.toString());
            }
            else {
                this.emit('data', datarecv.toString());
            }

			Debug.WriteLine(this._server + ":" + this._port + " : RECV -> " + datarecv);

            if (this._sendQueue.length > 0) {
                let cmd = this._sendQueue.shift();
                this._Send(cmd);
            }
		}
		catch (e)
		{
			Debug.Fail("A socket read failure occurred:\n" + e.message + "\r\n" + e.stack);
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
			throw new Error("Invalid Instantiation Arguments");
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
        this._sendQueue = [];
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
	_Send(cmd)
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
            throw new Error('Use send instead of sendwait...');
        }

        if (this._listenQueue.length > 10) {
            this._sendQueue.shift();
            this._listenQueue.shift();
            Debug.Fail('Dropping command from long queue...');
        }

	    this._listenQueue.push(callback);
        if (this._listenQueue.length > 1) {
            this._sendQueue.push(cmd);
        }
        else {
            this._Send(cmd);
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
				callback(true);
			    return;
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
                    if (code === ClientResponseCode.INF_AUTH_REQUIRED) {
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
			callback(false);
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
			    throw new Error("Cannot connect to server correctly. " + response + ".");
		    }
		    callback(code);
		});
	}

	PerformClientAuth(callback)
	{
		this.SendWait(ServerPrefix + "AUTH \"" + this._password + "\"", (response) => {
		    if (!response.StartsWith(ServerPrefix + ClientResponseCode.SUC_AUTH_PASSED))
		    {
			    throw new Error("Cannot authenticate with server correctly. " + response + ".");
		    }
		    callback(true);
		});
	}

	ParseClientCode(input)
	{
		if (!input || input.trim().length === 0 || input.indexOf(" ") < 0 || !input.startsWith(ServerPrefix))
		{
			throw new Error("Invalid response received from server.");
		}

		input = input.substring(1, input.indexOf(" "));
		let code = ClientResponseCode[input];
		if (!code)
		{
			throw new Error("Invalid response received from server.");
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
