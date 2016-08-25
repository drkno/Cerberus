/*
 * PcrDef
 * Command definitions component of the PCR1000 Library
 * 
 * Copyright Matthew Knox © 2013-Present.
 * This program is distributed with no warentee or garentee
 * what so ever. Do what you want with it as long as attribution
 * to the origional authour and this comment is provided at the
 * top of this source file and any derivative works. Also any
 * modifications must be in real Australian, New Zealand or
 * British English where the language allows.
 */

/// <summary>
/// Class containing PCR1000 commands.
/// </summary>
module.exports = class PcrDef {};

/*
This is the PCR-1000 Command Set define file. Basically this file
consists of all of the pertinent command prefixes that are sent to
the radio.
*/

/// <summary>
/// Suffix for Radio Query
/// </summary>
PcrDef.prototype.PCRQST = "\\?";
/// <summary>
/// Suffix for execute command 
/// </summary>
PcrDef.prototype.PCRECMD = "\r\n";

/// <summary>
/// Init, manual probe 
/// \b Warning: after issueing an init DO NOT
///      read(). If you do, the read() will block and wont return.
///      the radio doesn't return data after an initialization. You
///      must close the socket, and reopen it. You wont have to reopen
///      the socket with wierd opts, unless you reset the socket to 
///      the state as it was before .
/// \sa PCRINITA
/// </summary>
PcrDef.prototype.PCRINITM = "H101\r\nG300\r\n"; 
/// <summary>
/// Init, Auto probe
/// \b Warning: after issueing an init DO NOT
///      read(). If you do, the read() will block and wont return.
///      the radio doesn't return data after an initialization. You
///      must close the socket, and reopen it. You wont have to reopen
///      the socket with wierd opts, unless you reset the socket to 
///      the state as it was before .
/// \sa PCRINITM
/// </summary>
PcrDef.prototype.PCRINITA = "H101\r\nG301\r\n";
/// <summary>
/// Signal Update (G3)
/// </summary>
PcrDef.prototype.PCRSIG = "G3";
/// <summary>
/// Program should poll status from radio (G300)
/// </summary>
PcrDef.prototype.PCRSIGOFF = "G300";
/// <summary>
/// Radio sends status automagically when a change (G301)
/// </summary>
PcrDef.prototype.PCRSIGON	= "G301";
/// <summary>
/// Binary mode off (G302)
/// </summary>
PcrDef.prototype.PCRSIGBOFF = "G302";
/// <summary>
/// Binary mode on  (G303)
/// </summary>
PcrDef.prototype.PCRSIGBON = "G303";

/// <summary>
/// Power (H1)
/// </summary>
PcrDef.prototype.PCRPWR = "H1";
/// <summary>
/// Power radio down (H100)
/// </summary>
PcrDef.prototype.PCRPWROFF = "H100";
/// <summary>
/// Power radio up   (H101)
/// </summary>
PcrDef.prototype.PCRPWRON = "H101";
/// <summary>
/// Radio power query
/// </summary>
PcrDef.prototype.PCRPWRQRY = "H10?";

/// <summary>
/// Volume prefix (J40) 
/// </summary>
PcrDef.prototype.PCRVOL = "J40";
/// <summary>
/// Volume at 75 % (J4075)
/// </summary>
PcrDef.prototype.PCRVOLON = "J4075";
/// <summary>
/// Volume at MUTE (J4000)
/// </summary>
PcrDef.prototype.PCRVOLOFF = "J4000";

/// <summary>
/// Squelch Prefix (J41) 
/// </summary>
PcrDef.prototype.PCRSQL = "J41";
/// <summary>
/// Fully Open (J4100) 
/// </summary>
PcrDef.prototype.PCRSQLO = "J4100";
/// <summary>
/// Closed squelch at 45% (J4145) 
/// </summary>
PcrDef.prototype.PCRSQLC = "J4145";

/// <summary>
/// IF Shift Prefix (J43) 
/// </summary>
PcrDef.prototype.PCRIF = "J43";
/// <summary>
/// IF Centered (J4380)
/// </summary>
PcrDef.prototype.PCRIFC = "J4380";

/// <summary>
/// Automatic Gain Control Prefix (J45) 
/// </summary>
PcrDef.prototype.PCRAGC = "J45";
/// <summary>
/// AGC Off (J4500) 
/// </summary>
PcrDef.prototype.PCRAGCOFF = "J4500";
/// <summary>
/// AGC On  (J4501) 
/// </summary>
PcrDef.prototype.PCRAGCON = "J4501";

/// <summary>
/// Noise Blanking Prefix (J46) 
/// </summary>
PcrDef.prototype.PCRNB = "J46";
/// <summary>
/// Noise Blanking Off (J4600) 
/// </summary>
PcrDef.prototype.PCRNBOFF = "J4600";
/// <summary>
/// Noise Blanking On  (J4601) 
/// </summary>
PcrDef.prototype.PCRNBON = "J4601";

/// <summary>
/// RF Attenuator Prefix 
/// </summary>
PcrDef.prototype.PCRRFA = "J47";
/// <summary>
/// RF Attenuator Off (J4700) 
/// </summary>
PcrDef.prototype.PCRRFAOFF = "J4700";
/// <summary>
/// RF Attenuator On (J4701) 
/// </summary>
PcrDef.prototype.PCRRFAON = "J4701";

/// <summary>
/// VSC Prefix (J50) 
/// </summary>
PcrDef.prototype.PCRVSC = "J50";
/// <summary>
/// VSC Off (J5000) 
/// </summary>
PcrDef.prototype.PCRVSCOFF = "J5000";
/// <summary>
/// VSC On  (J5001) 
/// </summary>
PcrDef.prototype.PCRVSCON = "J5001";
/// <summary>
/// CTCSS - Tone Squelch Prefix (J51) 
/// </summary>
PcrDef.prototype.PCRTSQL = "J51";
/// <summary>
/// CTCSS - Tone Squelch Off (J5100) 
/// </summary>
PcrDef.prototype.PCRTSQLOFF = "J5100";
/// <summary>
/// Unknown - 1
/// </summary>
PcrDef.prototype.PCRUNK01 = "J4A";
/// <summary>
/// Unknown - 2
/// </summary>
PcrDef.prototype.PCRUNK02 = "J4A80";
/// <summary>
/// Tracking filter Prefix (LD082) 
/// </summary>
PcrDef.prototype.PCRTFLTR = "LD82";
/// <summary>
/// Automagic Tracking Filter (LD8200) 
/// </summary>
PcrDef.prototype.PCRTFLTR00 = "LD8200";
/// <summary>
/// Manual Tracking Filter (LD8201) 
/// </summary>
PcrDef.prototype.PCRTFLTR01 = "LD8201";

/// <summary>
/// Freq. Header (K0) 
/// </summary>
PcrDef.prototype.PCRFRQ = "K0";
/// <summary>
/// freq. len. 10 bytes (padded) GMMMKKKHHH (10) 
/// </summary>
PcrDef.prototype.MAXFRQLEN = 10;
/// <summary>
/// lower bounds for frequency 50 kHz (50000) 
/// </summary>
PcrDef.prototype.LOWERFRQ = 50000;	
/// <summary>
/// upper bound for frequency 1.3 GHz (1300000000) 
/// </summary>
PcrDef.prototype.UPPERFRQ = 1300000000;
/// <summary>
/// Lower sideband (00) 
/// </summary>
PcrDef.prototype.PCRMODLSB = "00";
/// <summary>
/// Upper sideband (01) 
/// </summary>
PcrDef.prototype.PCRMODUSB = "01";
/// <summary>
/// Amplitude Modulated (02) 
/// </summary>
PcrDef.prototype.PCRMODAM = "02";
/// <summary>
/// Continuous Mode (03) 
/// </summary>
PcrDef.prototype.PCRMODCW = "03";
/// <summary>
/// unknown mode -- (04) 
/// </summary>
PcrDef.prototype.PCRMODUNK = "04";
/// <summary>
/// Narrowband FM (05) 
/// </summary>
PcrDef.prototype.PCRMODNFM = "05";
/// <summary>
/// Wideband FM (06) 
/// </summary>
PcrDef.prototype.PCRMODWFM = "06";
/// <summary>
/// 3 kHz Filter (00)	
/// </summary>
PcrDef.prototype.PCRFLTR3 = "00";
/// <summary>
/// 6 kHz Filter (01) 	
/// </summary>
PcrDef.prototype.PCRFLTR6 = "01";
/// <summary>
/// 15 kHz Filter (02) 	
/// </summary>
PcrDef.prototype.PCRFLTR15 = "02";
/// <summary>
/// 50 kHz Filter (03) 	
/// </summary>
PcrDef.prototype.PCRFLTR50 = "03";
/// <summary>
/// 230 kHz Filter (04)
/// </summary>
PcrDef.prototype.PCRFLTR230 = "04";
/// <summary>
/// Query Squelch Setting (I0)
/// </summary>
PcrDef.prototype.PCRQSQL = "I0";
/// <summary>
/// Query Signal Strength (I1)
/// </summary>
PcrDef.prototype.PCRQRST = "I1?";
/// <summary>
/// Query Frequency Offset (I2)
/// </summary>
PcrDef.prototype.PCRQOFST = "I2";
/// <summary>
/// Query presense of DTMF Tone (I3)
/// </summary>
PcrDef.prototype.PCRQDTMF = "I3";
/// <summary>
/// Query Firmware revision (I4)
/// </summary>
PcrDef.prototype.PCRQWAREZ = "G4";
/// <summary>
/// Query Presense of DSP (I5)
/// </summary>
PcrDef.prototype.PCRQDSP = "GD";
/// <summary>
/// Query country / region (I6)
/// </summary>
PcrDef.prototype.PCRQCTY = "GE";
/// <summary>
/// Reply: Ok (G000)
/// </summary>
PcrDef.prototype.PCRAOK = "G000";
/// <summary>
/// Reply: Ok corrupt (G00?)
/// </summary>
PcrDef.prototype.PCRBOK = "G00?";
/// <summary>
/// Reply: There was an error (G001)
/// </summary>
PcrDef.prototype.PCRABAD = "G001";
/// <summary>
/// DSP Header (PCRQDSP)
/// </summary>
PcrDef.prototype.PCRADSP = PCRQDSP;
/// <summary>
/// Not present (GD00)
/// </summary>
PcrDef.prototype.PCRADSPNO = "GD00";
/// <summary>
/// Present (GD01)
/// </summary>
PcrDef.prototype.PCRADSPOK = "GD01";
/// <summary>
/// Squelch Header (PCRQSQL)
/// </summary>
PcrDef.prototype.PCRASQL = PCRQSQL;
/// <summary>
/// Sqlch Closed (04)
/// </summary>
PcrDef.prototype.PCRASQLCL = "04";
/// <summary>
/// Sqlch Open (07)
/// </summary>
PcrDef.prototype.PCRASQLOPN = "07";
/// <summary>
/// Signal Strength (PCRQRST)
/// \b note: You have this header
///          plus 00-FF from weak to strong
/// </summary>
PcrDef.prototype.PCRARST = PCRQRST;
/// <summary>
/// Frequency offset Header (PCRQOFST)
///	\b note: plus 00-7F from extreme (-) to near ctr OR
///          plus 81-FF from near ctr to extreme (+)
/// </summary>
PcrDef.prototype.PCRAOFST = PCRQOFST;
/// <summary>
/// Frequency (offset) centered (I280)
/// </summary>
PcrDef.prototype.PCRAOFSTCTR = "I280";

/// <summary>
/// DTMF Header (PCRQDTMF)
/// </summary>
PcrDef.prototype.PCRADTMF = PCRQDTMF;
/// <summary>
/// DTMF Not Heard (I300)
/// </summary>
PcrDef.prototype.PCRADTMFNO = "I300";
/// <summary>
/// DTMF 0 (I310)
/// </summary>
PcrDef.prototype.PCRADTMF0 = "I310";
/// <summary>
/// DTMF 1 (I311)
/// </summary>
PcrDef.prototype.PCRADTMF1 = "I311";
/// <summary>
/// DTMF 2 (I312)
/// </summary>
PcrDef.prototype.PCRADTMF2 = "I312";
/// <summary>
/// DTMF 3 (I313)
/// </summary>
PcrDef.prototype.PCRADTMF3 = "I313";
/// <summary>
/// DTMF 4 (I314) 	
/// </summary>
PcrDef.prototype.PCRADTMF4 = "I314";
/// <summary>
/// DTMF 5 (I315)
/// </summary>
PcrDef.prototype.PCRADTMF5 = "I315";
/// <summary>
/// DTMF 6 (I315)
/// </summary>
PcrDef.prototype.PCRADTMF6 = "I316";
/// <summary>
/// DTMF 7 (I316)
/// </summary>
PcrDef.prototype.PCRADTMF7 = "I317";
/// <summary>
/// DTMF 8 (I318)
/// </summary>
PcrDef.prototype.PCRADTMF8 = "I318";
/// <summary>
/// DTMF 9 (I319)
/// </summary>
PcrDef.prototype.PCRADTMF9 = "I319";
/// <summary>
/// DTMF A (I31A)
/// </summary>
PcrDef.prototype.PCRADTMFA = "I31A";
/// <summary>
/// DTMF B (I31B)
/// </summary>
PcrDef.prototype.PCRADTMFB = "I31B";
/// <summary>
/// DTMF C (I31C)
/// </summary>
PcrDef.prototype.PCRADTMFC = "I31C";
/// <summary>
/// DTMF D (I31D)
/// </summary>
PcrDef.prototype.PCRADTMFD = "I31D";
/// <summary>
/// DTMF * (I31E)
/// </summary>
PcrDef.prototype.PCRADTMFS = "I31E";
/// <summary>
/// DTMF # (I31F)
/// </summary>
PcrDef.prototype.PCRADTMFP = "I31F";

/* Radio miscellaneous functions */
/// <summary>
/// Baud Rate Header (G1)
/// </summary>
PcrDef.prototype.PCRBD = "G1";
/// <summary>
/// 300 baud (G100)
/// </summary>
PcrDef.prototype.PCRBD300 = "G100";
/// <summary>
/// 1200 baud (G101)
/// </summary>
PcrDef.prototype.PCRBD1200 = "G101";
/// <summary>
/// 2400 baud (G102)
/// </summary>
PcrDef.prototype.PCRBD2400 = "G102";
/// <summary>
/// 9600 baud (G103)
/// </summary>
PcrDef.prototype.PCRBD9600 = "G103";
/// <summary>
/// 19200 baud (G104)
/// </summary>
PcrDef.prototype.PCRBD19200 = "G104";
/// <summary>
/// 38400 baud (G105)
/// </summary>
PcrDef.prototype.PCRBD38400 = "G105";

/* BandScope functions */
/// <summary>
/// bandscope prefix SENT (ME00001)
/// </summary>
PcrDef.prototype.PCRSBSC = "ME00001";	
/// <summary>
/// bandscope prefix RECV (NE1)
/// </summary>
PcrDef.prototype.PCRRBSC = "NE1";		
/// <summary>
/// packet 0 (NE100)
/// </summary>
PcrDef.prototype.PCRRBSC0 = "NE100";		
/// <summary>
/// packet 1 (NE110)
/// </summary>
PcrDef.prototype.PCRRBSC1 = "NE110";	
/// <summary>
/// packet 2 (NE120)
/// </summary>
PcrDef.prototype.PCRRBSC2 = "NE120";	
/// <summary>
/// packet 3 (NE130)
/// </summary>
PcrDef.prototype.PCRRBSC3 = "NE130";
/// <summary>
/// packet 4 (NE140)
/// </summary>
PcrDef.prototype.PCRRBSC4 = "NE140";
/// <summary>
/// packet 5 (NE150)
/// </summary>
PcrDef.prototype.PCRRBSC5 = "NE150";
/// <summary>
/// packet 6 (NE160)
/// </summary>
PcrDef.prototype.PCRRBSC6 = "NE160";
/// <summary>
/// packet 7 (NE170)
/// </summary>
PcrDef.prototype.PCRRBSC7 = "NE170";
/// <summary>
/// packet 8 (NE180)
/// </summary>
PcrDef.prototype.PCRRBSC8 = "NE180";
/// <summary>
/// packet 9 (NE190)
/// </summary>
PcrDef.prototype.PCRRBSC9 = "NE190";
/// <summary>
/// packet 10 (NE1A0)
/// </summary>
PcrDef.prototype.PCRRBSCA = "NE1A0";
/// <summary>
/// packet 11 (NE1B0)
/// </summary>
PcrDef.prototype.PCRRBSCB = "NE1B0";
/// <summary>
/// packet 12 (NE1C0)
/// </summary>
PcrDef.prototype.PCRRBSCC = "NE1C0";
/// <summary>
/// packet 13 (NE1D0)
/// </summary>
PcrDef.prototype.PCRRBSCD = "NE1D0";
/// <summary>
/// packet 14 (NE1E0)
/// </summary>
PcrDef.prototype.PCRRBSCE = "NE1E0";
/// <summary>
/// packet 15 (NE1F0)
/// </summary>
PcrDef.prototype.PCRRBSCF = "NE1F0";