namespace Cerberus.SatPasses
{
    partial class SataliteSettings
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

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SataliteSettings));
            this.listBoxSatalites = new System.Windows.Forms.ListBox();
            this.buttonAdd = new System.Windows.Forms.Button();
            this.textBoxName = new System.Windows.Forms.TextBox();
            this.textBoxVolume = new System.Windows.Forms.TextBox();
            this.textBoxSquelch = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.checkBoxAutoGain = new System.Windows.Forms.CheckBox();
            this.checkBoxRfAtten = new System.Windows.Forms.CheckBox();
            this.checkBoxNb = new System.Windows.Forms.CheckBox();
            this.textBoxFreq = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.comboBoxFilter = new System.Windows.Forms.ComboBox();
            this.comboBoxTS = new System.Windows.Forms.ComboBox();
            this.comboBoxMode = new System.Windows.Forms.ComboBox();
            this.buttonRemove = new System.Windows.Forms.Button();
            this.buttonSave = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // listBoxSatalites
            // 
            this.listBoxSatalites.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.listBoxSatalites.Dock = System.Windows.Forms.DockStyle.Left;
            this.listBoxSatalites.FormattingEnabled = true;
            this.listBoxSatalites.ItemHeight = 15;
            this.listBoxSatalites.Location = new System.Drawing.Point(0, 0);
            this.listBoxSatalites.Name = "listBoxSatalites";
            this.listBoxSatalites.ScrollAlwaysVisible = true;
            this.listBoxSatalites.Size = new System.Drawing.Size(210, 300);
            this.listBoxSatalites.TabIndex = 0;
            this.listBoxSatalites.SelectedIndexChanged += new System.EventHandler(this.ListBoxSatalitesSelectedIndexChanged);
            // 
            // buttonAdd
            // 
            this.buttonAdd.Location = new System.Drawing.Point(242, 256);
            this.buttonAdd.Name = "buttonAdd";
            this.buttonAdd.Size = new System.Drawing.Size(99, 23);
            this.buttonAdd.TabIndex = 1;
            this.buttonAdd.Text = "Add";
            this.buttonAdd.UseVisualStyleBackColor = true;
            this.buttonAdd.Click += new System.EventHandler(this.ButtonAddClick);
            // 
            // textBoxName
            // 
            this.textBoxName.Location = new System.Drawing.Point(355, 45);
            this.textBoxName.Name = "textBoxName";
            this.textBoxName.Size = new System.Drawing.Size(180, 21);
            this.textBoxName.TabIndex = 2;
            // 
            // textBoxVolume
            // 
            this.textBoxVolume.Location = new System.Drawing.Point(458, 186);
            this.textBoxVolume.Name = "textBoxVolume";
            this.textBoxVolume.Size = new System.Drawing.Size(77, 21);
            this.textBoxVolume.TabIndex = 4;
            // 
            // textBoxSquelch
            // 
            this.textBoxSquelch.Location = new System.Drawing.Point(308, 186);
            this.textBoxSquelch.Name = "textBoxSquelch";
            this.textBoxSquelch.Size = new System.Drawing.Size(77, 21);
            this.textBoxSquelch.TabIndex = 5;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(249, 48);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(85, 15);
            this.label1.TabIndex = 6;
            this.label1.Text = "Satalite Name";
            // 
            // checkBoxAutoGain
            // 
            this.checkBoxAutoGain.AutoSize = true;
            this.checkBoxAutoGain.Location = new System.Drawing.Point(252, 101);
            this.checkBoxAutoGain.Name = "checkBoxAutoGain";
            this.checkBoxAutoGain.Size = new System.Drawing.Size(79, 19);
            this.checkBoxAutoGain.TabIndex = 8;
            this.checkBoxAutoGain.Text = "Auto Gain";
            this.checkBoxAutoGain.UseVisualStyleBackColor = true;
            // 
            // checkBoxRfAtten
            // 
            this.checkBoxRfAtten.AutoSize = true;
            this.checkBoxRfAtten.Location = new System.Drawing.Point(252, 159);
            this.checkBoxRfAtten.Name = "checkBoxRfAtten";
            this.checkBoxRfAtten.Size = new System.Drawing.Size(99, 19);
            this.checkBoxRfAtten.TabIndex = 9;
            this.checkBoxRfAtten.Text = "RF Attenuator";
            this.checkBoxRfAtten.UseVisualStyleBackColor = true;
            // 
            // checkBoxNb
            // 
            this.checkBoxNb.AutoSize = true;
            this.checkBoxNb.Location = new System.Drawing.Point(252, 130);
            this.checkBoxNb.Name = "checkBoxNb";
            this.checkBoxNb.Size = new System.Drawing.Size(93, 19);
            this.checkBoxNb.TabIndex = 10;
            this.checkBoxNb.Text = "Noise Blank";
            this.checkBoxNb.UseVisualStyleBackColor = true;
            // 
            // textBoxFreq
            // 
            this.textBoxFreq.Location = new System.Drawing.Point(355, 72);
            this.textBoxFreq.Name = "textBoxFreq";
            this.textBoxFreq.Size = new System.Drawing.Size(180, 21);
            this.textBoxFreq.TabIndex = 11;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(249, 75);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(64, 15);
            this.label4.TabIndex = 17;
            this.label4.Text = "Frequency";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(374, 131);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(34, 15);
            this.label5.TabIndex = 18;
            this.label5.Text = "Filter";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(371, 102);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(37, 15);
            this.label6.TabIndex = 19;
            this.label6.Text = "Mode";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(249, 189);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(52, 15);
            this.label7.TabIndex = 20;
            this.label7.Text = "Squelch";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(386, 160);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(22, 15);
            this.label8.TabIndex = 21;
            this.label8.Text = "TS";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(404, 189);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(48, 15);
            this.label9.TabIndex = 22;
            this.label9.Text = "Volume";
            // 
            // comboBoxFilter
            // 
            this.comboBoxFilter.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxFilter.FormattingEnabled = true;
            this.comboBoxFilter.Items.AddRange(new object[] {
            "3k",
            "6k",
            "15k",
            "50k",
            "230k"});
            this.comboBoxFilter.Location = new System.Drawing.Point(414, 128);
            this.comboBoxFilter.Name = "comboBoxFilter";
            this.comboBoxFilter.Size = new System.Drawing.Size(121, 23);
            this.comboBoxFilter.TabIndex = 23;
            // 
            // comboBoxTS
            // 
            this.comboBoxTS.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxTS.FormattingEnabled = true;
            this.comboBoxTS.Items.AddRange(new object[] {
            "Off",
            "67.0 Hz",
            "69.3 Hz",
            "71.0 Hz",
            "71.9 Hz",
            "74.4 Hz",
            "77.0 Hz",
            "79.7 Hz",
            "82.5 Hz",
            "85.4 Hz",
            "88.5 Hz",
            "91.5 Hz",
            "94.8 Hz",
            "97.4 Hz",
            "100.0 Hz",
            "103.5 Hz",
            "107.2 Hz",
            "110.9 Hz",
            "114.8 Hz",
            "118.8 Hz",
            "123.0 Hz",
            "127.3 Hz",
            "131.8 Hz",
            "136.5 Hz",
            "141.3 Hz",
            "146.2 Hz",
            "151.4 Hz",
            "156.7 Hz",
            "159.8 Hz",
            "162.2 Hz",
            "165.5 Hz",
            "167.9 Hz",
            "171.3 Hz",
            "173.8 Hz",
            "177.3 Hz",
            "179.9 Hz",
            "183.5 Hz",
            "186.2 Hz",
            "189.9 Hz",
            "192.8 Hz",
            "196.6 Hz",
            "199.5 Hz",
            "203.5 Hz",
            "206.5 Hz",
            "210.7 Hz",
            "218.1 Hz",
            "225.7 Hz",
            "229.1 Hz",
            "233.6 Hz",
            "241.8 Hz",
            "250.3 Hz",
            "254.1 Hz"});
            this.comboBoxTS.Location = new System.Drawing.Point(414, 157);
            this.comboBoxTS.Name = "comboBoxTS";
            this.comboBoxTS.Size = new System.Drawing.Size(121, 23);
            this.comboBoxTS.TabIndex = 24;
            // 
            // comboBoxMode
            // 
            this.comboBoxMode.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxMode.FormattingEnabled = true;
            this.comboBoxMode.Items.AddRange(new object[] {
            "AM",
            "CW",
            "LSB",
            "NFM",
            "USB",
            "WFM"});
            this.comboBoxMode.Location = new System.Drawing.Point(414, 99);
            this.comboBoxMode.Name = "comboBoxMode";
            this.comboBoxMode.Size = new System.Drawing.Size(121, 23);
            this.comboBoxMode.Sorted = true;
            this.comboBoxMode.TabIndex = 25;
            // 
            // buttonRemove
            // 
            this.buttonRemove.Enabled = false;
            this.buttonRemove.Location = new System.Drawing.Point(345, 256);
            this.buttonRemove.Name = "buttonRemove";
            this.buttonRemove.Size = new System.Drawing.Size(99, 23);
            this.buttonRemove.TabIndex = 26;
            this.buttonRemove.Text = "Remove";
            this.buttonRemove.UseVisualStyleBackColor = true;
            this.buttonRemove.Click += new System.EventHandler(this.ButtonRemoveClick);
            // 
            // buttonSave
            // 
            this.buttonSave.Enabled = false;
            this.buttonSave.Location = new System.Drawing.Point(448, 256);
            this.buttonSave.Name = "buttonSave";
            this.buttonSave.Size = new System.Drawing.Size(99, 23);
            this.buttonSave.TabIndex = 27;
            this.buttonSave.Text = "Save Changes";
            this.buttonSave.UseVisualStyleBackColor = true;
            this.buttonSave.Click += new System.EventHandler(this.ButtonSaveClick);
            // 
            // SataliteSettings
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(584, 300);
            this.Controls.Add(this.buttonSave);
            this.Controls.Add(this.buttonRemove);
            this.Controls.Add(this.comboBoxMode);
            this.Controls.Add(this.comboBoxTS);
            this.Controls.Add(this.comboBoxFilter);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.textBoxFreq);
            this.Controls.Add(this.checkBoxNb);
            this.Controls.Add(this.checkBoxRfAtten);
            this.Controls.Add(this.checkBoxAutoGain);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBoxSquelch);
            this.Controls.Add(this.textBoxVolume);
            this.Controls.Add(this.textBoxName);
            this.Controls.Add(this.buttonAdd);
            this.Controls.Add(this.listBoxSatalites);
            this.Font = new System.Drawing.Font("Arial", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.SizableToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "SataliteSettings";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Satalite Pass Settings";
            this.TopMost = true;
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListBox listBoxSatalites;
        private System.Windows.Forms.Button buttonAdd;
        private System.Windows.Forms.TextBox textBoxName;
        private System.Windows.Forms.TextBox textBoxVolume;
        private System.Windows.Forms.TextBox textBoxSquelch;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.CheckBox checkBoxAutoGain;
        private System.Windows.Forms.CheckBox checkBoxRfAtten;
        private System.Windows.Forms.CheckBox checkBoxNb;
        private System.Windows.Forms.TextBox textBoxFreq;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.ComboBox comboBoxFilter;
        private System.Windows.Forms.ComboBox comboBoxTS;
        private System.Windows.Forms.ComboBox comboBoxMode;
        private System.Windows.Forms.Button buttonRemove;
        private System.Windows.Forms.Button buttonSave;
    }
}