/*
 * PcrControl
 * Control component of the PCR1000 Library
 * 
 * Copyright Matthew Knox © 2013-Present.
 * This program is distributed with no warentee or garentee
 * what so ever. Do what you want with it as long as attribution
 * to the origional authour and this comment is provided at the
 * top of this source file and any derivative works. Also any
 * modifications must be in real Australian, New Zealand or
 * British English where the language allows.
 */

let PcrDef = require('./PcrDef.js');

let Debug = {
    WriteLine: (text) => {
        console.log(text);
    }
}

/// <summary>
///     Stores the important radio information for the current
///     state of the radio.
/// </summary>
let PRadInf = class
{
    constructor() {
        /// <summary>
        ///     Currenly set autogain
        /// </summary>
        this.PcrAutoGain = null;

        /// <summary>
        ///     Currently set update mode?
        /// </summary>
        this.PcrAutoUpdate = null;

        /// <summary>
        ///     Currently set radio Filter [128]
        /// </summary>
        this.PcrFilter = null; //[128];

        /// <summary>
        ///     Currently set frequency
        /// </summary>
        this.PcrFreq = null;

        /// <summary>
        ///     Currently set speed (char * version, unstable) [8]
        /// </summary>
        this.PcrInitSpeed = null; //[8];

        /// <summary>
        ///     Currently set radio Mode [128]
        /// </summary>
        this.PcrMode = null; //[128];

        /// <summary>
        ///     Currently set noiseblanking
        /// </summary>
        this.PcrNoiseBlank = null;

        /// <summary>
        ///     Currently active port/device [64]
        /// </summary>
        this.PcrPort = null; // = new char[64];

        /// <summary>
        ///     Currently set RF Attenuation
        /// </summary>
        this.PcrRfAttenuator = null;

        /// <summary>
        ///     Currently set speed (uint var)
        /// </summary>
        this.PcrSpeed = null;

        /// <summary>
        ///     Currently set squlech
        /// </summary>
        this.PcrSquelch = null;

        /// <summary>
        ///     Currently set CTCSS (unstable)
        /// </summary>
        this.PcrToneSq = null;

        /// <summary>
        ///     Currently set CTCSS (float)
        /// </summary>
        this.PcrToneSqFloat = null;

        /// <summary>
        ///     Currently set volume
        /// </summary>
        this.PcrVolume = null;
    }
};

/// <summary>
///     Control class for the PCR1000
/// </summary>
module.exports = class PcrControl
{
    // http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
    padDigits(number, digits) {
        return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
    }

    // http://stackoverflow.com/questions/12291755/how-to-convert-dec-to-hex-in-javascript
    toHex(dec) {
        return (+dec).toString(16).toUpperCase();
    }

    /// <summary>
    /// Instantiates a new PCR1000 controller
    /// </summary>
    /// <param name="communicationChannel">Channel to use to communicate with the radio.</param>
    /// <exception cref="UnauthorizedAccessException">If the communication channel cannot be opened.</exception>
    constructor (communicationChannel, readyCallback = () => {})
    {
        this._pcrRadio = new PRadInf();
        this._pcrComm = communicationChannel;
        this._pcrRadio.PcrVolume = 0;
        this._pcrRadio.PcrSquelch = 0;
        this._pcrRadio.PcrFreq = 146000000;
        this._pcrRadio.PcrMode = PcrDef.PCRMODNFM;
        this._pcrRadio.PcrFilter = PcrDef.PCRFLTR15;
        this._pcrRadio.PcrToneSq = "";
        this._pcrRadio.PcrToneSqFloat = 0.0;
        this._pcrRadio.PcrAutoGain = false;
        this._pcrRadio.PcrNoiseBlank = false;
        this._pcrRadio.PcrRfAttenuator = false;
        this._pcrRadio.PcrAutoUpdate = false;
        this._pcrStatus = false;
        this._pcrComm.PcrOpen((success) => {
            if (!success) {
                throw new Error("Access was not granted to the communication channel.");
            }
            readyCallback();
        });
    }
        
    /// <summary>
    ///     Internally called method to check radio response.
    ///     Read from the radio for the #PCRAOK and #PCRABAD reply.
    /// </summary>
    /// <param name="response">The response to check.</param>
    /// <param name="overrideAutoupdate">Trys to verify response during autoupdate mode.</param>
    /// <returns>
    ///     true - for PCRAOK, false - for PCRABAD.
    ///     If autoupdate mode is enabled will return true
    ///     without overrideAutoupdate enabled.
    /// </returns>
    PcrCheckResponse(response, overrideAutoupdate = false)
    {
        Debug.WriteLine("PcrControl PcrCheckResponse");
        if (!overrideAutoupdate && this._pcrComm.AutoUpdate) return true;
            
        if (response === PcrDef.PCRAOK || response === PcrDef.PCRBOK) {
            return true;
        }
        if (response === PcrDef.PCRABAD) {
            return false;
        }
        return false;
    }
        
    /// <summary>
    ///     Get current session's autogain value.
    ///     Checks #PcrRadio struct for member #PcrAutoGain
    ///     for the current auto-gain setting.
    /// </summary>
    /// <returns>
    /// The boolean of the current setting. True/false :: On/off.
    /// </returns>
    PcrGetAutoGain()
    {
        Debug.WriteLine("PcrControl PcrGetAutoGain");
        return this._pcrRadio.PcrAutoGain;
    }
        
    /// <summary>
    ///     Get current session's autogain value.
    /// </summary>
    /// <returns></returns>
    PcrGetAutoGainStr()
    {
        Debug.WriteLine("PcrControl GetAutoGainStr");
        return this.PcrGetAutoGain() ? "1" : "0";
    }
        
    /// <summary>
    ///     Get the current session's filter setting.
    /// </summary>
    /// <returns></returns>
    PcrGetFilter()
    {
        Debug.WriteLine("PcrControl PcrGetFilter");
        return this._pcrRadio.PcrFilter;
    }
        
    /// <summary>
    ///     Get the current session's filter setting.
    /// </summary>
    /// <returns></returns>
    PcrGetFilterStr()
    {
        Debug.WriteLine("PcrControl PcrGetFilterStr");
        if (PcrDef.PCRFLTR230 === this._pcrRadio.PcrFilter) {
            return "230";
        }
            
        if (PcrDef.PCRFLTR50 === this._pcrRadio.PcrFilter) {
            return "50";
        }
            
        if (PcrDef.PCRFLTR15 === this._pcrRadio.PcrFilter) {
            return "15";
        }
            
        if (PcrDef.PCRFLTR6 === this._pcrRadio.PcrFilter) {
            return "6";
        }
            
        if (PcrDef.PCRFLTR3 === this._pcrRadio.PcrFilter) {
            return "3";
        }
            
        return this._pcrRadio.PcrFilter;
    }
        
    /// <summary>
    ///     Gets current session's frequency setting.
    /// </summary>
    /// <returns></returns>
    PcrGetFreq()
    {
        Debug.WriteLine("PcrControl PcrGetFreq");
        return this._pcrRadio.PcrFreq;
    }
        
    /// <summary>
    ///     Gets current session's frequency setting.
    /// </summary>
    /// <returns></returns>
    PcrGetFreqStr()
    {
        Debug.WriteLine("PcrControl PcrGetFreqStr");
        return this.padDigits(this._pcrRadio.PcrFreq, 10);
    }
        
    /// <summary>
    ///     Gets current session's mode setting.
    /// </summary>
    /// <returns></returns>
    PcrGetMode()
    {
        Debug.WriteLine("PcrControl PcrGetMode");
        return this._pcrRadio.PcrMode;
    }
        
    /// <summary>
    ///     Gets current session's mode setting.
    /// </summary>
    /// <returns></returns>
    PcrGetModeStr()
    {
        Debug.WriteLine("PcrControl PcrGetModeStr");
        if (PcrDef.PCRMODWFM === this._pcrRadio.PcrMode) {
            return "WFM";
        }
            
        if (PcrDef.PCRMODNFM === this._pcrRadio.PcrMode) {
            return "NFM";
        }
            
        if (PcrDef.PCRMODCW === this._pcrRadio.PcrMode) {
            return "CW";
        }
            
        if (PcrDef.PCRMODAM === this._pcrRadio.PcrMode) {
            return "AM";
        }
            
        if (PcrDef.PCRMODUSB === this._pcrRadio.PcrMode) {
            return "USB";
        }
            
        if (PcrDef.PCRMODLSB === this._pcrRadio.PcrMode) {
            return "LSB";
        }
            
        return "UNKNOWN";
    }
        
    /// <summary>
    ///     Get current session's noiseblank value.
    /// </summary>
    /// <returns></returns>
    PcrGetNb()
    {
        Debug.WriteLine("PcrControl PcrGetNb");
        return this._pcrRadio.PcrNoiseBlank;
    }
        
    /// <summary>
    ///     Get current session's noiseblank value.
    /// </summary>
    /// <returns></returns>
    PcrGetNbStr()
    {
        Debug.WriteLine("PcrControl PcrGetNbStr");
        return this.PcrGetNb() ? "1" : "0";
    }
        
    /// <summary>
    ///     Gets current port / serial device setting.
    /// </summary>
    /// <returns></returns>
    PcrGetPort()
    {
        Debug.WriteLine("PcrControl PcrGetPort");
        return this._pcrRadio.PcrPort;
    }
        
    /// <summary>
    ///     Retrieves the current radio struct.
    /// </summary>
    /// <returns></returns>
    PcrGetRadioInfo()
    {
        Debug.WriteLine("PcrControl PcrGetRadioInfo");
        return this._pcrRadio;
    }
        
    /// <summary>
    ///     Sets the radio structure and values then updates the radio to reflect them.
    ///     PcrSpeed and PcrPort are currently ignored due to implementation bugs.
    /// </summary>
    /// <param name="radioInf">New radio structure.</param>
    PcrSetRadioInfo(radioInf)
    {
        Debug.WriteLine("PcrControl PcrSetRadioInfo");
        this.PcrSetAutoupdate(radioInf.PcrAutoUpdate);
        this.PcrSetAutoGain(radioInf.PcrAutoGain, ()=>{});
        this.PcrSetNb(radioInf.PcrNoiseBlank, () =>{});
        // radioInf.PcrPort; - TODO: Fix Buggy Implementation
        this.PcrSetRfAttenuator(radioInf.PcrRfAttenuator, ()=> {});
        // PcrSetSpeed(radioInf.PcrSpeed); - TODO: Fix Buggy implementation
        // radioInf.PcrInitSpeed; - same as above
        this._pcrRadio.PcrMode = radioInf.PcrMode;
        this._pcrRadio.PcrFilter = radioInf.PcrFilter;
        this.PcrSetFreq(radioInf.PcrFreq, ()=>{});
        this.PcrSetSquelch(radioInf.PcrSquelch, ()=> {});
        this.PcrSetToneSq(radioInf.PcrToneSqFloat, ()=>{});
        this.PcrSetVolume(radioInf.PcrVolume, ()=>{});
    }
        
    /// <summary>
    ///     Get current session's RF Attenuation value.
    /// </summary>
    /// <returns></returns>
    PcrGetRfAttenuator()
    {
        Debug.WriteLine("PcrControl PcrGetRfAttenuator");
        return this._pcrRadio.PcrRfAttenuator;
    }
        
    /// <summary>
    ///     Get current session's RF Attenuation value.
    /// </summary>
    /// <returns></returns>
    PcrGetRfAttenuatorStr()
    {
        Debug.WriteLine("PcrControl PcrGetRfAttenuatorStr");
        return this.PcrGetRfAttenuator() ? "1" : "0";
    }
        
    /// <summary>
    ///     Gets current speed.
    /// </summary>
    /// <returns></returns>
    PcrGetSpeedT()
    {
        Debug.WriteLine("PcrControl PcrGetSpeedT");
        return this._pcrRadio.PcrSpeed;
    }
        
    /// <summary>
    ///     Gets current speed.
    /// </summary>
    /// <returns></returns>
    PcrGetSpeed()
    {
        Debug.WriteLine("PcrControl PcrGetSpeed");
        switch (this._pcrRadio.PcrSpeed) {
            case 300:
            case 600:
            case 1200:
            case 1800:
            case 2400:
            case 4800:
            case 9600:
            case 19200:
            case 38400:
            case 57600:
                return this._pcrRadio.PcrSpeed + '';
            default:
                return "Unknown";
        }
    }
        
    /// <summary>
    ///     Gets current session's squelch setting.
    /// </summary>
    /// <returns></returns>
    PcrGetSquelch()
    {
        Debug.WriteLine("PcrControl PcrGetSquelch");
        return this._pcrRadio.PcrSquelch;
    }
        
    /// <summary>
    ///     Gets current session's squelch setting.
    /// </summary>
    /// <returns></returns>
    PcrGetSquelchStr()
    {
        Debug.WriteLine("PcrControl PcrGetSquelchStr");
        return this._pcrRadio.PcrSquelch + '';
    }
        
    /// <summary>
    ///     Gets the current session's tone squelch (undecoded version).
    /// </summary>
    /// <returns></returns>
    PcrGetToneSq()
    {
        Debug.WriteLine("PcrControl PcrGetToneSq");
        return this._pcrRadio.PcrToneSq;
    }
        
    /// <summary>
    ///     Gets the current session's tone squelch (decoded version).
    /// </summary>
    /// <returns></returns>
    PcrGetToneSqStr()
    {
        Debug.WriteLine("PcrControl PcrGetToneSqStr");
        return this._pcrRadio.PcrToneSqFloat + '';
    }
        
    /// <summary>
    ///     Gets current session's volume setting.
    /// </summary>
    /// <returns></returns>
    PcrGetVolume()
    {
        Debug.WriteLine("PcrControl PcrGetVolume");
        return this._pcrRadio.PcrVolume;
    }
        
    /// <summary>
    ///     Gets current session's volume setting.
    /// </summary>
    /// <returns></returns>
    PcrGetVolumeStr()
    {
        Debug.WriteLine("PcrControl PcrGetVolumeStr");
        return this.PcrGetVolume() + '';
    }
        
    /// <summary>
    ///     Initialise the radio.
    /// </summary>
    /// <param name="autoUpdate">Initialise the radio in autoUpdate mode</param>
    /// <returns>On success : true otherwise false.</returns>
    PcrInit(callback)
    {
        Debug.WriteLine("PcrControl PcrInit");
        Debug.WriteLine("Radio is coming up. Please wait...\n");
            
        if (!this._pcrStatus) {
            callback(false);
            return;
        }
        this._pcrComm.SendWait(PcrDef.PCRINITA, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrRadio.PcrAutoUpdate = false;
            this._pcrComm.AutoUpdate = false;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Inquire radio status.
    /// </summary>
    /// <returns></returns>
    PcrIsOn()
    {
        Debug.WriteLine("PcrControl PcrIsOn");
        return this._pcrStatus;
    }
        
    /// <summary>
    ///     Powers the radio down.
    /// </summary>
    /// <returns></returns>
    PcrPowerDown(callback)
    {
        Debug.WriteLine("PcrControl PcrPowerDown");
        this._pcrComm.SendWait(PcrDef.PCRPWROFF, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrStatus = false;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Powers the radio on.
    /// </summary>
    /// <returns></returns>
    PcrPowerUp(callback)
    {
        Debug.WriteLine("PcrControl PcrPowerUp");
        this._pcrComm.SendWait(PcrDef.PCRPWRON, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrStatus = true;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Querys radio acutator status.
    /// </summary>
    /// <returns></returns>
    PcrQueryOn(callback)
    {
        Debug.WriteLine("PcrControl PcrQueryOn");
        const mesg = "H1";
        this._pcrComm.SendWait(mesg, (response) => {
            if (response === "") return callback(false);
            return callback(response === "H101");
        });
        
    }
        
    /// <summary>
    ///     Querys radio's squelch status.
    /// </summary>
    /// <returns></returns>
    PcrQuerySquelch(callback)
    {
        Debug.WriteLine("PcrControl PcrQuerySquelch");
        var tempvar1 = PcrDef.PCRASQL + PcrDef.PCRASQLCL;
        this._pcrComm.SendWait(PcrDef.PCRQSQL, (temp) => {
            if (temp === "") return callback(false);
            return callback(temp === tempvar1);
        });
    }
        
    /// <summary>
    ///     Toggle autogain functionality.
    /// </summary>
    /// <param name="value"></param>
    PcrSetAutoGain(value, callback)
    {
        Debug.WriteLine("PcrControl PcrSetAutoGain");
        this._pcrComm.SendWait(value ? PcrDef.PCRAGCON : PcrDef.PCRAGCOFF, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrRadio.PcrAutoGain = value;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Sets current session's filter.
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    PcrSetFilter(filter, callback)
    {
        Debug.WriteLine("Setting PcrRadio.PcrFilter");
        switch (filter) {
            case "3":
                this._pcrRadio.PcrFilter = PcrDef.PCRFLTR3; break;
            case "6":
                this._pcrRadio.PcrFilter = PcrDef.PCRFLTR6; break;
            case "15":
                this._pcrRadio.PcrFilter = PcrDef.PCRFLTR15; break;
            case "50":
                this._pcrRadio.PcrFilter = PcrDef.PCRFLTR50; break;
            case "230":
                this._pcrRadio.PcrFilter = PcrDef.PCRFLTR230; break;
            default:
                callback(false); return;
        }
            
        var temp = PcrDef.PCRFRQ + this.padDigits(this._pcrRadio.PcrFreq, 10) + this._pcrRadio.PcrMode + this._pcrRadio.PcrFilter + "00";
        this._pcrComm.SendWait(temp, (response) => {
            return callback(this.PcrCheckResponse(response));
        });
    }
        
    /// <summary>
    ///     Sets if autoupdate is enabled.
    /// </summary>
    /// <param name="autoupdate"></param>
    PcrSetAutoupdate(autoupdate)
    {
        this._pcrComm.SendWait(autoupdate ? PcrDef.PCRSIGON : PcrDef.PCRSIGOFF, (response) => {
            if (this.PcrCheckResponse(response)) {
                this._pcrComm.AutoUpdate = this._pcrRadio.PcrAutoUpdate = autoupdate;
            }
        });
    }
        
    /// <summary>
    ///     Sets current session's filter.
    /// </summary>
    /// <param name="filter"></param>
    /// <returns></returns>
    PcrSetFilterN(filter, callback)
    {
        Debug.WriteLine("PcrControl PcrSetFilter");
        return this.PcrSetFilter(filter + '', callback);
    }
        
    /// <summary>
    ///     Set the current frequency.
    /// </summary>
    /// <param name="freq"></param>
    /// <returns></returns>
    PcrSetFreq(freq, callback)
    {
        Debug.WriteLine("PcrControl PcrSetFreq");
        if ((PcrDef.LOWERFRQ <= freq) && (freq <= PcrDef.UPPERFRQ)) {
            var freqConv = this.padDigits(freq, 10);
            var temp = PcrDef.PCRFRQ + freqConv + this._pcrRadio.PcrMode + this._pcrRadio.PcrFilter + "00";
            this._pcrComm.SendWait(temp, (resp) => {
                if (this.PcrCheckResponse(resp)) {
                    this._pcrRadio.PcrFreq = freq;
                    Debug.WriteLine("PcrControl PcrSetFreq - Success");
                    return callback(true);
                }
                Debug.WriteLine("PcrControl PcrSetFreq - Failed");
                return callback(false);
            });
        }
    }
        
    /// <summary>
    ///     Set the current session's mode.
    ///     Valid arguments for \a mode:
    ///     - USB	upper side band
    ///     - LSB	lower side band
    ///     - AM	amplitude modulated
    ///     - NFM	narrow band FM
    ///     - WFM	wide band FM
    ///     - CW	continuous wave
    ///     The concept is the same as above ( #PcrSetFreq ) except it accepts
    ///     standard text for "USB"/"LSB" etc... Use of the pcrdef codes
    ///     are not necessary, they will be decoded based on \a mode.
    /// </summary>
    /// <param name="mode">Plain text string of mode (eg: "USB")</param>
    /// <returns>True or false based on success or failure.</returns>
    PcrSetMode(mode, callback)
    {
        Debug.WriteLine("Setting PcrRadio.PcrMode");
        mode = mode.trim().toLowerCase();
            
        switch (mode) {
            case "am":
                this._pcrRadio.PcrMode = PcrDef.PCRMODAM; break;
            case "cw":
                this._pcrRadio.PcrMode = PcrDef.PCRMODCW; break;
            case "lsb":
                this._pcrRadio.PcrMode = PcrDef.PCRMODLSB; break;
            case "usb":
                this._pcrRadio.PcrMode = PcrDef.PCRMODUSB; break;
            case "nfm":
                this._pcrRadio.PcrMode = PcrDef.PCRMODNFM; break;
            case "wfm":
                this._pcrRadio.PcrMode = PcrDef.PCRMODWFM; break;
            default:
                callback(false); return;
        }
            
        var temp = PcrDef.PCRFRQ + this.padDigits(this._pcrRadio.PcrFreq, 10) + this._pcrRadio.PcrMode + this._pcrRadio.PcrFilter + "00";
        this._pcrComm.SendWait(temp, (response) => {
            callback(this.PcrCheckResponse(response));
        });
    }
        
    /// <summary>
    ///     Toggle Noiseblanking functionality.
    ///     Valid values for \a value are:
    ///     - true to activate noiseblanking
    ///     - false to deactivate noiseblanking
    ///     Sets the noise blanking to \a value
    ///     (on/off) true/false... checks the radio response
    ///     if ok, then sets the value
    /// </summary>
    /// <param name="value">Value true or false for noiseblanking on or off</param>
    /// <returns>
    /// True, on success otherwise returns false.
    /// </returns>
    PcrSetNb(value, callback)
    {
        Debug.WriteLine("PcrControl PcrSetNb");
        this._pcrComm.SendWait(value ? PcrDef.PCRNBON : PcrDef.PCRNBOFF, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrRadio.PcrNoiseBlank = value;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Set the communication port for the current session.
    ///     Sets port by closing the handle to the current one and opening the new one.
    /// </summary>
    /// <param name="communicationPort">The port</param>
    /// <returns>
    /// True or false if the serial device can be opened on the new port.
    /// </returns>
    PcrSetPort(communicationPort, callback)
    {
        Debug.WriteLine("PcrControl PcrSetPort");
        this._pcrComm.PcrClose();
        try {
            this._pcrComm = communicationPort;
            this._pcrComm.PcrOpen((data) => {
                this._pcrComm.AutoUpdate = this._pcrRadio.PcrAutoUpdate;
                callback(data);
            });
        }
        catch (e) {
            callback(false);
        }
    }
        
    /// <summary>
    ///     Toggle RF Attenuation functionality.
    ///     Valid values for \a value are:
    ///     - true to activate RF Attenuation
    ///     - false to deactivate RF Attenuation
    ///     Sets the RF Attenuation to \a value
    ///     (on/off) true/false... checks the radio response
    ///     if ok, then sets the value
    /// </summary>
    /// <param name="value">Value true or false for RF Attenuation on or off</param>
    /// <returns>
    /// True, on success otherwise returns false.
    /// </returns>
    PcrSetRfAttenuator(value, callback)
    {
        Debug.WriteLine("PcrControl PcrSetRfAttenuator");
        this._pcrComm.SendWait(value ? PcrDef.PCRRFAON : PcrDef.PCRRFAOFF, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrRadio.PcrRfAttenuator = value;
            return callback(true);
        });
        
    }
        
    /// <summary>
    ///     Set the current session's squelch.
    ///     sprintf converts (and combines) the cmd #PCRSQL with
    ///     the argument \a squelch , such that the argument has a 
    ///     minimum field width of two chars. If the field 
    ///     is less than 2 chars (ie: arg=5) then it pads the field 
    ///     with one zero.
    /// </summary>
    /// <param name="squelch">an integer between 0 and 100</param>
    /// <returns>
    /// true or false based on #PcrCheckResponse to indicate
    /// success or failure
    /// </returns>
    PcrSetSquelch(squelch, callback)
    {
        Debug.WriteLine("PcrControl PcrSetSquelch");
        if ((0 > squelch) || (squelch > 100)) {
            callback(false);
            return;
        }
        squelch = parseInt((256.0 / 100.0) * squelch);
        var temp = PcrDef.PCRSQL + this.toHex(squelch);
        this._pcrComm.SendWait(temp, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrRadio.PcrSquelch = squelch;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Sets current session CTCSS.
    ///     set's the tone squelch for the radio. The default is
    ///     value 00 for off. The values are \b NOT the hz, but the
    ///     #pcrdef.h vals, 01=67.0 02=69.3 etc... 
    /// </summary>
    /// <param name="value">character string of 01-35 hex</param>
    /// <returns>
    /// true or false based on #PcrCheckResponse success or failure.
    /// </returns>
    PcrSetToneSq(value, callback)
    {
        Debug.WriteLine("PcrControl PcrSetTonSq");
        var temp = PcrDef.PCRTSQL + value;
        this._pcrComm.SendWait(temp, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrRadio.PcrToneSq = value;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Sets session CTCSS based on a float value.
    ///     Since the previous method requires the programmer to
    ///     remember the PCR-1000's internal number that corresponds
    ///     to the tone squelch frequency, this overloaded method
    ///     allows the programmer to pass a float, where the float
    ///     is the frequency (Hz) in question.
    /// </summary>
    /// <param name="passValue">tone squelch in Hz</param>
    /// <returns>
    /// true or false based on #PcrCheckResponse 
    /// success or failure. On failure, it turns off CTCSS
    /// and returns false.
    /// </returns>
    PcrSetToneSqN(passValue, callback)
    {
        Debug.WriteLine("PcrControl PcrSetToneSq");
            
        var tone = parseInt(passValue * 10.0 + .1);
        this._pcrRadio.PcrToneSqFloat = passValue;
            
        switch (tone) {
            case 0:
                return this.PcrSetToneSq("00", callback);
            case 670:
                return this.PcrSetToneSq("01", callback);
            case 693:
                return this.PcrSetToneSq("02", callback);
            case 710:
                return this.PcrSetToneSq("03", callback);
            case 719:
                return this.PcrSetToneSq("04", callback);
            case 744:
                return this.PcrSetToneSq("05", callback);
            case 770:
                return this.PcrSetToneSq("06", callback);
            case 797:
                return this.PcrSetToneSq("07", callback);
            case 825:
                return this.PcrSetToneSq("08", callback);
            case 854:
                return this.PcrSetToneSq("09", callback);
            case 885:
                return this.PcrSetToneSq("0A", callback);
            case 915:
                return this.PcrSetToneSq("0B", callback);
            case 948:
                return this.PcrSetToneSq("0C", callback);
            case 974:
                return this.PcrSetToneSq("0D", callback);
            case 1000:
                return this.PcrSetToneSq("0E", callback);
            case 1035:
                return this.PcrSetToneSq("0F", callback);
            case 1072:
                return this.PcrSetToneSq("10", callback);
            case 1109:
                return this.PcrSetToneSq("11", callback);
            case 1148:
                return this.PcrSetToneSq("12", callback);
            case 1188:
                return this.PcrSetToneSq("13", callback);
            case 1230:
                return this.PcrSetToneSq("14", callback);
            case 1273:
                return this.PcrSetToneSq("15", callback);
            case 1318:
                return this.PcrSetToneSq("16", callback);
            case 1365:
                return this.PcrSetToneSq("17", callback);
            case 1413:
                return this.PcrSetToneSq("18", callback);
            case 1462:
                return this.PcrSetToneSq("19", callback);
            case 1514:
                return this.PcrSetToneSq("1A", callback);
            case 1567:
                return this.PcrSetToneSq("1B", callback);
            case 1598:
                return this.PcrSetToneSq("1C", callback);
            case 1622:
                return this.PcrSetToneSq("1D", callback);
            case 1655:
                return this.PcrSetToneSq("1E", callback);
            case 1679:
                return this.PcrSetToneSq("1F", callback);
            case 1713:
                return this.PcrSetToneSq("20", callback);
            case 1738:
                return this.PcrSetToneSq("21", callback);
            case 1773:
                return this.PcrSetToneSq("22", callback);
            case 1799:
                return this.PcrSetToneSq("23", callback);
            case 1835:
                return this.PcrSetToneSq("24", callback);
            case 1862:
                return this.PcrSetToneSq("25", callback);
            case 1899:
                return this.PcrSetToneSq("26", callback);
            case 1928:
                return this.PcrSetToneSq("27", callback);
            case 1966:
                return this.PcrSetToneSq("28", callback);
            case 1995:
                return this.PcrSetToneSq("29", callback);
            case 2035:
                return this.PcrSetToneSq("2A", callback);
            case 2065:
                return this.PcrSetToneSq("2B", callback);
            case 2107:
                return this.PcrSetToneSq("2C", callback);
            case 2181:
                return this.PcrSetToneSq("2D", callback);
            case 2257:
                return this.PcrSetToneSq("2E", callback);
            case 2291:
                return this.PcrSetToneSq("2F", callback);
            case 2336:
                return this.PcrSetToneSq("30", callback);
            case 2418:
                return this.PcrSetToneSq("31", callback);
            case 2503:
                return this.PcrSetToneSq("32", callback);
            case 2541:
                return this.PcrSetToneSq("33", callback);
            default:
                this.PcrSetToneSq("00", callback);
                break;
        }
        return callback(false);
    }
        
    /// <summary>
    ///     Set the current session's volume.
    ///     sprintf converts (and combines) the cmd #PCRVOL with
    ///     the argument, such that the argument has a minimum field width
    ///     of two chars. If the field is less than 2 chars (ie: arg=5) then it
    ///     pads the field with one zero.
    /// </summary>
    /// <param name="volume">Volume an integer between 0 and 100</param>
    /// <returns>
    /// true or false based on #PcrCheckResponse to indicate success or failure
    /// </returns>
    PcrSetVolume(volume, callback)
    {
        Debug.WriteLine("PcrControl PcrSetVolume");
        if ((0 > volume) || (volume > 100)) {
            callback(false);
            return;
        }
        volume = parseInt((256.0 / 100.0) * volume);
        var temp = PcrDef.PCRVOL + this.toHex(volume);
    
        this._pcrComm.SendWait(temp, (response) => {
            if (!this.PcrCheckResponse(response)) return callback(false);
            this._pcrRadio.PcrVolume = volume;
            return callback(true);
        });
    }
        
    /// <summary>
    ///     Querys the signal strength.
    /// </summary>
    /// <returns>integer value of 0-255 on signal strength.</returns>
    PcrSigStrength(callback)
    {
        Debug.WriteLine("PcrControl PcrSigStrength");
        this._pcrComm.SendWait(PcrDef.PCRQRST, (temp) => {
            let sigstr;
            if (temp === "") return callback(0);
            var digit = temp[2];
            if ((digit >= 'A') && (digit <= 'F')) {
                sigstr = (digit - 'A' + 1) * 16;
            }
            else {
                sigstr = parseInt(digit + '') * 16;
            }
            
            digit = temp[3];
            if ((digit >= 'A') && (digit <= 'F')) {
                sigstr += digit - 'A' + 1;
            }
            else {
                sigstr += parseInt(digit + '');
            }
            return callback(sigstr);
        });
    }
        
    /// <summary>
    ///     Querys the signal strength.
    /// </summary>
    /// <returns>
    /// null on failure, otherwise a character string
    /// with the current signal strenth. This includes the I1
    /// header, plus the last two characters which is the
    /// \b hex value from \a 00-99
    /// </returns>
    PcrSigStrengthStr(callback)
    {
        Debug.WriteLine("PcrControl PcrSigStrengthStr");
        this._pcrComm.SendWait(PcrDef.PCRQRST, (response) => {
            return callback(response === "" ? null : response);
        });
    }
        
    /// <summary>
    /// Tidies up and releases the underlying radio from the control of this class.
    /// </summary>
    Dispose()
    {
        this._pcrComm.Dispose();
    }
}

/// <summary>
///     Stores the important radio information for the current
///     state of the radio.
/// </summary>
module.exports.prototype.PRadInf = PRadInf;