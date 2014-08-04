namespace Cerberus
{
    partial class SatalitePassList
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
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(SatalitePassList));
            this.listViewSatalites = new System.Windows.Forms.ListView();
            this.Enabled = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Satalite = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Time = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Length = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Direction = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.Longitude = ((System.Windows.Forms.ColumnHeader)(new System.Windows.Forms.ColumnHeader()));
            this.buttonLoadNew = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.labelNextPass = new System.Windows.Forms.Label();
            this.buttonSatSettings = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // listViewSatalites
            // 
            this.listViewSatalites.AllowColumnReorder = true;
            this.listViewSatalites.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.listViewSatalites.BackColor = System.Drawing.Color.White;
            this.listViewSatalites.BorderStyle = System.Windows.Forms.BorderStyle.None;
            this.listViewSatalites.CheckBoxes = true;
            this.listViewSatalites.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.Enabled,
            this.Satalite,
            this.Time,
            this.Length,
            this.Direction,
            this.Longitude});
            this.listViewSatalites.FullRowSelect = true;
            this.listViewSatalites.GridLines = true;
            this.listViewSatalites.HeaderStyle = System.Windows.Forms.ColumnHeaderStyle.Nonclickable;
            this.listViewSatalites.Location = new System.Drawing.Point(0, 36);
            this.listViewSatalites.Name = "listViewSatalites";
            this.listViewSatalites.Size = new System.Drawing.Size(710, 325);
            this.listViewSatalites.TabIndex = 0;
            this.listViewSatalites.UseCompatibleStateImageBehavior = false;
            this.listViewSatalites.View = System.Windows.Forms.View.Details;
            this.listViewSatalites.ItemChecked += new System.Windows.Forms.ItemCheckedEventHandler(this.ListViewSatalitesItemChecked);
            // 
            // Enabled
            // 
            this.Enabled.Text = "Enabled";
            this.Enabled.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            // 
            // Satalite
            // 
            this.Satalite.Text = "Satalite";
            this.Satalite.Width = 125;
            // 
            // Time
            // 
            this.Time.Text = "Date/Time";
            this.Time.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Time.Width = 125;
            // 
            // Length
            // 
            this.Length.Text = "Length (s)";
            this.Length.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Length.Width = 125;
            // 
            // Direction
            // 
            this.Direction.Text = "Direction";
            this.Direction.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Direction.Width = 125;
            // 
            // Longitude
            // 
            this.Longitude.Text = "Longitude";
            this.Longitude.TextAlign = System.Windows.Forms.HorizontalAlignment.Center;
            this.Longitude.Width = 125;
            // 
            // buttonLoadNew
            // 
            this.buttonLoadNew.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonLoadNew.Location = new System.Drawing.Point(518, 6);
            this.buttonLoadNew.Name = "buttonLoadNew";
            this.buttonLoadNew.Size = new System.Drawing.Size(186, 23);
            this.buttonLoadNew.TabIndex = 1;
            this.buttonLoadNew.Text = "Load New WxTrack PassList";
            this.buttonLoadNew.UseVisualStyleBackColor = true;
            this.buttonLoadNew.Click += new System.EventHandler(this.ButtonLoadNewClick);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 10);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(66, 15);
            this.label1.TabIndex = 2;
            this.label1.Text = "Next Pass:";
            // 
            // labelNextPass
            // 
            this.labelNextPass.AutoSize = true;
            this.labelNextPass.Location = new System.Drawing.Point(84, 10);
            this.labelNextPass.Name = "labelNextPass";
            this.labelNextPass.Size = new System.Drawing.Size(43, 15);
            this.labelNextPass.TabIndex = 3;
            this.labelNextPass.Text = "[None]";
            // 
            // buttonSatSettings
            // 
            this.buttonSatSettings.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonSatSettings.Location = new System.Drawing.Point(347, 6);
            this.buttonSatSettings.Name = "buttonSatSettings";
            this.buttonSatSettings.Size = new System.Drawing.Size(165, 23);
            this.buttonSatSettings.TabIndex = 4;
            this.buttonSatSettings.Text = "Modify Satalite Settings";
            this.buttonSatSettings.UseVisualStyleBackColor = true;
            this.buttonSatSettings.Click += new System.EventHandler(this.ButtonSatSettingsClick);
            // 
            // SatalitePassList
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.Menu;
            this.ClientSize = new System.Drawing.Size(711, 361);
            this.Controls.Add(this.buttonSatSettings);
            this.Controls.Add(this.labelNextPass);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.buttonLoadNew);
            this.Controls.Add(this.listViewSatalites);
            this.Font = new System.Drawing.Font("Arial", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.SizableToolWindow;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Name = "SatalitePassList";
            this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
            this.Text = "Satalite Pass List";
            this.TopMost = true;
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ListView listViewSatalites;
        private System.Windows.Forms.ColumnHeader Satalite;
        private System.Windows.Forms.ColumnHeader Time;
        private System.Windows.Forms.ColumnHeader Length;
        private System.Windows.Forms.ColumnHeader Direction;
        private System.Windows.Forms.ColumnHeader Longitude;
        private System.Windows.Forms.ColumnHeader Enabled;
        private System.Windows.Forms.Button buttonLoadNew;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label labelNextPass;
        private System.Windows.Forms.Button buttonSatSettings;
    }
}