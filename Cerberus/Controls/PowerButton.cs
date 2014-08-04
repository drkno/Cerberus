using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace Cerberus
{
    class PowerButton : Panel
    {
        private int State { get; set; }
        public PowerButton()
        {
            State = 0;
            Paint += OnPaint;
            MouseEnter += OnMouseEnter;
            MouseLeave += OnMouseLeave;
        }

        private void OnMouseLeave(object sender, EventArgs e)
        {
            switch (State)
            {
                case 1: State = 0; break;
                case 3: State = 2; break;
            }
            Refresh();
        }

        private void OnMouseEnter(object sender, EventArgs e)
        {
            switch (State)
            {
                case 0: State = 1; break;
                case 2: State = 3; break;
            }
            Refresh();
        }

        private readonly Pen _powerOnPen = new Pen(Color.Orange, 5);
        private readonly Pen _powerOnOverPen = new Pen(Color.OrangeRed, 5);
        private readonly Pen _powerOffPen = new Pen(Color.DodgerBlue, 5);
        private readonly Pen _powerOffOverPen = new Pen(Color.SkyBlue, 5);

        private Pen GetPen()
        {
            switch (State)
            {
                case 0: return _powerOffPen;
                case 1: return _powerOffOverPen;
                case 2: return _powerOnPen;
                case 3: return _powerOnOverPen;
                default: return _powerOffPen;
            }
        }

        public void SwitchPower()
        {
            switch (State)
            {
                case 0: State = 2; break;
                case 1: State = 3; break;
                case 2: State = 0; break;
                case 3: State = 1; break;
            }
            Refresh();
        }

        private void OnPaint(object sender, PaintEventArgs e)
        {
            e.Graphics.SmoothingMode = SmoothingMode.HighQuality;
            e.Graphics.DrawEllipse(GetPen(), Width / 8.0f - 0.5f, Height / 4.0f - 6.5f, (Width / 4.0f) * 3.0f, Height / 4.0f * 3.0f);
            e.Graphics.DrawLine(GetPen(), Width / 2.0f, 5 - 2, Width / 2.0f, Height - Height / 3f - 2);
            e.Graphics.DrawEllipse(new Pen(GetPen().Brush, 1), 0, 0, Width - 1, Height - 1);
        }
    }
}
