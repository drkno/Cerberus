namespace Cerberus.Controls
{
    partial class FrequencyTextBoxArea
    {
        /// <summary> 
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary> 
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Component Designer generated code

        /// <summary> 
        /// Required method for Designer support - do not modify 
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.tableLayoutPanelInput = new System.Windows.Forms.TableLayoutPanel();
            this.tableLayoutPanelType = new System.Windows.Forms.TableLayoutPanel();
            this.labelGHz = new System.Windows.Forms.Label();
            this.labelMHZ = new System.Windows.Forms.Label();
            this.labelkHz = new System.Windows.Forms.Label();
            this.labelHz = new System.Windows.Forms.Label();
            this.textBoxFrequency = new Cerberus.FrequencyTextBoxMod();
            this.tableLayoutPanelInput.SuspendLayout();
            this.tableLayoutPanelType.SuspendLayout();
            this.SuspendLayout();
            // 
            // tableLayoutPanelInput
            // 
            this.tableLayoutPanelInput.ColumnCount = 2;
            this.tableLayoutPanelInput.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 86.9969F));
            this.tableLayoutPanelInput.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 13.0031F));
            this.tableLayoutPanelInput.Controls.Add(this.textBoxFrequency, 0, 0);
            this.tableLayoutPanelInput.Controls.Add(this.tableLayoutPanelType, 1, 0);
            this.tableLayoutPanelInput.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanelInput.Location = new System.Drawing.Point(0, 0);
            this.tableLayoutPanelInput.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanelInput.Name = "tableLayoutPanelInput";
            this.tableLayoutPanelInput.RowCount = 1;
            this.tableLayoutPanelInput.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Percent, 50F));
            this.tableLayoutPanelInput.Size = new System.Drawing.Size(488, 62);
            this.tableLayoutPanelInput.TabIndex = 0;
            // 
            // tableLayoutPanelType
            // 
            this.tableLayoutPanelType.ColumnCount = 1;
            this.tableLayoutPanelType.ColumnStyles.Add(new System.Windows.Forms.ColumnStyle(System.Windows.Forms.SizeType.Percent, 100F));
            this.tableLayoutPanelType.Controls.Add(this.labelGHz, 0, 3);
            this.tableLayoutPanelType.Controls.Add(this.labelMHZ, 0, 2);
            this.tableLayoutPanelType.Controls.Add(this.labelkHz, 0, 1);
            this.tableLayoutPanelType.Controls.Add(this.labelHz, 0, 0);
            this.tableLayoutPanelType.Dock = System.Windows.Forms.DockStyle.Fill;
            this.tableLayoutPanelType.Location = new System.Drawing.Point(424, 0);
            this.tableLayoutPanelType.Margin = new System.Windows.Forms.Padding(0);
            this.tableLayoutPanelType.Name = "tableLayoutPanelType";
            this.tableLayoutPanelType.RowCount = 5;
            this.tableLayoutPanelType.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 15F));
            this.tableLayoutPanelType.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 15F));
            this.tableLayoutPanelType.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 15F));
            this.tableLayoutPanelType.RowStyles.Add(new System.Windows.Forms.RowStyle(System.Windows.Forms.SizeType.Absolute, 15F));
            this.tableLayoutPanelType.RowStyles.Add(new System.Windows.Forms.RowStyle());
            this.tableLayoutPanelType.Size = new System.Drawing.Size(64, 62);
            this.tableLayoutPanelType.TabIndex = 1;
            // 
            // labelGHz
            // 
            this.labelGHz.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelGHz.Font = new System.Drawing.Font("Arial Narrow", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelGHz.Location = new System.Drawing.Point(3, 45);
            this.labelGHz.Name = "labelGHz";
            this.labelGHz.Size = new System.Drawing.Size(58, 15);
            this.labelGHz.TabIndex = 3;
            this.labelGHz.Text = "GHz";
            this.labelGHz.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelMHZ
            // 
            this.labelMHZ.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelMHZ.Font = new System.Drawing.Font("Arial Narrow", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelMHZ.Location = new System.Drawing.Point(3, 30);
            this.labelMHZ.Name = "labelMHZ";
            this.labelMHZ.Size = new System.Drawing.Size(58, 15);
            this.labelMHZ.TabIndex = 2;
            this.labelMHZ.Text = "MHz";
            this.labelMHZ.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelkHz
            // 
            this.labelkHz.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelkHz.Font = new System.Drawing.Font("Arial Narrow", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelkHz.Location = new System.Drawing.Point(3, 15);
            this.labelkHz.Name = "labelkHz";
            this.labelkHz.Size = new System.Drawing.Size(58, 15);
            this.labelkHz.TabIndex = 1;
            this.labelkHz.Text = "kHz";
            this.labelkHz.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // labelHz
            // 
            this.labelHz.Dock = System.Windows.Forms.DockStyle.Fill;
            this.labelHz.Font = new System.Drawing.Font("Arial Narrow", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.labelHz.Location = new System.Drawing.Point(3, 0);
            this.labelHz.Name = "labelHz";
            this.labelHz.Size = new System.Drawing.Size(58, 15);
            this.labelHz.TabIndex = 0;
            this.labelHz.Text = "Hz";
            this.labelHz.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // textBoxFrequency
            // 
            this.textBoxFrequency.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBoxFrequency.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.textBoxFrequency.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textBoxFrequency.Cue = "000000000000";
            this.textBoxFrequency.Font = new System.Drawing.Font("Arial", 39.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBoxFrequency.ForeColor = System.Drawing.Color.White;
            this.textBoxFrequency.Location = new System.Drawing.Point(0, 0);
            this.textBoxFrequency.Margin = new System.Windows.Forms.Padding(0);
            this.textBoxFrequency.Name = "textBoxFrequency";
            this.textBoxFrequency.Size = new System.Drawing.Size(424, 61);
            this.textBoxFrequency.TabIndex = 9;
            this.textBoxFrequency.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.textBoxFrequency.KeyDown += new System.Windows.Forms.KeyEventHandler(this.textBoxFrequency_KeyDown);
            // 
            // FrequencyTextBoxArea
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.Controls.Add(this.tableLayoutPanelInput);
            this.Name = "FrequencyTextBoxArea";
            this.Size = new System.Drawing.Size(488, 62);
            this.tableLayoutPanelInput.ResumeLayout(false);
            this.tableLayoutPanelInput.PerformLayout();
            this.tableLayoutPanelType.ResumeLayout(false);
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.TableLayoutPanel tableLayoutPanelInput;
        private System.Windows.Forms.TableLayoutPanel tableLayoutPanelType;
        private System.Windows.Forms.Label labelGHz;
        private System.Windows.Forms.Label labelMHZ;
        private System.Windows.Forms.Label labelkHz;
        private System.Windows.Forms.Label labelHz;
        private FrequencyTextBoxMod textBoxFrequency;
    }
}
