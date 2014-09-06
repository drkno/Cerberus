using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Cerberus.Controls
{
    public partial class FrequencyTextBoxArea : UserControl
    {
        public FrequencyTextBoxArea()
        {
            InitializeComponent();
        }

        private void textBoxFrequency_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode != Keys.Enter) return;
            labelHz.Focus();
        }
    }
}
