// required modules
const express = require('express') ;
const app = express() ;
const mongoose = require('mongoose') ;
const cors = require('cors') ;
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
require('dotenv').config() ;
const {createToken, validateToken} = require('./JWT')


// environment variable
const PORT = process.env.PORT ;
const DATABASE = process.env.DATABASE ;

// middleware
app.use(cors()) ;
app.use(express.json());
app.use(cookieParser())

// connection to database
mongoose.connect(DATABASE, { useNewUrlParser: true, useUnifiedTopology: true });

// user model
const User = require('./models/User')

const salt = bcrypt.genSaltSync(10);




// endpoints

app.post('/register',async (req,res)=>{
    const {username,password} = req.body ;
    try{
        const UserDocs = await User.create({
            username,
            password: bcrypt.hashSync(password,salt)
        })
        if(UserDocs){
            res.json("User REgistered")
        }
    }catch(err){
        res.status(400).json(err)
    }
})


app.get('/profile', validateToken, (req,res)=>{
    res.json("hello")
})



// app.get('/isUserAuth', ,(req,res)=>{
//     res.send("Yo you are authenticated")
// })


app.post('/login', async (req,res)=>{
    const {username, password} = req.body ;

    const user = await User.findOne({username : username}) ;

    if(!user){
        return res.status(400).json({error: "User Doesn't Exist"}) ;
    }
 
    const dbPassword = user.password 
    bcrypt.compare(password, dbPassword).then((match)=>{
        if(!match){
            return res.status(400).json({error: "Wrong credentials"})
        }
        
        const accessToken = createToken(user)

        res.cookie("access-token", accessToken,{
            maxAge: 30 * 24 * 60 * 60 * 1000 ,         // max life of cookie in users browser in millisecond
            httpOnly: true,
        })

        res.json("Logged In")

    }); 

    
})






app.post('/logout',(req,res)=>{
    res.clearCookie('access-token')
    res.json({message: "Logout successful"})
})


app.delete('/delete',(req,res)=>{
    // res.json({message: "All documents deleted succesfully"})
    User.deleteMany({})
  .then((res) => {
    res.json({message: "All docs deleted"})
  })
  .catch((error) => {
    res.json({message: "error"})
  }); 
})





// method to star the server and bind it to specific point
app.listen(PORT,()=>{
    console.log(`server is listning on port ${PORT}`) ;
})












// sujaltagade01
// cM9PktwGO7RZQco6




// User.deleteMany({})
//   .then(() => {
//     console.log('All documents deleted successfully.');
//   })
//   .catch((error) => {
//     console.error('Error deleting documents:', error);
//   }); 


// mongodb+srv://sujaltagade01:cM9PktwGO7RZQco6@mernjwt.qhapz2b.mongodb.net/?retryWrites=true&w=majority


