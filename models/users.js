const { Schema, model } = require('mongoose');

const userSchema = ({
    name:{
        type:String,
        required:[true,'El nombre es obligatorio']
    },
    email:{
        type:String,
        required:[true,'El nombre es obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El nombre es obligatorio'],
    },
    img:{
        type:String
    },
    role:{
        type:String,
        required:true,
        enum: [ 'ADMIN_ROLE', 'USER_ROLE' ]
    },
    state:{
        type: Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});

module.exports = model( 'User',userSchema );//Debe ir en singular