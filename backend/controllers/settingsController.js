const Settings = require("../models/Settings");

// Get settings (initialize if empty)
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
      await settings.save();
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update settings
exports.updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings(req.body);
      await settings.save();
    } else {
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Increment visitor count
exports.incrementVisits = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({ visitorCount: 1 });
      await settings.save();
    } else {
      settings.visitorCount = (settings.visitorCount || 0) + 1;
      await settings.save();
    }
    res.json({ visitorCount: settings.visitorCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
