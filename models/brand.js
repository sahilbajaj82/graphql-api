const moongose = require('mongoose');
const Schema = moongose.Schema;

const brandSchema =new Schema({
    name: String,
    companyId: String
});

module.exports=moongose.model('Brand',brandSchema);  