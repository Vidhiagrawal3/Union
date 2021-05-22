const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema =mongoose.Schema({
fname : {type:String , require:true},
lname : {type:String , require:true},
roll : {type:Number , require:true},
phone : {type:Number , require:true},
gyear : {type:Number , require:true},
email: {type:String , require:true, unique:true},
course: {type:String , require:true},
branch: {type:String},
password: {type:String , require:true},
creationDate:{type:Date}
});

Schema.plugin(uniqueValidator);

// Schema.statics.hash = function hash(password)
// {
//     return bcrypt.hashSync(password,10);
// }
//  Schema.methods.isValid =function(hash){
//     return bcrypt.compareSync(hash, this.password)
// }
module.exports = mongoose.model('Alumni' , Schema);