const express = require('express')
const router = express.Router()
const {checkUserIsExist, signup, getUserTotalAmount, checkUserTotalAmount, checkWalletTotalAmount, buyCrypto, sellCrypto, addBuyToWallet, addSellToWallet, getuserUnfo, getProfileInfo} = require('../controllers/userController')
const {SignUpValidator} = require('../middllwars/signInAndsignUpValidator')

router.post('/signUp', SignUpValidator, checkUserIsExist, signup)
router.post('/buy', getUserTotalAmount, checkUserTotalAmount, buyCrypto, addBuyToWallet)
router.post('/sell', getUserTotalAmount, checkWalletTotalAmount, sellCrypto, addSellToWallet)
router.get('/info/:email', getProfileInfo, getuserUnfo)

module.exports = router

