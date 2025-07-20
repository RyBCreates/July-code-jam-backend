// get all (user's) trips
const getTrips = (req, res) => {
  try {
    res.send("Trips controller works");
  } catch (error) {
    console.error("There was an error getting your trips:", error);
    res.status(500).send("There was an error getting your trips");
  }
};

// Create a trip

//get one trip

// Delete a trip

// Update a trip (MAYBE)

module.exports = { getTrips };
