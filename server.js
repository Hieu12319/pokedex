require("dotenv").config()

const express = require('express');
const app = express();
const PORT = process.env.PORT
const mongoose = require('mongoose');
const poke = require('./models/pokemon.js');
const morgan = require('morgan');
const methodOverride = require("method-override");

// middleware
app.use(express.urlencoded({extended: true}));
app.use("/static", express.static("public"))
app.use(methodOverride("_method"))


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,  
});

const db = mongoose.connection;
db.on('error', (err) => console.log(err.message + " is mongo not running?"));
db.on('connected', ()=> console.log('mongoose connected'));
db.on('disconnected', () => console.log("mongo disconnected"));



// index routes
app.get("/",(req, res) => {
    res.render('main.ejs')
});
// show route
app.get("/pokemon", (req, res) => {
    res.render('index.ejs', {allPokemon:poke});
})

app.get("/pokemon/:id",(req, res)=> {
    res.render('show.ejs', {
        poke: poke[req.params.id]
    })
})

// new route
//edit route
// create route
 // update route
 //delete route



app.listen(PORT, () => {
    console.log(`we are listening on port ${PORT}`)
});