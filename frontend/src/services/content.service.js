// Feature-specific services mapping to backend endpoints
import { apiGet } from "../lib/api.js";

export const getLocations = () => apiGet("/locations");
export const fetchItems = () => apiGet("/items");
export const fetchItemByKey = (key) => apiGet(`/items/${key}`);