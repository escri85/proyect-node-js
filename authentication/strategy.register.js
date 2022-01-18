const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const bcrypt = require('bcrypt')

const validEmail = (email)=>{
  const regular =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regular.test(String(email).toLowerCase())
}

const validPasword = (password)=>{
  const regular = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
  //este retuirn retorna un booleano
  return regular.test(String(password))
}



const registerStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done) => {
           /* 
            1 comprobamos que usuario no exista previamente
              -comprobar que es un mail valido
              -comprobar que es una contraseña valida
            2 encriptar la contraseña y guardarla en una variable
            3 creamos el usuario y lo guardamos en la bbdd
            4 le iniciamos la sesion al usuarion llamando a passport autenticate()  
            
            */
        try {

          const {name, passwordVerify} = req.body
          const isSamePassword = password === passwordVerify

          if(!isSamePassword || !passwordVerify){
            const error = new Error('usuario o contraseña incorrecta')
            return done(error)
          }

          const isValidEmail = validEmail(email)
          if(!isValidEmail){
            const error = new Error('el email no es valido,introduce unn mail valido')
            return done(error)
          }

          const isValidPassword = validPasword(password)
          if(!isValidPassword){
            const error = new Error('la cobntraseña ')
            return done(error)
          }
         
            //comprobamos que existe el ususario antes de hacer login
            const userPrevius = await User.findOne({email: email})

            //si hay usuario dara un error
            if (userPrevius) {
                const error = new Error('este usuario ya esta registrado')
                return done(error)
            }
            //si no existe hacemos un hash al password antes de registrarlo
            //saltRounds encripta la contraseña
            const saltRounds = 10
            const hashPassword = await bcrypt.hash(password, saltRounds)
            // creamos el nuevo usuario y lo guardamos en la bbdd
            const newUser = new User({
                email: email,
                password: hashPassword,
            })
            const savedUser = await newUser.save()

            //ahora invocamos el callback donde va el null con el error y el usuario creado
            return done(null, savedUser)


        } catch (err) {
                return done(err)
            }
        }
    )


  




module.exports = registerStrategy

