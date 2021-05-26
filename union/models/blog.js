var mongoose = require('mongoose');
var schema=mongoose.Schema;
var Schema = new schema({
tblog:{type:String , require:true},
blog:{type:String , require:true},
token:{type:String , require:true},
creationDate:{type:Date}
});

module.exports = mongoose.model('Blog' , Schema);