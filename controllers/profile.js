
const handleProfileGet = (db)=> (req,res)=> {
  const id = Number(req.params.id)
  let found = false;
  db.select('*').from('users').where({id}).then(user=> {
    if (user.length) {
      res.json(user[0]);
    }else {
      res.status(400).json(`User doesn't found`)
    }
    }).catch(err=> res.status(400).json('error getting user'));
}

module.exports = {
  handleProfileGet
}