import mongoose from "mongoose"

mongoose.connect("mongodb://localhost/api-sis-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})
    .then(db=> console.log("DB is Connected"))
    .catch(error=> console.log(error))