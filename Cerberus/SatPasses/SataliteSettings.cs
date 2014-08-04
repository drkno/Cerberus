using System.Globalization;
using System.Windows.Forms;
using PCR1000;

namespace Cerberus.SatPasses
{
    public partial class SataliteSettings : Form
    {
        private readonly WxTrackImporter _satalitePasses;
        public SataliteSettings(ref WxTrackImporter satalitePasses)
        {
            InitializeComponent();
            _satalitePasses = satalitePasses;
            foreach (var sat in _satalitePasses.SataliteSetting)
            {
                listBoxSatalites.Items.Add(sat);
            }
        }

        private void ButtonAddClick(object sender, System.EventArgs e)
        {
            if (!VerifyInput())
            {
                EMessageBox.ShowDialog("Invalid Settings", "Error");
                return;
            }
            _satalitePasses.SataliteSetting.Add(MakeSetting());
            listBoxSatalites.Items.Add(_satalitePasses.SataliteSetting[_satalitePasses.SataliteSetting.Count - 1]);
        }

        private void ButtonRemoveClick(object sender, System.EventArgs e)
        {
            _satalitePasses.SataliteSetting.RemoveAt(listBoxSatalites.SelectedIndex);
            listBoxSatalites.Items.RemoveAt(listBoxSatalites.SelectedIndex);
        }

        private void ListBoxSatalitesSelectedIndexChanged(object sender, System.EventArgs e)
        {
            if (listBoxSatalites.SelectedIndex >= 0 && listBoxSatalites.SelectedIndex < listBoxSatalites.Items.Count)
            {
                buttonRemove.Enabled = buttonSave.Enabled = true;
                var selectedItem = (WxTrackImporter.SataliteSettings)listBoxSatalites.Items[listBoxSatalites.SelectedIndex];
                textBoxName.Text = selectedItem.SatName;
                textBoxFreq.Text = selectedItem.SatSet.PcrFreq.ToString(CultureInfo.InvariantCulture);
                textBoxSquelch.Text = selectedItem.SatSet.PcrSquelch.ToString(CultureInfo.InvariantCulture);
                textBoxVolume.Text = selectedItem.SatSet.PcrVolume.ToString(CultureInfo.InvariantCulture);
                comboBoxFilter.SelectedIndex = comboBoxFilter.Items.IndexOf(selectedItem.SatSet.PcrFilter + "k");
                comboBoxMode.SelectedIndex = comboBoxMode.Items.IndexOf(selectedItem.SatSet.PcrMode.ToUpper());
                var index = comboBoxTS.Items.IndexOf(selectedItem.SatSet.PcrToneSqFloat.ToString("0.0") + " Hz");
                comboBoxTS.SelectedIndex = index < 0 ? 0 : index;
                checkBoxAutoGain.Checked = selectedItem.SatSet.PcrAutoGain;
                checkBoxNb.Checked = selectedItem.SatSet.PcrNoiseBlank;
                checkBoxRfAtten.Checked = selectedItem.SatSet.PcrRfAttenuator;
            }
            else
            {
                buttonRemove.Enabled = buttonSave.Enabled = false;
            }
        }

        private void ButtonSaveClick(object sender, System.EventArgs e)
        {
            if (!VerifyInput())
            {
                EMessageBox.ShowDialog("Invalid Settings", "Error");
                return;
            }
            _satalitePasses.SataliteSetting[listBoxSatalites.SelectedIndex] = MakeSetting();
            listBoxSatalites.Items[listBoxSatalites.SelectedIndex] = MakeSetting();
        }

        private bool VerifyInput()
        {
            ulong tempU;
            if (!ulong.TryParse(textBoxFreq.Text, out tempU)) return false;
            if (string.IsNullOrWhiteSpace(textBoxName.Text)) return false;
            int tempI;
            if (!int.TryParse(textBoxSquelch.Text, out tempI) || tempI < 0 || tempI > 100) return false;
// ReSharper disable RedundantAssignment
            tempI = 0;
// ReSharper restore RedundantAssignment
            if (!int.TryParse(textBoxVolume.Text, out tempI) || tempI < 0 || tempI > 100) return false;
            if (comboBoxMode.SelectedIndex < 0 || comboBoxMode.SelectedIndex > comboBoxMode.Items.Count - 1) return false;
            if (comboBoxTS.SelectedIndex < 0 || comboBoxTS.SelectedIndex > comboBoxTS.Items.Count - 1) return false;
            if (comboBoxFilter.SelectedIndex < 0 || comboBoxFilter.SelectedIndex > comboBoxFilter.Items.Count - 1) return false;
            return true;
        }

        private WxTrackImporter.SataliteSettings MakeSetting()
        {
            var satSettings = new WxTrackImporter.SataliteSettings
                              {
                                  SatName = textBoxName.Text,
                                  SatSet = new PcrControl.PRadInf
                                           {
                                               PcrAutoGain = checkBoxAutoGain.Checked,
                                               PcrAutoUpdate = false,
                                               PcrFilter =
                                                   comboBoxFilter.SelectedItem.ToString().Replace("k",""),
                                               PcrFreq = ulong.Parse(textBoxFreq.Text),
                                               PcrInitSpeed = "9600",
                                               PcrMode = comboBoxMode.SelectedItem.ToString().ToLower(),
                                               PcrNoiseBlank = checkBoxNb.Checked,
                                               PcrPort = "COM1",
                                               PcrRfAttenuator = checkBoxRfAtten.Checked,
                                               PcrSpeed = 9600,
                                               PcrSquelch = int.Parse(textBoxSquelch.Text),
                                               PcrToneSqFloat = float.Parse(comboBoxTS.SelectedItem.ToString().Replace(" Hz", "").Replace("Off", "0.0")),
                                               PcrVolume = int.Parse(textBoxVolume.Text)
                                           }
                              };

            return satSettings;
        }
    }
}
