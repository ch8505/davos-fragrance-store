const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    prodId: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'Product'
    },
    userId: {
        type: mongoose.ObjectId,
        required: true,
        ref: 'User'
    },
    amount: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', cartSchema)