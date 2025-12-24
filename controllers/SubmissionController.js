const Submission = require("../models/Submission");

const createSubmission = async (req, res) => {
  try {
    const submission = await Submission.create({
      userId: req.user._id,
      craftId: req.body.craftId,
      images: req.body.images,
      description: req.body.description
    });
    res.status(201).json(submission);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

const getApprovedSubmissions = async (req, res) => {
  const submissions = await Submission.find({ status: "approved" })
    .populate("userId", "name")
    .populate("craftId", "title");
  res.json(submissions);
};

const getPendingSubmissions = async (req, res) => {
  const submissions = await Submission.find({ status: "pending" });
  res.json(submissions);
};

const approveSubmission = async (req, res) => {
  await Submission.findByIdAndUpdate(req.params.id, { status: "approved" });
  res.json({ message: "Approved" });
};

const rejectSubmission = async (req, res) => {
  await Submission.findByIdAndUpdate(req.params.id, { status: "rejected" });
  res.json({ message: "Rejected" });
};

module.exports = {
  createSubmission,
  getApprovedSubmissions,
  getPendingSubmissions,
  approveSubmission,
  rejectSubmission
};
