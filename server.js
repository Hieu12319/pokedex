require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const morgan = require('morgan');
const pokemon = require("./models/pokemon.js");
const methodOverride = require("method-override");

//middleware
app.use(morgan("tiny"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride("_method"));

//routes
app.get("/", (req, res) => {
    res.render('index.ejs', {allPokemon: pokemon})
})
//add
app.get("/new", (req, res) => {
    res.render('new.ejs', {
    Poke: pokemon[req.params.id],
    index: req.params.id
})
})      
// SHOW
app.get('/:id', (req, res) => {
    res.render('show.ejs', { 
        Pokemon: pokemon[req.params.id],
        index: req.params.id
 });
    });

//edit

 app.get("/:id/edit",(req, res) => {
       res.render('edit.ejs', { 
          poke: pokemon[req.params.id],         
           index: req.params.id
     });
          });
        


// display a bunch of Pokémon images on the index
// have separate show pages for each Pokémon, accessible by clicking on a Pokémon's image on the index page
// have the ability to add a new Pokémon

  app.put('/:id',(req, res) => { 
  let pokemon = {...pokemon[req.params.id]};
 pokemon.name = [req.body.name]
  pokemon.stats= {
      hp:req.body.hp,
      attack: req.body.attack,
     speed: req.body.speed
  }
  pokemon.name = req.body.name;
   pokemon[req.params.indexOfPokemonArray] = req.body;
  res.redirect("/");
      });
  //delete
  app.delete('/delete/:indexOfPokemonArrau', (req, res) => {
    pokemon.splice(req.params.indexOfPokemon, 1); //remove the item from the array
    res.redirect("/"); //redirect back to index route
  });

app.listen(PORT, () => {
    console.log(`we are listening to port ${PORT}`);
});