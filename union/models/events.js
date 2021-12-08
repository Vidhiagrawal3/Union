var mongoose = require('mongoose');
var schema=mongoose.Schema;
var Schema = new schema({
etitle:{type:String , require:true},
eDiscription:{type:String, required:true},
edate:{type:Date},
creationDate:{type:Date, require:true}
});

module.exports = mongoose.model('events' , Schema);
