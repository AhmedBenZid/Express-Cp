const express = require("express");
const app = express();
const port = 5000;
const expressLayouts = require('express-ejs-layouts');

//Static Files
app.use(express.static('Public'))
app.use('/css', express.static(__dirname + 'Public/css'))
app.use('/images', express.static(__dirname + 'Public/images'))

const myFunction = function (req, res, next) {
    let date = new Date();
    let day = date.getDay();
    let hours = date.getHours();
    if (day != 6 && day != 0 && hours > 8 && hours < 17) {
        next();
    } else {
        next(res.send("<center><h1>Sorry we are actually closed ! </h1></center>"));
    }
};


app.use(expressLayouts, myFunction);
app.set("view engine", "ejs");

app.get('', (req, res) => {
    res.render("home", { title: "Home" })
})
app.get('/Our-Services', (req, res) => {
    res.render("ourServices", { title: "Our-Services" })
})
app.get('/Contact-Us', (req, res) => {
    res.render("contactUs", { title: "Contact-Us" })
})

app.listen(port, () => console.log('The Server is Running in : http://localhost:5000'))