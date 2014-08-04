using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using PCR1000;

namespace Cerberus.SatPasses
{
    class PassController
    {
        private readonly List<WxTrackImporter.SataliteSettings> _sataliteSettings; 
        private readonly WxTrackImporter _wxTrack;
        private readonly PcrControl _pcrController;
        private Thread _thread;
// ReSharper disable NotAccessedField.Local
        private Timer _timer;
// ReSharper restore NotAccessedField.Local

        public PassController(ref WxTrackImporter wxTrack, ref PcrControl pcrControl,
            List<WxTrackImporter.SataliteSettings> sataliteSettings)
        {
            _sataliteSettings = sataliteSettings;
            _wxTrack = wxTrack;
            _pcrController = pcrControl;
        }

        public void Begin()
        {
            _thread = new Thread(BeginPassMonitor);
            _thread.Start();
        }

        public void Stop()
        {
            if (_thread != null)
            {
                _thread.Abort();
            }
        }

        private void BeginPassMonitor()
        {
            try
            {
                for (var index = 0; index < _wxTrack.SatalitePasses.Count; index++)
                {
                    if (_wxTrack.SatalitePasses[index].Pass < DateTime.Now)
                    {
                        continue;
                    }
                    _wxTrack.SatalitePasses.RemoveRange(0, index);
                    break;
                }

                while (_wxTrack.SatalitePasses.Count > 0)
                {
                    var wait = _wxTrack.SatalitePasses[0].Pass - DateTime.Now;
                    _timer = new Timer(o => SatPass(_wxTrack.SatalitePasses[0]), null, TimeSpan.Zero, wait);
                    _wxTrack.SatalitePasses.RemoveAt(0);
                }
            }
            catch (ThreadAbortException)
            {
            }
        }

        private void SatPass(WxTrackImporter.SatPass pass)
        {
            if (!pass.Enabled) return;
            
            foreach (var sataliteSettings in _sataliteSettings.Where(sataliteSettings => sataliteSettings.SatName == _wxTrack.SatalitePasses[0].Satalite))
            {
                var origSettings = _pcrController.PcrGetRadioInfo();
                _pcrController.PcrSetRadioInfo(sataliteSettings.SatSet);
                Thread.Sleep(pass.Duration * 1000);
                _pcrController.PcrSetRadioInfo(origSettings);
                break;
            }
        }
    }
}
