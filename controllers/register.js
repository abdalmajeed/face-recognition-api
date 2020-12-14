
const handlRegister = (db, bcrypt)=> (req,res)=>{
  const {name, password, email} = req.body;
  if (!name || !password || !email) {
    return res.status(400).json('incorrect form submission')
  }
  const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
      trx.insert({
        hash: hash,
        email: email
      })
        .into('login')
        .returning('email')
        .then(loginEmail => {
          return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].toLowerCase(),
            name: name.toLowerCase(),
            joined: new Date()
          })
          .then(user => {
            res.json(user[0]);
          })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    // .catch(res.status(400).json('unable to Register'))
}

module.exports = {
  handlRegister
}
