const router = require('express').Router();
const { allowedRoles, mustLogin } = require('../controllers/authControllers');
const { getAllCards, getCardById, createNewCard, deleteCard, updateCard, likeCard, changeBizNumber } = require('../controllers/cardsControllers');

  //  base path = "/cards"
  
  router.get('/', getAllCards)
  router.get('/:id', getCardById)
  router.post('/' , mustLogin, createNewCard)
  router.put('/:id', mustLogin, allowedRoles(["admin", "ownUser"]), updateCard)
  router.patch('/:cardId', mustLogin, likeCard)
  router.patch('/biz/:cardId', mustLogin, allowedRoles(["admin"]), changeBizNumber)
  router.delete('/:id', mustLogin, allowedRoles(["admin", "ownUser"]), deleteCard)

module.exports = router;