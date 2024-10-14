const mongoose = require('mongoose')

const {Schema} = mongoose

mongoose.connect('mongodb://localhost:27017/yorDatabaseName')
    .then(console.log('mongodb connected'))
    .catch((err)=>console.log(err))

const studentSchema = new mongoose.Schema({
    name:String,
    age:Number,
    subjects :[{type:Schema.Types.ObjectId,ref:"Subject"}]
})
const subjectSchema = new mongoose.Schema({
    
    title:String,
    pages:Number,
})

const Student = mongoose.model('Student',studentSchema)
const Subject = mongoose.model("Subject",subjectSchema)

Student.insertMany([
    { name:"jasim",age:20},
    {name:"salman",age:19},
    {name:'sabith',age:20}
])

Subject.insertMany([
    {title:'English',pages:200},
    {title:"Economics",pages:220},
    {title:"Computer",pages:175}
])
async function abc(){
    const jjj=await Student.find()
    .populate('subjects')
    .exec()
    console.log(jjj)
}
abc()

