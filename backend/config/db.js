const mongoose = require("mongoose")

const MongoDbConnect = () => {
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log("Database connected successfully")
    }
    catch(error){
      console.log(error)
    }
}

module.exports = MongoDbConnect