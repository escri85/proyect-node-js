const express = require('express')
const router = express.Router()
const Rick = require('../models/Rick')

router.get('/', async (req,res,next)=>{
    try{
        const rick = await Rick.find()
        return res.status(200).json(rick)
    }
    catch(err){
        return next(err)

    }
})

router.post('/create',async(req, res, next)=>{
    try{
        const newCharacter = new Rick({
            name:req.body.name,
            status:req.body.status,
            species:req.body.species,
            image:req.body.image,
        })
        const createdCharacter =await newCharacter.save()
        return res.status(201).json(createdCharacter)
    }catch(err){
        
        next(err)
    }
})

router.delete('/:id', async(req,res,next)=>{
    try{
        const{id}=req.params
        await Rick.findByIdAndDelete(id)
        return res.status(200).json('deleted character')
    }catch(err){
        return next(err)
    }
})

router.put('/edit/:id', async (req,res,next)=>{
    try{
        const{id} = req.params //destructuring para recuperar el id de la url
        const characterModify = new Rick(req.body)//instanciamos un nuevo usuario con la info del body
        characterModify._id = id //añadimos la propiedad _id al personaje creado
        const chracterUpdated = await Rick.findByIdAndUpdate(id , characterModify)
        return res.status(200).json(chracterUpdated)//este personaje que devolvemos es el anterior a su modificacion

    }catch(err){
        return next(err)
    }
})

module.exports = router