const router = require('express').Router();
const { verifyToken, stripToken } = require('../middleware');
const controller = require('../controllers/AuthController');

router.get('/', (req, res) => {
  res.send({ message: 'this is the auth router' });
});
router.post(`/`, controller.Register);

module.exports = router;
