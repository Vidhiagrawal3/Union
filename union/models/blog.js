var mongoose = require('mongoose');

var schema=mongoose.Schema;
var Schema = new schema({
id :{type:String , require:true},
fname : {type:String , require:true},
lname : {type:String , require:true},
btitle : {type:string , require:true},
bblog : {type:string , require:true},
creationDate:{type:Date}
});
Schema.statics.hash = function hash(password)
{
    return bcrypt.hashSync(password,10);
}
 Schema.methods.isValid =function(hash){
    return bcrypt.compareSync(hash, this.password)
}
module.exports = mongoose.model('Alumni' , Schema);