var mongoose = require('mongoose');
var schema=mongoose.Schema;
var Schema = new schema({
fname : {type:String , require:true},
lname : {type:String , require:true},
roll : {type:Number , require:true},
phone : {type:Number , require:true},
gyear : {type:Number , require:true},
email: {type:String , require:true},
course: {type:String , require:true},
branch: {type:String},
password: {type:String , require:true},
creationDate:{type:Date}
});
module.exports = mongoose.model('Alumni' , Schema);