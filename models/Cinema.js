const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cinemaSchema = new Schema(
    {
        name:{type:String,required:true},
        location:{type:String,required:true},
        movies:[{ type: mongoose.Types.ObjectId, ref: 'Movies' }]
        //ref hace referencia al nombre de la colleccion
    },
    {
        timestamps: true,
    }
)

    const Cinema = mongoose.model('Cinemas',cinemaSchema)
    module.exports = Cinema