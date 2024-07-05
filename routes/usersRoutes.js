const router = require('express').Router();
const { getAllUsers, getUserById, deleteUser, updateUser, toggleIsBusiness, register, login } = require('../controllers/usersControllers');
const { mustLogin, allowedRoles } = require('../controllers/authControllers');

  //  base path = "/users"
  
  router.get('/', mustLogin, allowedRoles(['admin']), getAllUsers)
  router.get('/:id', mustLogin, allowedRoles(["admin", "ownUser"]), getUserById)
  router.post('/register', register)
  router.post('/login', login)
  router.put('/:id', mustLogin, allowedRoles(["admin", "ownUser"]), updateUser)
  router.patch('/:id', mustLogin, allowedRoles(["admin", "ownUser"]), toggleIsBusiness),
  router.delete('/:id',mustLogin, allowedRoles(["admin", "ownUser"]), deleteUser)

module.exports = router;

