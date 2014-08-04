using System;
using System.Collections.Generic;
using System.IO;
using PCR1000;

namespace Cerberus.SatPasses
{
    public class WxTrackImporter
    {
        // Date/Time Direction Longitude Duration Sat
        // 20131229014201 N 191 848 NOAA 19
        // 2013/12/29 01:42:01

        public List<SatPass> SatalitePasses = new List<SatPass>();
        public List<SataliteSettings> SataliteSetting = new List<SataliteSettings>();

        public struct SataliteSettings
        {
            public string SatName;
            public PcrControl.PRadInf SatSet;
            public override string ToString()
            {
                return SatName;
            }
        }

        public struct SatPass
        {
            public DateTime Pass;
            public int Duration, Longitude;
            public char Direction;
            public string Satalite;
            public bool Enabled;
        }

        public WxTrackImporter(string file)
        {
            var streamReader = new StreamReader(file);
            Import(ref streamReader);
        }

        public WxTrackImporter(Stream input)
        {
            var streamReader = new StreamReader(input);
            Import(ref streamReader);
        }

        public void Import(ref StreamReader streamReader)
        {
            while (!streamReader.EndOfStream)
            {
                var line = streamReader.ReadLine();
                if (line == null) continue;
                var split = line.Split(' ');
                if (split.Length < 5) continue;
                if (split[0].Length != 14) continue;
                var parseStr = split[0].Substring(6, 2) + "/" + split[0].Substring(4, 2) + "/" + split[0].Substring(0, 4);
                parseStr += " " + split[0].Substring(8, 2) + ":" + split[0].Substring(10, 2) + ":" +
                            split[0].Substring(12, 2);
                var pass = new SatPass();
                if (!DateTime.TryParse(parseStr, out pass.Pass)) continue;
                if (DateTime.Now > pass.Pass) continue;
                if (!char.TryParse(split[1], out pass.Direction)) continue;
                if (!int.TryParse(split[2], out pass.Longitude)) continue;
                if (!int.TryParse(split[3], out pass.Duration)) continue;
                pass.Satalite = "";
                for (var i = 4; i < split.Length; i++)
                {
                    if (i > 4) pass.Satalite += " ";
                    pass.Satalite += split[i];
                }
                pass.Enabled = true;
                SatalitePasses.Add(pass);
            }
            streamReader.Close();
        }
    }
}