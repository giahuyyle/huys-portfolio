import * as itemsService from '../services/items.service.js';

// Get all items
export async function getAllItems(req, res) {
    try {
        const items = await itemsService.getItems();
        res.json({ items });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch items' });
    }
}