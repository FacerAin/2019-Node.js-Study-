let users = [{
        "id": "user1",
        "password": "123",
        "num": "20191000",
        "dept": "CE"
    },
    {
        "id": "user2",
        "password": "qwer1234",
        "num": "20191001",
        "dept": "EE"
    }
];

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

app.get('/', (req, res) => {
    res.redirect('html/signup.html')
});

app.post('/signup', (req, res) => {
    const id = req.body.userId;
    const passwd = req.body.password;
    const num = req.body.userNum;
    const dept = req.body.userDept;
    if (users.find(item => item.id == id)) {
        res.send('User already exists');
    } else {
        let user = {
            id: id,
            password: passwd,
            num: num,
            dept: dept
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
            req.session.sess_id = id;
            res.redirect("/profile");
        } else {
            res.send('Password wrong');
        }
    } else {
        res.send('ID wrong');
    }
});
app.get('/profile', (req, res) => {
    if(!req.session.sess_id){
        res.send('No session!');
    }
    else{
        const session_id = req.session.sess_id;
        let user_data = users.find(item => item.id == session_id)
        if(user_data){
            let str_output = user_data.id + '\n'+user_data.num+'\n'+user_data.dept
            res.send(str_output);
        }
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000!');
});