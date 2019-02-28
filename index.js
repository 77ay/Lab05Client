var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();
var data = {
    email : ''
}
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(session({
    secret: 'keyboard cat', cookie: { maxAge: 6000 },
    resave: false, saveUninitialized: false
}))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.static(__dirname + '/views'))


app.get('/login', (req, res) => {
    console.log(req.session.email)
    if (req.session.email){
        res.render('login', {data})
    }
    else{
        res.render('login2')
    }
})

app.post('/login', urlencodedParser, function (req, res) { 
    
    if (req.body.email != ''  && req.body.password == '240311') {
        req.session.email = req.body.email
        req.session.password = req.body.password
        data.email = req.session.email
       res.render('login', {data})
    }
    else{
        res.redirect('/')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

app.listen(8000)