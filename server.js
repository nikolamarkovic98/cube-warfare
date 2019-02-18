let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('menu');
});

app.post('/start', (req, res) => {
    res.render('game', {
        cubes: req.body.cubes
    });
});

app.listen(port, (req, res) => {
    console.log('Server started on port ' + 3000);
});