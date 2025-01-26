const express = require("express");
const router = express.Router();
const Patient = require("../models/Patient");

// Add a new patient
router.post("/", async (req, res) => {
  const { name, age, diagnosis } = req.body;
  try {
    const newPatient = new Patient({ name, age, diagnosis });
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all patients
router.get("/", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a patient by ID
router.get("/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a patient
router.put("/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ error: "Patient not found" });
    res.status(200).json(updatedPatient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a patient
router.delete("/:id", async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ error: "Patient not found" });
    res.status(200).json({ message: "Patient deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
