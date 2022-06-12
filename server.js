const express = require("express")
const db = require("./db/db.json")
const path = require ("path")
const fs = require ("fs")

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.static('public'));
app.use(express.json())

app.get("/", function(req,res){
    res.sendFile(path.join(__dirname,"./public/index.html"))
})
app.get("/notes", function(req,res){
    res.sendFile(path.join(__dirname,"./public/notes.html"))
})
app.get("/api/notes", function(req,res){
    res.sendFile(path.join(__dirname,"./db/db.json"))
})
app.post ("/api/notes", function(req,res){
    const newNote = req.body;
    db.push(newNote);
    fs.writeFileSync("./db/db.json",JSON.stringify(db));
    res.sendFile(path.join(__dirname,"./db/db.json"))
})

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);