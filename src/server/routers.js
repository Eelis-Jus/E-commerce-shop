const { Router } = require('express')
const usercontroller = require('./user_controller')
const itemcontroller = require('./item_controller')
const ordercontroller = require('./order_controller')
const jwtcontroller = require('./jwt_file')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = Router()

//huolehdi että tietyt chars on numeroita, tai vaihda tietyt chars  tietokannassa floatiksi

router.get('/user', usercontroller.getUser);
router.get('/user/usernamecheck', usercontroller.checkUsernameAvailability);
router.get('/user/emailcheck', usercontroller.checkEmailAvailability);
router.get('/user/password', usercontroller.getUserPassword);
router.get('/user/userinfo', usercontroller.getUserInfo);
router.get('/user/loggedinuserinfo', authenticateToken, usercontroller.getLoggedinUserInfo);
router.get('/user/verifypassword',usercontroller.verifypassword);
router.post('/user/adduser', usercontroller.createUser);
router.delete('/user/deleteuser', usercontroller.deleteUser);

router.get('/item', itemcontroller.getItem);
router.get('/item/itemname', itemcontroller.getItemByName);
router.get('/item/category', itemcontroller.getItemsforcategory);
router.post('/item/additem', itemcontroller.createItem);
router.delete('/item/deleteitem', itemcontroller.deleteItem);
router.put('/item/alterstock', itemcontroller.removeItemFromStock);

router.get('/order', ordercontroller.getOrders);
router.get('/order/:id', ordercontroller.getOrderById);
router.post('/order/addorder', ordercontroller.createOrder);
router.delete('/order/deleteorder/:id', ordercontroller.deleteOrder);

router.post('/jwt/make', jwtcontroller.jwtMaker);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log("this is error"+err)
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}


module.exports = router;