const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

function resolvePythonPath() {
  const projectRoot = path.resolve(__dirname, "..");
  const winVenv = path.join(projectRoot, "venv", "Scripts", "python.exe");
  const unixVenv = path.join(projectRoot, "venv", "bin", "python");

  if (process.platform === "win32" && fs.existsSync(winVenv)) return winVenv;
  if (fs.existsSync(unixVenv)) return unixVenv;

  return process.platform === "win32" ? "python" : "python3";
}

const pythonPath = resolvePythonPath();
const scriptPath = path.join(__dirname, "..", "scripts", "newOptimalRoute.py");

const optimizeRoute = (req, res) => {
  const locations = req.body.locations;

  if (!Array.isArray(locations) || locations.length < 2) {
    return res.status(400).json({ message: "Please provide at least 2 locations." });
  }

  const python = spawn(pythonPath, [scriptPath]);

  let output = "";

  python.stdout.on("data", (data) => {
    output += data.toString();
  });

  python.stderr.on("data", (data) => {
    console.error("[PY STDERR]", data.toString());
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

  python.on("error", (err) => {
    console.error("Failed to start Python process:", err);
    res.status(500).json({ message: "Python process failed", error: err.message });
  });

  python.stdin.write(JSON.stringify({ locations }));
  python.stdin.end();
};

module.exports = { optimizeRoute };
