const express = require("express");
const path = require("path");
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactDance');
}

const bodyparser = require('body-parser');
const app = express();
const port = 3000;

// define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// EJS SPECIFIC STUFF
app.set('view engine', 'ejs'); // Set the template engine as ejs
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(() => {
       res.send("This item has been saved to the database") 
    }).catch((err) => {
       res.send("This item was not saved to the database") 
    });
})

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
