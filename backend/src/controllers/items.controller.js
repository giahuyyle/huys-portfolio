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

// Get item by key
export async function getItemByKey(req, res) {
    const { key } = req.params;
    try {
        const item = await itemsService.getItemByKey(key);
        if (item) {
            res.json({ item });
        } else {
            res.status(404).json({ error: 'Item not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch item' });
    }
}