const Certification = require("../models/Certification");

// Get all certifications
exports.getCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find().sort({ year: -1 });
    res.json(certifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add certification
exports.addCertification = async (req, res) => {
  try {
    const certification = new Certification(req.body);
    await certification.save();
    res.json(certification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update certification
exports.updateCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!certification) return res.status(404).json({ message: "Certification not found" });
    res.json(certification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete certification
exports.deleteCertification = async (req, res) => {
  try {
    const certification = await Certification.findByIdAndDelete(req.params.id);
    if (!certification) return res.status(404).json({ message: "Certification not found" });
    res.json({ message: "Certification deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
