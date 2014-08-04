using System;
using System.Collections.Generic;
using System.Drawing;
using System.Threading;
using System.Windows.Forms;
using Cerberus.SatPasses;
using PCR1000;

namespace Cerberus
{
    public partial class MainWindow : Form
    {
        protected PcrControl PcrController;
        private Thread evenThread;

        public MainWindow()
        {
            InitializeComponent();
            try
            {
                string port;
                if (string.IsNullOrWhiteSpace(port = ComSelection.Get()))
                {
                    EMessageBox.ShowDialog("No ComPort Provided. Quitting...", "Startup Error");
                    Environment.Exit(-1);
                }
                else
                {
                    if (port.Contains(":"))
                    {
                        var split = port.Split(':');
                        if (split.Length != 2)
                        {
                            EMessageBox.ShowDialog("Invalid Host/Port Provided. Quitting...", "Startup Error");
                            Environment.Exit(-1);
                        }
                        PcrController = new PcrControl(int.Parse(split[1]), split[0]);
                    }
                    else
                    {
                        PcrController = new PcrControl(port);
                    }
                    PcrController.SetComDebugLogging(true);
                }
            }
            catch (Exception ex)
            {
                EMessageBox.ShowDialog("An unknown error occured with this message:\n" + ex.Message, "Startup Error");
                Environment.Exit(-1);
            }
            
#if DEBUG
            PcrController.SetComDebugLogging(true);
#endif
            comboBoxMode.SelectedIndex = 0;
            comboBoxFilter.SelectedIndex = 0;
            comboBoxTS.SelectedIndex = 0;
            comboBoxNb.SelectedIndex = 0;
            evenThread = new Thread(EventThreadHandler);
        }

        private void EventThreadHandler()
        {
            try
            {
                while (evenThread.ThreadState != ThreadState.AbortRequested)
                {
                    var value = (float)PcrController.PcrSigStrength();
                    value /= 255.0f;
                    value *= 15.0f;
                    Invoke(new MethodInvoker(delegate
                                                  {
                                                      if (PcrController.PcrIsOn())
                                                      {
                                                          freqMeter.Value = value;
                                                          freqMeter.Refresh();
                                                      }
                                                  }));
                    Thread.Sleep(500);
                }
            }
            catch (ThreadAbortException)
            {
            }
        }

        private void ButtonExitClick(object sender, EventArgs e)
        {
            Environment.Exit(0);
        }

        private void ButtonMinimiseClick(object sender, EventArgs e)
        {
            WindowState = FormWindowState.Minimized;
        }

        protected override void WndProc(ref Message message)
        {
            base.WndProc(ref message);

            if (message.Msg == 0x84 && (int) message.Result == 0x1)
            {
                message.Result = (IntPtr)0x2;
            }
        }

        private readonly Pen _borderInactivePen = new Pen(Color.DodgerBlue, 1);
        private readonly Pen _borderActivePen = new Pen(Color.Orange, 1);

        private void MainWindowPaint(object sender, PaintEventArgs e)
        {
            e.Graphics.DrawRectangle(PcrController.PcrIsOn()?_borderActivePen:_borderInactivePen, 0, 0, Width - 1, Height - 1);
        }

        private void ComboBoxModeSelectedIndexChanged(object sender, EventArgs e)
        {
            if (!PcrController.PcrIsOn()) return;
            var selection = comboBoxMode.SelectedItem.ToString();
            if (selection == "FM") selection = "nfm";
            PcrController.PcrSetMode(selection);
        }

        private void ComboBoxFilterSelectedIndexChanged(object sender, EventArgs e)
        {
            if (!PcrController.PcrIsOn()) return;
            var filter = comboBoxMode.SelectedItem.ToString().Replace("k", "");
            PcrController.PcrSetFilter(filter);
        }

        private void ComboBoxTsSelectedIndexChanged(object sender, EventArgs e)
        {
            if (!PcrController.PcrIsOn()) return;
            var filter = comboBoxTS.SelectedItem.ToString().Replace(" Hz", "");
            if (filter == "Off")
            {
                filter = "0.0";
            }
            float ts;
            if (!float.TryParse(filter, out ts)) return;
            if (!PcrController.PcrSetToneSq(ts))
            {
                EMessageBox.ShowDialog("Setting Tone Squelch Failed.","Error");
            }
        }

        private void PowerButtonMouseUp(object sender, MouseEventArgs me)
        {
            try
            {
                if (PcrController.PcrIsOn())
                {
                    evenThread.Abort();
                    if (!PcrController.PcrPowerDown())
                    {
                        throw new Exception("Power Down Failed");
                    }
                    powerButton.SwitchPower();
                }
                else
                {
                    if (!PcrController.PcrPowerUp())
                    {
                        throw new Exception("Power Up Failed");
                    }
                    powerButton.SwitchPower();
                    evenThread.Start();
                    var scrollEventArgs = new ScrollEventArgs(ScrollEventType.SmallIncrement, hScrollBarSquelch.Value);
                    HScrollBarSquelchScroll(null, scrollEventArgs);
                    scrollEventArgs = new ScrollEventArgs(ScrollEventType.SmallIncrement, hScrollBarAfGain.Value);
                    HScrollBarAfGainScroll(null, scrollEventArgs);
                    PcrController.PcrSetFreq(textBoxFrequency.FrequencyValue);
                    ComboBoxFilterSelectedIndexChanged(null, null);
                    ComboBoxModeSelectedIndexChanged(null, null);
                }
                Refresh();
            }
            catch (Exception e)
            {
                EMessageBox.ShowDialog("An error occured:\n" + e.Message, "Error");
            }
        }

        private void HScrollBarAfGainScroll(object sender, ScrollEventArgs e)
        {
            if (!PcrController.PcrIsOn()) return;
            try
            {
                if (!PcrController.PcrSetVolume(e.NewValue))
                {
                    throw new Exception("Setting gain failed.");
                }
            }
            catch (Exception ex)
            {
                EMessageBox.ShowDialog(ex.Message, "Error");
            }
        }

        private void HScrollBarSquelchScroll(object sender, ScrollEventArgs e)
        {
            if (!PcrController.PcrIsOn()) return;
            try
            {
                if (!PcrController.PcrSetSquelch(e.NewValue))
                {
                    throw new Exception("Setting squelch failed.");
                }
            }
            catch (Exception ex)
            {
                EMessageBox.ShowDialog(ex.Message, "Error");
            }
        }

        private void MainWindowFormClosing(object sender, FormClosingEventArgs e)
        {
            if (_passController != null)
            {
                _passController.Stop();
            }
            PcrController.PcrPowerDown();
        }

        private void TextBoxFrequencyKeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode != Keys.Enter) return;
            buttonMinimise.Focus();
            if (!PcrController.PcrIsOn()) return;
            PcrController.PcrSetFreq(textBoxFrequency.FrequencyValue);
        }

        private void ComboBoxNbSelectedIndexChanged(object sender, EventArgs e)
        {
            if (!PcrController.PcrIsOn()) return;
            PcrController.PcrSetNb(comboBoxNb.SelectedItem.ToString() == "On");
        }

        private WxTrackImporter _satalitePasses;
        private PassController _passController;
        private void ButtonLoadPassListClick(object sender, EventArgs e)
        {
            if (_satalitePasses == null)
            {
                var openFile = new OpenFileDialog {Filter = "*.txt|*.txt", Title = "WxTrack PassList"};
                if (openFile.ShowDialog() == DialogResult.OK)
                {
                    try
                    {
                        _satalitePasses = new WxTrackImporter(openFile.FileName);
                        buttonLoadPassList.Text = "Show Satalite Passes";
                    }
                    catch (Exception)
                    {
                        EMessageBox.ShowDialog("Error importing PassList.", "Error");
                    }
                }
            }
            var passList = new SatalitePassList(ref _satalitePasses);
            passList.ShowDialog();
        }

        private void CheckBoxAutoTuneCheckedChanged(object sender, EventArgs e)
        {
            if (checkBoxAutoTune.Checked)
            {
                if (_satalitePasses == null || _satalitePasses.SatalitePasses == null)
                {
                    EMessageBox.ShowDialog("Autotune enable failed.\nYou need to load a pass list first.", "AutoTune Error");
                    checkBoxAutoTune.Checked = false;
                    return;
                }
                if (!PcrController.PcrIsOn())
                {
                    EMessageBox.ShowDialog("Autotune enable failed.\nYou need to turn the radio on first.", "AutoTune Error");
                    checkBoxAutoTune.Checked = false;
                    return;
                }
                _passController = new PassController(ref _satalitePasses, ref PcrController, new List<WxTrackImporter.SataliteSettings>());
                _passController.Begin();
            }
            else
            {
                if (_passController != null)
                {
                    _passController.Stop();
                }
            }
        }
    }
}
