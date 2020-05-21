const moongose = require('mongoose');
const Schema = moongose.Schema;

const productSchema =new Schema({
    name: String,
    price: Number,
    brandId: String
});

module.exports=moongose.model('Product',productSchema);  