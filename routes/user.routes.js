const express = require('express');
const passport = require('passport');
const User = require('../models/User')
const router = express.Router();

router.get('/',async (req,res,next)=>{
    try{
       
        const user = await User.find()
        return res.status(200).json(user)
    

    }
    catch(error){
        return next(error)
    }
   
})

router.post('/register', (req, res, next) => {
 try{
     const done =(error,saveUser)=>{
         if(error){
             return next(error)
         }
         req.logIn(existUser, (error)=>{
            if(error) return next(error)
            return res.status(201).json(saveUser)
        })
        
        
     }
   
     passport.authenticate('register',done)(req)

 }catch(error){
     return next(error)
 }
})



router.post('/login', (req, res, next) =>{
    try{
      const done = (error, existUser)=>{
        if(error){
            return next(error)
        }

        //return res.status(200).json(existUser)     
        req.logIn(existUser, (error)=>{
            if(error) return next(error)
            return res.status(200).json(existUser)
        })
        return res.status(201).json(saveUser)
     }
     passport.authenticate('login',done)(req)

    }catch(error){
        return next(error)
    }
    
})

router.post('/logout',(req, res, next) =>{
    try{
        if(req.user){
            //desbloqueo al usuario
            req.logout()
            
            req.session.destroy(()=>{
                res.clearCookie('connect.sid')
                return res.status(200).json('usuario deslogueado')

            })
        }
    }catch(error){

        return next(error)
    }
})

module.exports = router
