const express = require('express')
const Movie = require('../models/Movie')
const router = express.Router()
// nos devuelve un arraay de todos los ususarios si existen
router.get('/', async (req,res,next)=>{
    try{
        const movie = await Movie.find()
        return res.status(200).json(movie)
    }
    catch(err){
        return next(err)

    }
})
//nos devuelve el usuario accediendo a su id
router.get('/:id',async (req,res,next)=>{
    try{
        const id = req.params.id
        const movie = await Movie.findById(id)
    
        if(movie){
            return res.status(200).json(movie)
        }else{
            return res.status(404).json(' dont find the movie')
        }
    }
    catch(err){
        return next(err)
    }
   
})
//nos devuelve ele objeto segun el titulo introducido
router.get('/title/:title', async (req, res,next) => {
	const {title} = req.params;

	try {
		const movieTitle = await Movie.find({title: title });
		return res.status(200).json(movieTitle);
	} catch (err) {
		return next(err)
	}
});
/* router.get('/:title', async (req,res) => {
	const title = req.params.title
	const usuarioTitle = await Usuario.find(title);
	try {
        if(usuarioTitle){
            return res.status(200).json(usuarioTitle)
        }else{
            return res.status(404).json('no se encuentra el titulo')
        }
	} catch (err) {
		return res.status(404).json(err);
	}
}); */
//nos devuelve los objetos segun su genero
router.get('/genre/:genre', async (req, res,next) => {
	const {genre} = req.params;

	try {
		const movieGenre = await Movie.find({genre: genre });
		return res.status(200).json(movieGenre);
	} catch (err) {
		return next(err)
	}
});
//devuelve todas las pelis desde 2010
router.get('/year/:year', async (req, res,next) => {
	const {year} = req.params;

	try {
		const movieYear = await Movie.find({ year: {$gt:year} });
		return res.status(200).json(movieYear);
	} catch (err) {
        //return res.status(500).json(err)
		return next(err)
	}
});
//creando post nueva pelicula a traves de postman
router.post('/create',async(req, res, next)=>{
    try{
        const newMovie = new Movie({
            title:req.body.title,
            director:req.body.director,
            year:req.body.year,
            genre:req.body.genre,
        })
        const createdmovie =await newMovie.save()
        return res.status(201).json(createdmovie)
    }catch(err){
        next(err)
    }
})

//ceando delete en base al id
router.delete('/:id', async(req,res,next)=>{
    try{
        const{id}=req.params
        await Movie.findByIdAndDelete(id)
        return res.status(200).json('deleted movie')
    }catch(err){
        return next(err)
    }
})

//creacion de put 
//primero se crea con un post y luego se hace el put 
router.put('/edit/:id', async (req,res,next)=>{
    try{
        const{id} = req.params //destructuring para recuperar el id de la url
        const movieModify = new Movie(req.body)//instanciamos un nuevo usuario con la info del body
        movieModify._id = id //añadimos la propiedad _id al personaje creado
        const movieUpdated = await Movie.findByIdAndUpdate(id , movieModify)
        return res.status(200).json(movieUpdated)//este personaje que devolvemos es el anterior a su modificacion

    }catch(err){
        return next(err)
    }
})



module.exports = router