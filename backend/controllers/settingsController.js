const Settings = require("../models/Settings");

// Get settings (initialize if empty, apply default schema updates for existing docs)
exports.getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      settings = new Settings({});
      await settings.save();
    } else {
      // Bulletproof migration: check if any new bento grid fields are missing and apply defaults
      let updated = false;
      const defaults = {
        cgpa: "9.1",
        projectsCount: 12,
        certsCount: 15,
        problemsSolved: 500,
        strengths: "Machine Learning, Deep Learning, Statistical Analysis, Data Engineering",
        objective: "To leverage data-driven analytics and statistical models to deliver scalable business solutions..."
      };
      
      for (const [key, value] of Object.entries(defaults)) {
        if (settings[key] === undefined || settings[key] === null) {
          settings[key] = value;
          updated = true;
        }
      }
      
      if (updated) {
        await settings.save();
      }
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
