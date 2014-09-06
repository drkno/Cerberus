namespace Cerberus
{
    partial class MainWindow
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(MainWindow));
            this.buttonExit = new System.Windows.Forms.Button();
            this.buttonMinimise = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.comboBoxMode = new System.Windows.Forms.ComboBox();
            this.label3 = new System.Windows.Forms.Label();
            this.groupBoxFreq = new System.Windows.Forms.GroupBox();
            this.powerButton = new Cerberus.PowerButton();
            this.label7 = new System.Windows.Forms.Label();
            this.comboBoxNb = new System.Windows.Forms.ComboBox();
            this.label8 = new System.Windows.Forms.Label();
            this.comboBoxTS = new System.Windows.Forms.ComboBox();
            this.label6 = new System.Windows.Forms.Label();
            this.hScrollBarSquelch = new System.Windows.Forms.HScrollBar();
            this.label5 = new System.Windows.Forms.Label();
            this.hScrollBarAfGain = new System.Windows.Forms.HScrollBar();
            this.label4 = new System.Windows.Forms.Label();
            this.comboBoxFilter = new System.Windows.Forms.ComboBox();
            this.textBoxFrequency = new Cerberus.FrequencyTextBox();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label12 = new System.Windows.Forms.Label();
            this.textBox3 = new System.Windows.Forms.TextBox();
            this.textBox2 = new System.Windows.Forms.TextBox();
            this.label11 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.button1 = new System.Windows.Forms.Button();
            this.checkBoxAutoTune = new System.Windows.Forms.CheckBox();
            this.buttonLoadPassList = new System.Windows.Forms.Button();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.label9 = new System.Windows.Forms.Label();
            this.freqMeter = new Cerberus.FreqMeter();
            this.frequencyTextBoxRev1 = new Cerberus.Controls.FrequencyTextBoxArea();
            this.groupBoxFreq.SuspendLayout();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.SuspendLayout();
            // 
            // buttonExit
            // 
            this.buttonExit.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonExit.FlatAppearance.BorderSize = 0;
            this.buttonExit.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonExit.Font = new System.Drawing.Font("Wingdings 2", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(2)));
            this.buttonExit.ForeColor = System.Drawing.Color.White;
            this.buttonExit.Location = new System.Drawing.Point(918, 1);
            this.buttonExit.Name = "buttonExit";
            this.buttonExit.Size = new System.Drawing.Size(29, 24);
            this.buttonExit.TabIndex = 0;
            this.buttonExit.Tag = "Exit";
            this.buttonExit.Text = "Í";
            this.buttonExit.UseVisualStyleBackColor = true;
            this.buttonExit.Click += new System.EventHandler(this.ButtonExitClick);
            // 
            // buttonMinimise
            // 
            this.buttonMinimise.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonMinimise.FlatAppearance.BorderSize = 0;
            this.buttonMinimise.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonMinimise.Font = new System.Drawing.Font("Calibri", 11.25F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonMinimise.ForeColor = System.Drawing.Color.White;
            this.buttonMinimise.Location = new System.Drawing.Point(889, 1);
            this.buttonMinimise.Name = "buttonMinimise";
            this.buttonMinimise.Size = new System.Drawing.Size(29, 24);
            this.buttonMinimise.TabIndex = 1;
            this.buttonMinimise.Tag = "Minimise";
            this.buttonMinimise.Text = "–";
            this.buttonMinimise.TextAlign = System.Drawing.ContentAlignment.BottomCenter;
            this.buttonMinimise.UseVisualStyleBackColor = true;
            this.buttonMinimise.Click += new System.EventHandler(this.ButtonMinimiseClick);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label1.ForeColor = System.Drawing.Color.Gray;
            this.label1.Location = new System.Drawing.Point(24, 3);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(127, 16);
            this.label1.TabIndex = 2;
            this.label1.Text = "Cerberus - PCR1000";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Font = new System.Drawing.Font("Lucida Handwriting", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label2.ForeColor = System.Drawing.Color.White;
            this.label2.Location = new System.Drawing.Point(1, 2);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(20, 20);
            this.label2.TabIndex = 3;
            this.label2.Text = "C";
            // 
            // comboBoxMode
            // 
            this.comboBoxMode.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.comboBoxMode.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxMode.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.comboBoxMode.Font = new System.Drawing.Font("Arial", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.comboBoxMode.ForeColor = System.Drawing.Color.White;
            this.comboBoxMode.FormattingEnabled = true;
            this.comboBoxMode.Items.AddRange(new object[] {
            "AM",
            "CW",
            "FM",
            "LSB",
            "USB",
            "WFM"});
            this.comboBoxMode.Location = new System.Drawing.Point(83, 85);
            this.comboBoxMode.Name = "comboBoxMode";
            this.comboBoxMode.Size = new System.Drawing.Size(121, 25);
            this.comboBoxMode.Sorted = true;
            this.comboBoxMode.TabIndex = 6;
            this.comboBoxMode.Tag = "Mode";
            this.comboBoxMode.SelectedIndexChanged += new System.EventHandler(this.ComboBoxModeSelectedIndexChanged);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label3.ForeColor = System.Drawing.Color.White;
            this.label3.Location = new System.Drawing.Point(34, 89);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(40, 16);
            this.label3.TabIndex = 7;
            this.label3.Tag = "";
            this.label3.Text = "Mode";
            // 
            // groupBoxFreq
            // 
            this.groupBoxFreq.Controls.Add(this.powerButton);
            this.groupBoxFreq.Controls.Add(this.label7);
            this.groupBoxFreq.Controls.Add(this.comboBoxNb);
            this.groupBoxFreq.Controls.Add(this.label8);
            this.groupBoxFreq.Controls.Add(this.comboBoxTS);
            this.groupBoxFreq.Controls.Add(this.label6);
            this.groupBoxFreq.Controls.Add(this.hScrollBarSquelch);
            this.groupBoxFreq.Controls.Add(this.label5);
            this.groupBoxFreq.Controls.Add(this.hScrollBarAfGain);
            this.groupBoxFreq.Controls.Add(this.label4);
            this.groupBoxFreq.Controls.Add(this.comboBoxFilter);
            this.groupBoxFreq.Controls.Add(this.textBoxFrequency);
            this.groupBoxFreq.Controls.Add(this.label3);
            this.groupBoxFreq.Controls.Add(this.comboBoxMode);
            this.groupBoxFreq.ForeColor = System.Drawing.Color.Gray;
            this.groupBoxFreq.Location = new System.Drawing.Point(27, 31);
            this.groupBoxFreq.Name = "groupBoxFreq";
            this.groupBoxFreq.Size = new System.Drawing.Size(891, 156);
            this.groupBoxFreq.TabIndex = 9;
            this.groupBoxFreq.TabStop = false;
            this.groupBoxFreq.Text = "Frequency";
            // 
            // powerButton
            // 
            this.powerButton.BackColor = System.Drawing.Color.Transparent;
            this.powerButton.Location = new System.Drawing.Point(807, 22);
            this.powerButton.Name = "powerButton";
            this.powerButton.Size = new System.Drawing.Size(45, 45);
            this.powerButton.TabIndex = 10;
            this.powerButton.MouseUp += new System.Windows.Forms.MouseEventHandler(this.PowerButtonMouseUp);
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label7.ForeColor = System.Drawing.Color.White;
            this.label7.Location = new System.Drawing.Point(630, 120);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(95, 16);
            this.label7.TabIndex = 18;
            this.label7.Tag = "";
            this.label7.Text = "Noise Blanking";
            // 
            // comboBoxNb
            // 
            this.comboBoxNb.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.comboBoxNb.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxNb.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.comboBoxNb.Font = new System.Drawing.Font("Arial", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.comboBoxNb.ForeColor = System.Drawing.Color.White;
            this.comboBoxNb.FormattingEnabled = true;
            this.comboBoxNb.Items.AddRange(new object[] {
            "Off",
            "On"});
            this.comboBoxNb.Location = new System.Drawing.Point(731, 116);
            this.comboBoxNb.Name = "comboBoxNb";
            this.comboBoxNb.Size = new System.Drawing.Size(121, 25);
            this.comboBoxNb.TabIndex = 17;
            this.comboBoxNb.Tag = "Noise Blanking";
            this.comboBoxNb.SelectedIndexChanged += new System.EventHandler(this.ComboBoxNbSelectedIndexChanged);
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label8.ForeColor = System.Drawing.Color.White;
            this.label8.Location = new System.Drawing.Point(639, 89);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(86, 16);
            this.label8.TabIndex = 16;
            this.label8.Tag = "";
            this.label8.Text = "Tone Squelch";
            // 
            // comboBoxTS
            // 
            this.comboBoxTS.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.comboBoxTS.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxTS.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.comboBoxTS.Font = new System.Drawing.Font("Arial", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.comboBoxTS.ForeColor = System.Drawing.Color.White;
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
            this.comboBoxTS.Location = new System.Drawing.Point(731, 85);
            this.comboBoxTS.Name = "comboBoxTS";
            this.comboBoxTS.Size = new System.Drawing.Size(121, 25);
            this.comboBoxTS.TabIndex = 15;
            this.comboBoxTS.Tag = "Tone Squelch";
            this.comboBoxTS.SelectedIndexChanged += new System.EventHandler(this.ComboBoxTsSelectedIndexChanged);
            // 
            // label6
            // 
            this.label6.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label6.ForeColor = System.Drawing.Color.White;
            this.label6.Location = new System.Drawing.Point(317, 131);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(256, 16);
            this.label6.TabIndex = 14;
            this.label6.Tag = "";
            this.label6.Text = "Squelch";
            this.label6.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // hScrollBarSquelch
            // 
            this.hScrollBarSquelch.Location = new System.Drawing.Point(317, 114);
            this.hScrollBarSquelch.Name = "hScrollBarSquelch";
            this.hScrollBarSquelch.Size = new System.Drawing.Size(256, 17);
            this.hScrollBarSquelch.TabIndex = 13;
            this.hScrollBarSquelch.Value = 46;
            this.hScrollBarSquelch.Scroll += new System.Windows.Forms.ScrollEventHandler(this.HScrollBarSquelchScroll);
            // 
            // label5
            // 
            this.label5.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label5.ForeColor = System.Drawing.Color.White;
            this.label5.Location = new System.Drawing.Point(317, 75);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(256, 16);
            this.label5.TabIndex = 12;
            this.label5.Tag = "";
            this.label5.Text = "AF Gain";
            this.label5.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // hScrollBarAfGain
            // 
            this.hScrollBarAfGain.Location = new System.Drawing.Point(317, 92);
            this.hScrollBarAfGain.Name = "hScrollBarAfGain";
            this.hScrollBarAfGain.Size = new System.Drawing.Size(256, 17);
            this.hScrollBarAfGain.TabIndex = 11;
            this.hScrollBarAfGain.Value = 46;
            this.hScrollBarAfGain.Scroll += new System.Windows.Forms.ScrollEventHandler(this.HScrollBarAfGainScroll);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label4.ForeColor = System.Drawing.Color.White;
            this.label4.Location = new System.Drawing.Point(34, 120);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(37, 16);
            this.label4.TabIndex = 10;
            this.label4.Tag = "";
            this.label4.Text = "Filter";
            // 
            // comboBoxFilter
            // 
            this.comboBoxFilter.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.comboBoxFilter.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBoxFilter.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.comboBoxFilter.Font = new System.Drawing.Font("Arial", 11.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.comboBoxFilter.ForeColor = System.Drawing.Color.White;
            this.comboBoxFilter.FormattingEnabled = true;
            this.comboBoxFilter.Items.AddRange(new object[] {
            "3k",
            "6k",
            "15k",
            "50k",
            "230k"});
            this.comboBoxFilter.Location = new System.Drawing.Point(83, 116);
            this.comboBoxFilter.Name = "comboBoxFilter";
            this.comboBoxFilter.Size = new System.Drawing.Size(121, 25);
            this.comboBoxFilter.TabIndex = 9;
            this.comboBoxFilter.Tag = "Filter";
            this.comboBoxFilter.SelectedIndexChanged += new System.EventHandler(this.ComboBoxFilterSelectedIndexChanged);
            // 
            // textBoxFrequency
            // 
            this.textBoxFrequency.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.textBoxFrequency.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.textBoxFrequency.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.textBoxFrequency.Cue = "000.000.000.000";
            this.textBoxFrequency.Font = new System.Drawing.Font("Arial", 36F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.textBoxFrequency.ForeColor = System.Drawing.Color.White;
            this.textBoxFrequency.Location = new System.Drawing.Point(165, 18);
            this.textBoxFrequency.Name = "textBoxFrequency";
            this.textBoxFrequency.Size = new System.Drawing.Size(560, 56);
            this.textBoxFrequency.TabIndex = 8;
            this.textBoxFrequency.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.textBoxFrequency.KeyDown += new System.Windows.Forms.KeyEventHandler(this.TextBoxFrequencyKeyDown);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.label12);
            this.groupBox1.Controls.Add(this.textBox3);
            this.groupBox1.Controls.Add(this.textBox2);
            this.groupBox1.Controls.Add(this.label11);
            this.groupBox1.Controls.Add(this.label10);
            this.groupBox1.Controls.Add(this.textBox1);
            this.groupBox1.Controls.Add(this.button1);
            this.groupBox1.Controls.Add(this.checkBoxAutoTune);
            this.groupBox1.Controls.Add(this.buttonLoadPassList);
            this.groupBox1.ForeColor = System.Drawing.Color.Gray;
            this.groupBox1.Location = new System.Drawing.Point(27, 193);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(891, 66);
            this.groupBox1.TabIndex = 10;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "Automatic";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label12.ForeColor = System.Drawing.Color.White;
            this.label12.Location = new System.Drawing.Point(338, 15);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(73, 16);
            this.label12.TabIndex = 23;
            this.label12.Tag = "";
            this.label12.Text = "Delay Time";
            // 
            // textBox3
            // 
            this.textBox3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.textBox3.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.textBox3.Location = new System.Drawing.Point(417, 12);
            this.textBox3.Name = "textBox3";
            this.textBox3.Size = new System.Drawing.Size(139, 20);
            this.textBox3.TabIndex = 22;
            // 
            // textBox2
            // 
            this.textBox2.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.textBox2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.textBox2.Location = new System.Drawing.Point(154, 37);
            this.textBox2.Name = "textBox2";
            this.textBox2.Size = new System.Drawing.Size(139, 20);
            this.textBox2.TabIndex = 21;
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label11.ForeColor = System.Drawing.Color.White;
            this.label11.Location = new System.Drawing.Point(34, 40);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(96, 16);
            this.label11.TabIndex = 20;
            this.label11.Tag = "";
            this.label11.Text = "End Frequency";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label10.ForeColor = System.Drawing.Color.White;
            this.label10.Location = new System.Drawing.Point(34, 15);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(101, 16);
            this.label10.TabIndex = 19;
            this.label10.Tag = "";
            this.label10.Text = "Start Frequency";
            // 
            // textBox1
            // 
            this.textBox1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.textBox1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.textBox1.Location = new System.Drawing.Point(154, 12);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(139, 20);
            this.textBox1.TabIndex = 4;
            // 
            // button1
            // 
            this.button1.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.button1.Font = new System.Drawing.Font("Arial", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.button1.ForeColor = System.Drawing.Color.White;
            this.button1.Location = new System.Drawing.Point(341, 35);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(215, 23);
            this.button1.TabIndex = 3;
            this.button1.Text = "Scan Frequencies";
            this.button1.UseVisualStyleBackColor = true;
            // 
            // checkBoxAutoTune
            // 
            this.checkBoxAutoTune.AutoSize = true;
            this.checkBoxAutoTune.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.checkBoxAutoTune.Font = new System.Drawing.Font("Arial", 9.25F);
            this.checkBoxAutoTune.ForeColor = System.Drawing.Color.White;
            this.checkBoxAutoTune.Location = new System.Drawing.Point(723, 12);
            this.checkBoxAutoTune.Name = "checkBoxAutoTune";
            this.checkBoxAutoTune.Size = new System.Drawing.Size(133, 20);
            this.checkBoxAutoTune.TabIndex = 2;
            this.checkBoxAutoTune.Text = "PassList AutoTune";
            this.checkBoxAutoTune.UseVisualStyleBackColor = true;
            this.checkBoxAutoTune.CheckedChanged += new System.EventHandler(this.CheckBoxAutoTuneCheckedChanged);
            // 
            // buttonLoadPassList
            // 
            this.buttonLoadPassList.FlatStyle = System.Windows.Forms.FlatStyle.Flat;
            this.buttonLoadPassList.Font = new System.Drawing.Font("Arial", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.buttonLoadPassList.ForeColor = System.Drawing.Color.White;
            this.buttonLoadPassList.Location = new System.Drawing.Point(705, 35);
            this.buttonLoadPassList.Name = "buttonLoadPassList";
            this.buttonLoadPassList.Size = new System.Drawing.Size(147, 23);
            this.buttonLoadPassList.TabIndex = 0;
            this.buttonLoadPassList.Text = "Load WxTrack PassList";
            this.buttonLoadPassList.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.buttonLoadPassList.UseVisualStyleBackColor = true;
            this.buttonLoadPassList.Click += new System.EventHandler(this.ButtonLoadPassListClick);
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.frequencyTextBoxRev1);
            this.groupBox2.Controls.Add(this.label9);
            this.groupBox2.Controls.Add(this.freqMeter);
            this.groupBox2.ForeColor = System.Drawing.Color.Gray;
            this.groupBox2.Location = new System.Drawing.Point(27, 265);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(891, 220);
            this.groupBox2.TabIndex = 11;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "Data";
            // 
            // label9
            // 
            this.label9.Font = new System.Drawing.Font("Arial", 9.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.label9.ForeColor = System.Drawing.Color.White;
            this.label9.Location = new System.Drawing.Point(34, 183);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(303, 16);
            this.label9.TabIndex = 19;
            this.label9.Tag = "";
            this.label9.Text = "Signal";
            this.label9.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // freqMeter
            // 
            this.freqMeter.BaseArcColor = System.Drawing.Color.Black;
            this.freqMeter.BaseArcRadius = 100;
            this.freqMeter.BaseArcStart = 180;
            this.freqMeter.BaseArcSweep = 180;
            this.freqMeter.BaseArcWidth = 2;
            this.freqMeter.Cap_Idx = ((byte)(1));
            this.freqMeter.CapColors = new System.Drawing.Color[] {
        System.Drawing.Color.Black,
        System.Drawing.Color.Black,
        System.Drawing.Color.Black,
        System.Drawing.Color.Black,
        System.Drawing.Color.Black};
            this.freqMeter.CapPosition = new System.Drawing.Point(10, 10);
            this.freqMeter.CapsPosition = new System.Drawing.Point[] {
        new System.Drawing.Point(10, 10),
        new System.Drawing.Point(10, 10),
        new System.Drawing.Point(10, 10),
        new System.Drawing.Point(10, 10),
        new System.Drawing.Point(10, 10)};
            this.freqMeter.CapsText = new string[] {
        "",
        "",
        "",
        "",
        ""};
            this.freqMeter.CapText = "";
            this.freqMeter.Center = new System.Drawing.Point(150, 130);
            this.freqMeter.Location = new System.Drawing.Point(37, 26);
            this.freqMeter.MaxValue = 15F;
            this.freqMeter.MinValue = 0F;
            this.freqMeter.Name = "freqMeter";
            this.freqMeter.NeedleColor1 = Cerberus.FreqMeter.NeedleColorEnum.Gray;
            this.freqMeter.NeedleColor2 = System.Drawing.Color.Silver;
            this.freqMeter.NeedleRadius = 100;
            this.freqMeter.NeedleType = 0;
            this.freqMeter.NeedleWidth = 2;
            this.freqMeter.Range_Idx = ((byte)(1));
            this.freqMeter.RangeColor = System.Drawing.Color.Red;
            this.freqMeter.RangeEnabled = true;
            this.freqMeter.RangeEndValue = 15F;
            this.freqMeter.RangeInnerRadius = 85;
            this.freqMeter.RangeOuterRadius = 100;
            this.freqMeter.RangesColor = new System.Drawing.Color[] {
        System.Drawing.Color.LightGreen,
        System.Drawing.Color.Red,
        System.Drawing.SystemColors.Control,
        System.Drawing.SystemColors.Control,
        System.Drawing.SystemColors.Control};
            this.freqMeter.RangesEnabled = new bool[] {
        true,
        true,
        false,
        false,
        false};
            this.freqMeter.RangesEndValue = new float[] {
        9F,
        15F,
        0F,
        0F,
        0F};
            this.freqMeter.RangesInnerRadius = new int[] {
        85,
        85,
        70,
        70,
        70};
            this.freqMeter.RangesOuterRadius = new int[] {
        100,
        100,
        80,
        80,
        80};
            this.freqMeter.RangesStartValue = new float[] {
        0F,
        9F,
        0F,
        0F,
        0F};
            this.freqMeter.RangeStartValue = 9F;
            this.freqMeter.ScaleLinesInterColor = System.Drawing.Color.Black;
            this.freqMeter.ScaleLinesInterInnerRadius = 83;
            this.freqMeter.ScaleLinesInterOuterRadius = 100;
            this.freqMeter.ScaleLinesInterWidth = 1;
            this.freqMeter.ScaleLinesMajorColor = System.Drawing.Color.Black;
            this.freqMeter.ScaleLinesMajorInnerRadius = 80;
            this.freqMeter.ScaleLinesMajorOuterRadius = 100;
            this.freqMeter.ScaleLinesMajorStepValue = 1F;
            this.freqMeter.ScaleLinesMajorWidth = 2;
            this.freqMeter.ScaleLinesMinorColor = System.Drawing.Color.Gray;
            this.freqMeter.ScaleLinesMinorInnerRadius = 90;
            this.freqMeter.ScaleLinesMinorNumOf = 9;
            this.freqMeter.ScaleLinesMinorOuterRadius = 100;
            this.freqMeter.ScaleLinesMinorWidth = 1;
            this.freqMeter.ScaleNumbersColor = System.Drawing.Color.White;
            this.freqMeter.ScaleNumbersFormat = null;
            this.freqMeter.ScaleNumbersRadius = 115;
            this.freqMeter.ScaleNumbersRotation = 0;
            this.freqMeter.ScaleNumbersStartScaleLine = 0;
            this.freqMeter.ScaleNumbersStepScaleLines = 1;
            this.freqMeter.Size = new System.Drawing.Size(300, 154);
            this.freqMeter.TabIndex = 2;
            this.freqMeter.Text = "freqMeter";
            this.freqMeter.Value = 0F;
            // 
            // frequencyTextBoxRev1
            // 
            this.frequencyTextBoxRev1.Location = new System.Drawing.Point(341, 73);
            this.frequencyTextBoxRev1.Name = "frequencyTextBoxRev1";
            this.frequencyTextBoxRev1.Size = new System.Drawing.Size(473, 57);
            this.frequencyTextBoxRev1.TabIndex = 20;
            // 
            // MainWindow
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            this.ClientSize = new System.Drawing.Size(948, 517);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.groupBoxFreq);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.buttonMinimise);
            this.Controls.Add(this.buttonExit);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.None;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "MainWindow";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Cerberus";
            this.FormClosing += new System.Windows.Forms.FormClosingEventHandler(this.MainWindowFormClosing);
            this.Paint += new System.Windows.Forms.PaintEventHandler(this.MainWindowPaint);
            this.groupBoxFreq.ResumeLayout(false);
            this.groupBoxFreq.PerformLayout();
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button buttonExit;
        private System.Windows.Forms.Button buttonMinimise;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.ComboBox comboBoxMode;
        private System.Windows.Forms.Label label3;
        private FrequencyTextBox textBoxFrequency;
        private System.Windows.Forms.GroupBox groupBoxFreq;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.ComboBox comboBoxFilter;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.HScrollBar hScrollBarSquelch;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.HScrollBar hScrollBarAfGain;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.ComboBox comboBoxNb;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.ComboBox comboBoxTS;
        private PowerButton powerButton;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private FreqMeter freqMeter;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Button buttonLoadPassList;
        private System.Windows.Forms.CheckBox checkBoxAutoTune;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.TextBox textBox3;
        private System.Windows.Forms.TextBox textBox2;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.TextBox textBox1;
        private Controls.FrequencyTextBoxArea frequencyTextBoxRev1;
    }
}

