const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');



const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'face-recognition'
  }
});


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());



//root 
app.get('/', (req,res)=> res.json('Welcome to server API'))
// Signin API
app.post('/signin', signin.handleSignin(db, bcrypt))
// Register API
app.post('/register', register.handlRegister(db, bcrypt) )
// Profile API
app.get('/profile/:id', profile.handleProfileGet(db))
// image rank
app.put('/image', image.handleImage(db))
// image api call
app.post('/imageurl', (req, res)=> {image.handleApiCall(req, res)})

    

app.listen(3000);

/* 
/ --> res = working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/