const { spawn } = require("child_process");
const path = require("path");
require("dotenv").config();

const pythonPath = process.env.PYTHON_PATH || "python3";

const optimizeRoute = (req, res) => {
  const locations = req.body.locations;

  if (!Array.isArray(locations) || locations.length < 2) {
    return res
      .status(400)
      .json({ message: "Please provide at least 2 locations." });
  }

  const python = spawn(pythonPath, [
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

  python.stdin.write(JSON.stringify({ locations }));
  python.stdin.end();
};

module.exports = { optimizeRoute };

// Any of the functions that talk to the python file are made with chatgpt, I did not learn how to do this at tripleten.
