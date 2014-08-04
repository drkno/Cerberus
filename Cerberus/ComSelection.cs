using System;
using System.Drawing;
using System.Globalization;
using System.IO.Ports;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace Cerberus
{
    public partial class ComSelection : Form
    {
        public string GetComPortSelection()
        {
            if (comboBoxPorts.SelectedIndex < 0 || comboBoxPorts.SelectedIndex >= comboBoxPorts.Items.Count) return null;
            var port = comboBoxPorts.SelectedItem.ToString();
            if (port == "Network...")
            {
                port = textBoxHost.Text + ":" + textBoxPort.Text;
            }
            return port;
        }


        public ComSelection(string host = "127.0.0.1", int port = 4456, int defaultIndex = 0)
        {
            InitializeComponent();
            label1.MouseDown += ComSelectionMouseDown;
            label2.MouseDown += ComSelectionMouseDown;
            label3.MouseDown += ComSelectionMouseDown;
            label4.MouseDown += ComSelectionMouseDown;
            labelTitle.MouseDown += ComSelectionMouseDown;
            panelTitleBar.MouseDown += ComSelectionMouseDown;

            foreach (var p in SerialPort.GetPortNames())
            {
                comboBoxPorts.Items.Add(p);
            }

            comboBoxPorts.Items.Add("Network...");
            textBoxHost.Text = host;
            textBoxPort.Text = port.ToString(CultureInfo.InvariantCulture);
            if (comboBoxPorts.Items.Count == 0)
            {
                return;
            }
            comboBoxPorts.SelectedIndex = defaultIndex;
        }

        public static string Get()
        {
            var dialog = new ComSelection();
            dialog.ShowDialog();
            return dialog.GetComPortSelection();
        }

        

        private readonly Pen _borderPen = new Pen(Color.DodgerBlue);

        private void EMessageBoxPaint(object sender, PaintEventArgs e)
        {
            e.Graphics.DrawRectangle(_borderPen, 0, 0, Width-1, Height-1);
        }

        private void ButtonOkClick(object sender, EventArgs e)
        {
            int temp;
            if (!int.TryParse(textBoxPort.Text, out temp) || temp < 0)
            {
                EMessageBox.ShowDialog("Invalid Port Number Provided", "Error");
                return;
            }

            if (string.IsNullOrWhiteSpace(textBoxHost.Text) || textBoxHost.Text.Contains(" ") || textBoxHost.Text.Contains(":"))
            {
                EMessageBox.ShowDialog("Invalid Host Provided", "Error");
                return;
            }
            Close();
        }

        [DllImport("user32.dll")]
        public static extern int SendMessage(IntPtr hWnd, int msg, int wParam, int lpar);
        [DllImport("user32.dll")]
        public static extern bool ReleaseCapture();

        private void ComSelectionMouseDown(object sender, MouseEventArgs e)
        {
            if (e.Button != MouseButtons.Left) return;
            ReleaseCapture();
            SendMessage(Handle, 0xA1, 0x2, 0);
        }

        private void comboBoxPorts_SelectedIndexChanged(object sender, EventArgs e)
        {
            if (comboBoxPorts.SelectedIndex < 0 || comboBoxPorts.SelectedIndex >= comboBoxPorts.Items.Count) return;
            if (comboBoxPorts.SelectedItem.ToString() == "Network...")
            {
                textBoxHost.Enabled = textBoxPort.Enabled = true;
            }
            else
            {
                textBoxHost.Enabled = textBoxPort.Enabled = false;
            }
        }
    }
}
