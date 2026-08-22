const express = require('express');
const { deleteUser, getUsers } = require('../controllers/users');
const authenticate = require('../middlewares/authenticate');
const { authorize } = require('../middlewares/authorize');

const router = express.Router();

const keycloakManaged = (req, res) => res.status(410).json({
  message: 'Authentication and registration are managed by Keycloak.',
  code: 'KEYCLOAK_MANAGED_AUTH',
});

router.post('/register', keycloakManaged);
router.post('/login', keycloakManaged);

router.get('/me', authenticate, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.get('/', authenticate, authorize(['admin', 'teacher', 'staff']), getUsers);
router.get('/users', authenticate, authorize(['admin', 'teacher', 'staff']), getUsers);
router.delete('/user/:id', authenticate, authorize(['admin']), deleteUser);

module.exports = router;
