const path = require('path');
const fs = require('fs');


function createNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify(notesArray, null, 2),
    ); return note
};

function deleteNote(id, notesArray) {
    const thisNote = notesArray.findIndex( note => {
        return note.id === id;
    });
    notesArray.splice(thisNote, 1);
    fs.writeFileSync(path.join(__dirname, '../db/db.json'),
    JSON.stringify(notesArray, null, 2));
    return thisNote;
}

function showNotes(query, notesArray) {
    let filteredNotes = notesArray
    if (query.title) {
        filteredNotes = filteredNotes.filter(
            (note) => note.title === query.title
        )
    } return filteredNotes
};

function findByID(id, notesArray) {
    const result = notesArray.filter((notes) => 
    notes.id === id)
    return result
};

module.exports = {createNote, deleteNote, showNotes, findByID};