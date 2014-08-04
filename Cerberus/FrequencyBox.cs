using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Cerberus
{
    public partial class FrequencyBox : RichTextBox
    {
        public FrequencyBox()
        {
            InitializeComponent();
            TextChanged += OnTextChanged;
            RichTextShortcutsEnabled = false;
            SelectAll();
            SelectionAlignment = HorizontalAlignment.Center;
            DeselectAll();
        }

        private void OnTextChanged(object sender, EventArgs eventArgs)
        {
            if (!string.IsNullOrEmpty(Text) && TextLength > 15)
            {
                Undo();
                return;
            }

            
        }
    }
}
