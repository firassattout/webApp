import { Tracing } from "../models/Tracing.mjs";

export const logEvent = async (action, userId, details) => {
  try {
    await Tracing.create({
      action,
      user: userId,
      details,
    });
  } catch (error) {
    console.error("Error logging event:", error.message);
  }
};

export const getTraces = async (req, res) => {
  const traces = await Tracing.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.json(traces);
};
