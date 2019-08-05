let users = [{
        "id": "user1",
        "password": "123"
    },
    {
        "id": "user2",
        "password": "qwer1234"
    }
];

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.redirect('html/signup.html')
});

app.post('/signup', (req, res) => {
    const id = req.body.userId;
    const passwd = req.body.password;
    if (users.find(item => item.id == id)) {
        res.send('User already exists');
    } else {
        let user = {
            id: id,
            password: passwd
        };
        users.push(user);
        res.redirect('html/login.html')
    }
});
app.post('/login', (req, res) => {
    const id = req.body.userId;
    const passwd = req.body.password;
    let user_data = users.find(item => item.id == id)
    if (user_data) {
        if (user_data.password == passwd) {
            res.send("Welcome " + id + "!");
        } else {
            res.send('Password wrong');
        }
    } else {
        res.send('ID wrong');
    }

});
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});