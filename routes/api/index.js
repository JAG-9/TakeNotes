const path = require('path');
const notes = path.basename('./Develop/db/db.json')
const uuid = path.basename('../../helpers/uuid')
const router = require('express').Router();
const fs = require('fs');
const noteFunctions = require('../../lib/index');
const deleteNote = require('../../lib/index');
const showNotes = require('../../lib/index');
const findID = require('../../lib/index');


router.get('/notes', (req,res) => {
    res.json(notes);
});

router.post('/notes', (req,res) => {
    req.body.id = notes.length.toString()
    const note = noteFunctions.createNote(req.body, notes)
    res.json(note);
});

router.delete('/notes/:id', (req,res) => {
    res.json(noteFunctions.deleteNote(req.params.id, notes));
});

module.exports = router; 