const { spawn } = require("child_process");
const path = require("path");

const optimizeRoute = (req, res) => {
  const locations = req.body.locations;

  if (!Array.isArray(locations) || locations.length < 2) {
    return res
      .status(400)
      .json({ message: "Please provide at least 2 locations." });
  }

  const python = spawn("python3", [
    path.join(__dirname, "../scripts/newOptimalRoute.py"),
  ]);

  let output = "";

  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error("Python error:", data.toString());
  });

  python.on("close", () => {
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (err) {
      res.status(500).json({
        message: "Failed to parse Python output",
        error: err.message,
      });
    }
  });
};

module.exports = { optimizeRoute };
