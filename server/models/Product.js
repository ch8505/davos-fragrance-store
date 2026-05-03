// const mongoose = require('mongoose')

// const productSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     price: {
//         type: Number,
//         required: true
//     },
//     amount: {
//         type: Number,
//         default: 20
//     },
//     image: {
//         type: String,
//         required: true
//     },
//     category: {
//         type: String,
//         enum: ['מפיצי ריח עם מקלות', 'מפיצי ריח ספריי', 'מכשירי ריח חשמליים', 'מעטפות ריח'],
//         required: true
//     }
// }, {
//     timestamps: true
// })

// module.exports = mongoose.model('Product', productSchema)

const mongoose = require('mongoose')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        default: 20
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['מפיצי ריח עם מקלות', 'מפיצי ריח ספריי', 'מכשירי ריח חשמליים', 'מעטפות ריח'],
        default: 'מפיצי ריח עם מקלות'
    }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)