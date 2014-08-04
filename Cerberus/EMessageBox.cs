using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace Cerberus
{
    public partial class EMessageBox : Form
    {
        public EMessageBox(string message = "", string title = "")
        {
            InitializeComponent();
            if (!string.IsNullOrWhiteSpace(message)) labelMessage.Text = message;
            if (string.IsNullOrWhiteSpace(message)) return;
            labelTitle.Text = title;
            Text = title;
            labelTitle.MouseDown += EMessageBoxMouseDown;
            labelMessage.MouseDown += EMessageBoxMouseDown;
            label1.MouseDown += EMessageBoxMouseDown;
            panelTitleBar.MouseDown += EMessageBoxMouseDown;
        }

        public override sealed string Text
        {
            get { return base.Text; }
            set { base.Text = value; }
        }

        public static void ShowDialog(string message, string title)
        {
            try
            {
                var dialog = new EMessageBox(message, title);
                dialog.ShowDialog();
            }
            catch (Exception)
            {
                MessageBox.Show(message, title, MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }

        private readonly Pen _borderPen = new Pen(Color.DodgerBlue);

        private void EMessageBoxPaint(object sender, PaintEventArgs e)
        {
            e.Graphics.DrawRectangle(_borderPen, 0, 0, Width-1, Height-1);
        }

        private void ButtonOkClick(object sender, EventArgs e)
        {
            Close();
        }

        [DllImportAttribute("user32.dll")]
        public static extern int SendMessage(IntPtr hWnd, int msg, int wParam, int lpar);
        [DllImportAttribute("user32.dll")]
        public static extern bool ReleaseCapture(); 

        private void EMessageBoxMouseDown(object sender, MouseEventArgs e)
        {
            if (e.Button != MouseButtons.Left) return;
            ReleaseCapture();
            SendMessage(Handle, 0xA1, 0x2, 0);
        }
    }
}
