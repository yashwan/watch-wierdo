const app = require('./app');
const mongoose = require("mongoose");
const config = require('./config/config')
console.log(config.env)
const port = 3000;

mongoose.connect(config.MONGODB_URL)
    .then(() => console.log(`server connected ${config.MONGODB_URL}`))
        .then(()=>{
            app.listen(port, console.log(`App is listening at PORT: ${port}`))
            })
    .catch((error) => {
        console.log(`Error: ${error}`)
    })
    .finally(() => {
        console.log("This is For Connection Mongoose")
    })

app.head('/', (req, res) => {
  res.sendStatus(200); // Respond with OK for health checks
});
