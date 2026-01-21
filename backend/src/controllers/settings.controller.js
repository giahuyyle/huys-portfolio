import * as settingsService from "../services/settings.service.js";

export async function getSettings(req, res) {
  try {
    const settings = await settingsService.getSettings();
    res.json({ settings });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
}