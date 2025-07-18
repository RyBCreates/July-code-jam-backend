const getTrips = (req, res) => {
  try {
    res.send("Trips controller works");
  } catch (error) {
    console.error("There was an error getting your trips:", error);
    res.status(500).send("There was an error getting your trips");
  }
};
module.exports = { getTrips };
