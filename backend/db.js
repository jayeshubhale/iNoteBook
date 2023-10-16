const mongoose = require('mongoose');
// const MongoURI = "mongodb://127.0.0.1:27017/";

const connectToMongo = ()=> {
mongoose.connect('mongodb://127.0.0.1:27017/')
 .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
}
module.exports = connectToMongo;

// const mongoose = require('mongoose');

// const dbURI = 'mongodb://127.0.0.1:27017';
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// const dbConnection = mongoose.connection;
// const connectToMongo=()=>{
// dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// dbConnection.once('open', () => {
//     console.log('Connected to MongoDB');
// });
// }

// module.exports = connectToMongo;