using System;
using System.Globalization;
using System.Windows.Forms;
using Cerberus.SatPasses;

namespace Cerberus
{
    public partial class SatalitePassList : Form
    {
        private WxTrackImporter _satalitePasses;

        public SatalitePassList(ref WxTrackImporter satalitePasses)
        {
            InitializeComponent();
            _satalitePasses = satalitePasses;
            LoadSatalites();
        }

        private void ButtonLoadNewClick(object sender, EventArgs e)
        {
            var openFile = new OpenFileDialog { Filter = "*.txt|*.txt", Title = "WxTrack PassList" };
            if (openFile.ShowDialog() != DialogResult.OK) return;
            try
            {
                _satalitePasses = new WxTrackImporter(openFile.FileName);
            }
            catch (Exception)
            {
                EMessageBox.ShowDialog("Error importing PassList.", "Error");
            }
            LoadSatalites();
        }

        private void LoadSatalites()
        {
            listViewSatalites.Items.Clear();
            for (var index = 0; index < _satalitePasses.SatalitePasses.Count; index++)
            {
                var satalite = _satalitePasses.SatalitePasses[index];
                if (DateTime.Now > satalite.Pass) continue;
                var item = new ListViewItem {Checked = satalite.Enabled};
                item.SubItems.Add(satalite.Satalite);
                item.SubItems.Add(satalite.Pass.ToString("dd/MM/yyyy HH:mm:ss"));
                item.SubItems.Add(satalite.Duration.ToString(CultureInfo.InvariantCulture));
                item.SubItems.Add(satalite.Direction.ToString(CultureInfo.InvariantCulture));
                item.SubItems.Add(satalite.Longitude.ToString(CultureInfo.InvariantCulture));
                item.Name = satalite.Satalite;
                item.Tag = index;
                listViewSatalites.Items.Add(item);
            }
            labelNextPass.Text = listViewSatalites.Items.Count > 0 ? listViewSatalites.Items[0].Name : "[None]";
        }

        private void ListViewSatalitesItemChecked(object sender, ItemCheckedEventArgs e)
        {
            if (_satalitePasses == null) return;
            var temp = _satalitePasses.SatalitePasses[(int)e.Item.Tag];
            temp.Enabled = e.Item.Checked;
            _satalitePasses.SatalitePasses[(int) e.Item.Tag] = temp;
        }

        private void ButtonSatSettingsClick(object sender, EventArgs e)
        {
            var sataliteSettings = new SataliteSettings(ref _satalitePasses);
            sataliteSettings.ShowDialog();
        }
    }
}
