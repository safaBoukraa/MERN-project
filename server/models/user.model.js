const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    first_name:{
        type: String,
        required:[true,"First Name is required !"],
        minlength:[3, '{PATH} length must be at least 3 ⛔⛔⛔']
    },
    last_name:{
        type: String,
        required:[true,"Last Name is required !"],
        minlength:[3, '{PATH} length must be at least 3 ⛔⛔⛔']
    },
    // email:{
    //     type: String,
    //     required:[true,"Email is required !"],
    //     unique: true,
    //     match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    // },
    email:{
        type : String,
        required:[true, "Email must be present."],
        validate:[isEmail, "Email is not valid."],
        // validate : [value =>  /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value),"Email is not valid."],
        unique:[true, 'Email already exists. Try to Login.']
    },
    password : {
        type: String,
        required:[true, 'Password must be provided .'],
        minlength:[6, "Password too short."]
    },
    adopte : {
        type: Boolean,
        required:[true, 'adopte must be provided .'],
        default:false
       
    },
    role: {
        type: String,
        enum: ['admin', 'user'], 
        default: 'user' 
    },

    // ConfirmPassword : {
    //     type: String,
    //     required:[true, 'Password must be provided .'],
    //     minlength:[6, "Password too short."]
    // }
     products : {
         type:[mongoose.Types.ObjectId],
         ref:'Product'
     }
}, {timestamps:true})

// Confirm Password ?
// Register ? 
/* 
email valid && doesn't exist
Username valid
password valid
password vs confirm PW
*/
// 1 - Create a virtual property 'confirmPW' with getter and setter 
UserSchema.virtual('confirmPassword').get(() => this._confirmPassword).set(value=> this._confirmPassword = value)

// 2 - Validate Password and Confirm Password ?

UserSchema.pre('validate', async function (next) {
    console.log("Inside PASSWORD validation")
    console.log(this)
    if(this.password!=this.confirmPassword){
        this.invalidate('confirmPassword', "Passwords must match.")
    }
    next()
}, {timestamps:true})
UserSchema.pre('save', async function (next)  {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        console.log('Hashed PASSWORD : ', hashedPassword)
        this.password = hashedPassword;
        next();
    } catch(error) {
        console.log("Error while hashing Password", error)
    }
} )

module.exports = mongoose.model('User', UserSchema);