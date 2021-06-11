var mongoose = require('mongoose');
var schema=mongoose.Schema;
var Schema = new schema({
tblog:{type:String , require:true},
blog:{type:String , require:true},
id:{type:String , require:true},
fname:{type:String , require:true},
lname:{type:String , require:true},
imageURL:{type:String},
creationDate:{type:Date}
});

module.exports = mongoose.model('Blog' , Schema);
