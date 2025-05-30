import express from "express";
import {
  createStation,
  getAllStations,
  updateStation,
  deleteStation,
} from "../controllers/chargingStationController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createStation)
  .get(getAllStations);

router.route("/:id")
  .put(protect, updateStation)
  .delete(protect, deleteStation);

export default router;
