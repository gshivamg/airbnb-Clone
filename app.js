// Core Module
const path = require('path');

// External Module
const express = require('express');
const session =require("express-session");
const MongoDBStore=require("connect-mongodb-session")(session);
require("dotenv").config();
const DB_path=process.env.MONGO_URI

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const authRouter=require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const { log } = require('console');
const { default: mongoose } = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const store = new MongoDBStore({
  uri:DB_path,
  collection: "sessions"
})

app.use(express.urlencoded());

app.use(session({
  secret:"shivams Secret",//random value will be replaced later
  resave: false,
  saveUninitialized: true,
  store:store
}));

app.use((req,res,next)=>{
  req.isLoggedIn = req.session.isLoggedIn;
  next();
})

app.use(authRouter);
app.use(storeRouter);
app.use("/host",(req,res,next)=>{
  if(req.isLoggenIn){
    next();
  }else{
    res.redirect("/login");
  }
})
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;




mongoose.connect(DB_path).then(()=>{
  console.log("connected to mongo!!")
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err)=>{
  console.log("Error aagya bhaiSahab mongo se connect hone me ",err);
  
})