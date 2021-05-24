var mongoose = require('mongoose');
const UniqueUser = require('mongoose-unique-validator')
var schema=mongoose.Schema;
var bcrypt = require('bcrypt');
var Schema = new schema({
fname : {type:String , require:true},
lname : {type:String , require:true},
roll : {type:Number , require:true },
phone : {type:Number , require:true},
gyear : {type:Number , require:true},
email: {type:String , require:true , unique:true },
course: {type:String , require:true},
branch: {type:String},
password: {type:String , require:true},
creationDate:{type:Date}
});
Schema.plugin(UniqueUser);
Schema.statics.hash = function hash(password)
{
    return bcrypt.hashSync(password,5);
}
 Schema.methods.isValid =function(hash){
    return bcrypt.compareSync(hash, this.password)
}
module.exports = mongoose.model('Alumni' , Schema);