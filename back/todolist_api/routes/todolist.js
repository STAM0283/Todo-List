const express = require('express');

const router = express.Router();
const connexion = require('../data/mysql');

router.get('/alltodo', (req, res) => {
  try {
    connexion.query('SELECT * FROM allTodo', (err, result) => {
      if (err) console.log(err);
      res.send({
        message: 200,
        result,
      });
    });
  } catch {
    console.log('erreur');
  }
});
module.exports = router;
