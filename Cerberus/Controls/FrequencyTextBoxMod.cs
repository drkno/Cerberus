using System;
using System.ComponentModel;
using System.Globalization;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace Cerberus
{
    public class FrequencyTextBoxMod : TextBox
    {
        private int multiplier = 0;
        public FrequencyTextBoxMod()
        {
            GotFocus += FrequencyTextBox_GotFocus;
            LostFocus += OnLostFocus;
        }

        private void FrequencyTextBox_GotFocus(object sender, EventArgs e)
        {
            var sel = SelectionStart;
            var sell = SelectionLength;
            Text = RestoreString();

            if (sel > 3)
            {
                sel -= 1;
            }

            if (sel <= 3 && sel + sell > 3)
            {
                sell -= 1;
            }
            SelectionStart = sel;
            SelectionLength = sell;
        }

        private void OnLostFocus(object sender, EventArgs eventArgs)
        {
            CleanString();
        }

        private string RestoreString()
        {
            var txt = Text;
            var ind = txt.IndexOf('.');
            if (ind != -1)
            {
                txt = txt.Remove(ind, 1);
            }
            for (var i = 0; i < multiplier; i++)
            {
                txt += "0";
            }
            return txt;
        }

        private void CleanString()
        {
            var res = Text;
            if (res.Length > 3)
            {
                res = res.Insert(3, ".");
            }
            multiplier = 0;
            var ind = res.LastIndexOf('0');
            while (ind != -1 && ind > 3 && ind == res.Length-1)
            {
                multiplier += 1; 
                res = res.Substring(0, ind);
                ind = res.LastIndexOf('0');
            }
            Text = res;
        }

        [Localizable(true)]
        public string Cue
        {
            get { return _mCue; }
            set { _mCue = value; UpdateCue(); }
        }

        private void UpdateCue()
        {
            if (IsHandleCreated && _mCue != null)
            {
                SendMessage(Handle, 0x1501, (IntPtr)1, _mCue);
            }
        }
        protected override void OnHandleCreated(EventArgs e)
        {
            base.OnHandleCreated(e);
            UpdateCue();
        }

        private string _mCue;

        [DllImport("user32.dll", CharSet = CharSet.Unicode)]
        private static extern IntPtr SendMessage(IntPtr hWnd, int msg, IntPtr wp, string lp);

        protected override void OnKeyPress(KeyPressEventArgs e)
        {
            base.OnKeyPress(e);
            Console.WriteLine(e.KeyChar);
            if (e.KeyChar == '\b')
            {
                return;
            }
            
            if (!char.IsDigit(e.KeyChar) || TextLength >= 12)
            {
                e.Handled = true;
            }
        }

        public ulong FrequencyValue
        {
            get
            {
                try
                {
                    return ulong.Parse(RestoreString());
                }
                catch (Exception)
                {
                    return 0;
                }
            }
        }
    }
}