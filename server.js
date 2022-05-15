require('dotenv/config');
const mongoose = require('mongoose');
const app = require('./index');


mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5004

app.listen(port, () => {
    console.log(`App running on port ${port}!`)
})