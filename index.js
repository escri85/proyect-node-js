const express = require('express')
const passport = require('passport')
const bcrypt = require('bcrypt')
const session = require('express-session')
const mongoStore = require('connect-mongo')
require('./authentication')

const PORT = 3000;
const server = express();
const { connectToDb , DB_URL} = require('./utils/db');
connectToDb();



const userRouter = require('./routes/user.routes')
const rickRouter = require('./routes/rick.routes')
const cinemaRouter = require('./routes/cinema.routes')
const movieRouter = require('./routes/movie.routes')
const indexRouter = require('./routes/index.routes');
const { authenticate } = require('passport')

//este servidor dejaria la sesion abierta durante el tiempo q le digamos a la cookie
server.use(
  session({
    secret:'KGUUYDGkubhfeibefiJLhfeouh',
    resave:false,
    saveUninitialized:false,
    cookie:{
      maxAge: 1000 * 60 * 60 * 24
    },
    store: mongoStore.create({mongoUrl: DB_URL})
})
)

//estas dos lineas son propias de express y  transforman la información enviada como JSON al 
//servidor de forma que podremos obtenerla en req.body
server.use(express.json());
server.use(express.urlencoded({extended: false}));


server.use(passport.initialize())
server.use(passport.session())

server.use('/', indexRouter)
server.use('/movie', movieRouter);
server.use('/cinema',cinemaRouter)
server.use('/users',userRouter)
server.use('/api',rickRouter)

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});








