const express = require('express');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static("./develop/public"));


app.get("/api/notes", (req, res) => {
    readFileAsync("./develop/db/db.json", "utf8").then((data) => {
        notes =[].concat(JSON.parse(data));
        res.json(notes);
    })
});





app.post("/api/notes", (req, res) => {
    const note = req.body;
    readFileAsync("./develop/db/db.json", "utf8").then((data) => {
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1;
        notes.push(note);
        return notes;
    }).then(notes => {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes));
        res.json(notes);
    })
});



app.delete("/api/notes/:id", (req, res) => {
    const id = parseInt(req.params.id);
    readFileAsync("./develop/db/db.json", "utf8").then((data) => {
        const notes = [].concat(JSON.parse(data));
        const newNotesData = [];
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id!== id) {
                newNotesData.push(notes[i]);
            }
        }
        return newNotesData;

    }).then(notes => {
        writeFileAsync("./develop/db/db.json", JSON.stringify(notes))
        res.send("saved successfully");
    })
});


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});


app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`);
});
