const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/User')


//TODO:refactorizar validEmail,validPasword  llamada de login y register

const validEmail = (email)=>{
    const regular =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regular.test(String(email).toLowerCase())
  }

const loginStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
},async (req,email,password,done)=>{

    /* 
        1 comprobamos que el mail es correcto
        2 comprobamos que el usuario existe 
        3 mandaremos a comparar la contraseña con bcrypt
    */
    try{

        const isValidEmail = validEmail(email)
        if(!isValidEmail){
          const error = new Error('el email no es valido,introduce unn mail valido')
          return done(error)
        }

        const existUser = await User.findOne({email:email})
    
        
        //en caso de que no exista el usuario dara un error
        if(!existUser){
            const error = new Error('contraseña o email incorecto')
            return done(error)
        }

        //en caso de que exista ,comprobamos el password sea correcto
        //2 argumentos 1ª el password que recibimos desde el formulario y 2ª el password haseado
     const passwordValid = await bcrypt.compare(password,existUser.password)
        
        //si el password no es corecto ,enviamos un mensaje al usuario
        if(passwordValid){
            existUser.password = null //recuperamos de la bbdd 
            return done(null,existUser)//y luego ya lo devolbemoss
        }  else{
            const error =new Error('contraseña o email incorecto')
            return done(error)
        }

    }catch(error){
    return done (error)   
}
})


module.exports = loginStrategy
