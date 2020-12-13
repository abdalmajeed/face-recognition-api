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
app.get('/', (req,res)=>{ res.send(database.users); })


// Signin API
app.post('/signin', (req,res)=>{ signin.handleSignin(req, res, db, bcrypt); })

// Register API
app.post('/register', (req, res)=>{ register.handlRegister(req, res, db, bcrypt) })
// Profile API
app.get('/profile/:id', (req,res)=>{ profile.handleProfileGet(req, res, db)})
// image rank
app.put('/image', (req, res)=>{ image.handleImage(req, res, db)})
    

app.listen(3000);

/* 
/ --> res = working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user
*/