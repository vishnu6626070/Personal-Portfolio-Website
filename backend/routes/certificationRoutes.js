const express = require("express");
const router = express.Router();
const { getCertifications, addCertification, updateCertification, deleteCertification } = require("../controllers/certificationController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getCertifications);
router.post("/", authMiddleware, addCertification);
router.put("/:id", authMiddleware, updateCertification);
router.delete("/:id", authMiddleware, deleteCertification);

module.exports = router;
