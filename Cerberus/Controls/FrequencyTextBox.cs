using System;
using System.ComponentModel;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;
using System.Windows.Forms;

namespace Cerberus
{
    public class FrequencyTextBox : TextBox
    {
        public FrequencyTextBox()
        {
            KeyDown += OnMouseDown;
            GotFocus += FrequencyTextBox_GotFocus;
        }

        private void FrequencyTextBox_GotFocus(object sender, EventArgs e)
        {
            var sel = SelectionStart;
            var sell = SelectionLength;
            var temp = Text;
            temp = temp.Replace(".", "");
            Text = temp;
            sel -= TextLength/4;
            sell -= sell/4;
            if (sel < 0) return;
            SelectionStart = sel;
            SelectionLength = sell;
        }

        private void OnMouseDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode != Keys.Enter) return;
            var temp = Text;
            for (var i = temp.Length % 3; i < temp.Length; i += 3)
            {
                temp = temp.Insert(i, ".");
                i += 1;
            }
            if (temp.StartsWith(".") && temp.Length > 2)
            {
                temp = temp.Remove(0, 1);
            }
            if (temp.EndsWith("."))
            {
                temp = temp.Remove(temp.Length-1, 1);
            }
            temp = Regex.Replace(temp, @"[.]([.]+)", "");
            Text = temp;
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
                    var value = ulong.Parse(Text.Replace(".", ""));
                    return value;
                }
                catch (Exception)
                {
                    return 0;
                }
            }
        }
    }
}