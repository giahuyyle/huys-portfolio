import * as locationsService from "../services/locations.service.js";

export async function getLocations(req, res) {
  try {
    const locations = await locationsService.getLocations();
    res.json({ locations });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
}