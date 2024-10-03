const mongoose = require("mongoose");

const User = require("./User");

mongoose.connect("mongodb://localhost/testdb");
run();
async function run() {
    
 try{
    // const user = await User.create({
    //     name: "Kyle",
    //     age: 26,
    //     email:'jaSIM@gmai.com',
    //     hobbies:['Reading',"writing"],
    //     address:{
    //        street:"Main st"
    //     }
    //    });
    //  console.log(user);


    // const user = await User.find({name:"Kyle"})

    // const user = await User.where("age")
    //     .gt(12)
    //     .where("name")
    //     .equals('Kyle')
    //     .populate("bestFriend")
    //     .limit(2)
    
    // console.log(user)

    const user = await User.findOne({name:"Kyle"})
    console.log(user)
    user.sayHi()

 }
 catch(err){
    console.log(err.message)
 }
}
