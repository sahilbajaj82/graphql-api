const moongose = require('mongoose');
const Schema = moongose.Schema;

const companySchema =new Schema({
    name: String,
    ceo: String
});

module.exports=moongose.model('Company',companySchema);  