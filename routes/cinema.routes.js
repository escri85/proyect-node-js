
const express = require('express')
const Cinema = require('../models/Cinema')
const router = express.Router()

//creo un elemento de cinema
router.post('/create',async(req, res, next)=>{
    try{
        const newCinema = new Cinema({
            name:req.body.name,
            location:req.body.location,
            movies:[]
        })
        const createcinema =await newCinema.save()
        return res.status(201).json(createcinema)
    }catch(err){
        return next(err)
    }
})

//edito la propiedad de movie para relacionar con cinema
router.put('/edit',async(req,res,next)=>{
    try {
        const {cinemaId, movieId} = req.body
        console.log("he entrado en el put del cinema")
        const updatedCinema = await Cinema.findByIdAndUpdate(
            cinemaId,
            { $addToSet: { movies: movieId } },
            { new: true }
        );
        return res.status(200).json(updatedCinema);
        console.log("Se ha introducido en el array")
    } catch (error) {
        return next(error);
    }
});
//borro elemento de cinema y lo borro
router.delete('/:id',async(req,res,next)=>{
    try{
        const {id}=req.params
        await Cinema.findByIdAndDelete(id)
        return res.status(200).json('deleted cinema')
    }catch(err)
    {
        return next(err)
    }
})

router.get('/',async(req,res,next)=>{
    try{
        const cinemas = await Cinema.find().populate('movies','title')
        /*.populate({
            'movies','title'
        })*/
        return res.status(200).json(cinemas)
    }catch(err){
        return next(err)
    }
}
)



module.exports = router