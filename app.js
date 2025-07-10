// Core Module
const path = require('path');

// External Module
const express = require('express');

//Local Module
const storeRouter = require("./routes/storeRouter")
const hostRouter = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorsController = require("./controllers/errors");

const { log } = require('console');
const { default: mongoose } = require('mongoose');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(storeRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorsController.pageNotFound);

const PORT = 3000;
// mongoConnect(()=>{
//     // console.log(client);
//   app.listen(PORT, () => {
//     console.log(`Server running on address http://localhost:${PORT}`);
//   });
// })

const DB_path="mongodb+srv://gshivamg:Qwerty%401234@devcluster.17r4ilt.mongodb.net/airbnb?retryWrites=true&w=majority&appName=devCluster"

mongoose.connect(DB_path).then(()=>{
  console.log("connected to mongo!!")
  app.listen(PORT, () => {
    console.log(`Server running on address http://localhost:${PORT}`);
  });
}).catch((err)=>{
  console.log("Error aagya bhaiSahab mongo se connect hone me ",err);
  
})