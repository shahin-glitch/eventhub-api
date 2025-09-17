const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const eventsFile = path.join(__dirname, '../data/events.json');

// Helper to read events
function readEvents() {
    const data = fs.readFileSync(eventsFile, 'utf-8');
    return JSON.parse(data);
}

// Helper to write events
function writeEvents(events) {
    fs.writeFileSync(eventsFile, JSON.stringify(events, null, 2));
}

// POST /api/events - Create Event
router.post('/events', (req, res) => {
    const { title, description, date, location, maxAttendees } = req.body;

    if (!title || !date || !location || !maxAttendees || isNaN(maxAttendees) || maxAttendees <= 0) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const newEvent = {
        eventId: 'EVT-' + Date.now(),
        title,
        description: description || '',
        date,
        location,
        maxAttendees: parseInt(maxAttendees),
        currentAttendees: 0,
        status: 'upcoming'
    };

    let events = [];
    try {
        events = readEvents();
    } catch (err) {
        return res.status(500).json({ error: 'Error reading events' });
    }

    events.push(newEvent);

    try {
        writeEvents(events);
    } catch (err) {
        return res.status(500).json({ error: 'Error writing events' });
    }

    res.status(201).json(newEvent);
});

// GET /api/events - List Events
router.get('/events', (req, res) => {
    try {
        const events = readEvents();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Error reading events' });
    }
});

module.exports = router;
