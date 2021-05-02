const express = require('express');

const router = express.Router();
const connexion = require('../data/mysql');

router.get('/alltodo', (req, res) => {
  try {
    connexion.query('SELECT * FROM allTodo', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          message: 200,
          result,
        });
      }
    });
  } catch {
    console.log('erreur');
  }
});
router.post('/alltodo', (req, res) => {
  const { name } = req.body;
  const { categoty } = req.body;
  const { date } = req.body;
  try {
    connexion.query('INSERT INTO allTodo (name, categoty, date) VALUES (?, ?, ?)', [name, categoty, date], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: 200,
          message: result,
        });
      }
    });
  } catch {
    console.log('erreur');
  }
});
router.delete('/alltodo', (req, res) => {
  const { id } = req.body;
  try {
    connexion.query('DELETE FROM allTodo WHERE id = ?', [id], (err) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          status: 200,
          message: 'Todo was deleted',
        });
      }
    });
  } catch {
    console.log('erreur');
  }
});
module.exports = router;
