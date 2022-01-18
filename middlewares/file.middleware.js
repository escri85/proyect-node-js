const multer = require('multer')
const path = require('path')
const fs = require('fs')

const storage = multer.diskStorage({
    
})



const fileFilter = ()=>{}
const upoad = multer({
    storage,
    fileFilter
})



module.exports = {upload}