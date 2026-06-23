const Education = require("../models/Education");

// Get all education items
exports.getEducation = async (req, res) => {
  try {
    const educationList = await Education.find().sort({ year: -1 }); // newest first
    res.json(educationList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add an education item
exports.addEducation = async (req, res) => {
  try {
    const education = new Education(req.body);
    await education.save();
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an education item
exports.updateEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!education) return res.status(404).json({ message: "Education item not found" });
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an education item
exports.deleteEducation = async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id);
    if (!education) return res.status(404).json({ message: "Education item not found" });
    res.json({ message: "Education item deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
