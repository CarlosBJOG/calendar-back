const {Schema, model } = require('mongoose');

const userSchema = Schema({

    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        index: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    img: {
        type: String
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    }

});


userSchema.methods.toJSON = function () {
    const { __v, password, _id,...user } = this.toObject();
    user.uid = _id;

    return user;
}


module.exports = model( 'User', userSchema );