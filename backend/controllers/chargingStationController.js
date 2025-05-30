import ChargingStation from "../models/ChargingStation.js";

export const createStation = async (req, res) => {
  try {
    const station = new ChargingStation({ ...req.body, owner: req.user._id });
    await station.save();
    res.status(201).json(station);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllStations = async (req, res) => {
  try {
    const stations = await ChargingStation.find();
    res.json(stations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStation = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    if (station.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const updatedStation = await ChargingStation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedStation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteStation = async (req, res) => {
  try {
    const station = await ChargingStation.findById(req.params.id);
    if (!station) return res.status(404).json({ message: "Station not found" });

    if (station.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await station.deleteOne();
    res.json({ message: "Station deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
