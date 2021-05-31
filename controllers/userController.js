const User = require('../models/User')

exports.signup = (req, res) => {
    try {
        const user = new User(req.body)
        user.save((err, sAdmine) => {
            if(err) {
                return res.status('400').json({error: "this email is already existe"})
            }
            res.send(sAdmine)
        })
    }
    catch(error) {

    }
}

exports.checkUserIsExist = (req, res, next) => {
    User.find({email: req.body.email}, (error, user) => {
        if(error)
            return res.status(400).json({error: error})

        if(user.length > 0)
            return res.send(user)
        
        next()
    })
}

exports.getUserTotalAmount = (req, res, next) => {
    User.findOne({email: req.body.email}, (error, Uemail) => {
        if(error)
            return res.status(400).json({error: error})

        req.userSold = Uemail.sold
        req.walletSold = Uemail.walletSold
            next()
    })
}

exports.checkUserTotalAmount = (req, res, next) => {
    if(req.userSold < req.body.price)
        return res.status(400).json({error: "you not have enogth money to buy"})

    next()
}

exports.buyCrypto = (req, res, next) => {
    const conditions = {email: req.body.email}
    const update = {sold: req.userSold - req.body.price}
    const options = {upsert: true}

    User.findOneAndUpdate(conditions, update, options, (error, afterBuy) => {
        if(error)
            return res.status(400).json({error: error})

        next()
    })
}

exports.addBuyToWallet = (req, res) => {
    const conditions = {email: req.body.email}
    const update = {walletSold: req.walletSold + req.body.price}
    const options = {upsert: true}

    User.findOneAndUpdate(conditions, update, options, (error, afterBuy) => {
        if(error)
            return res.status(400).json({error: error})

        res.send(afterBuy)
    })
}

// sell
exports.checkWalletTotalAmount = (req, res, next) => {
    if(req.walletSold < req.body.price)
        return res.status(400).json({error: "you not have enogth money in your wallet"})

    next()
}

exports.sellCrypto = (req, res, next) => {
    console.log(req.userSold)

    const conditions = {email: req.body.email}
    const update = {sold: req.body.price + req.userSold}
    const options = {upsert: true}

    User.findOneAndUpdate(conditions, update, options, (error, afterSell) => {
        if(error)
            return res.status(400).json({error: error})

        next()
    })
}

exports.addSellToWallet = (req, res) => {
    const conditions = {email: req.body.email}
    const update = {walletSold: req.walletSold - req.body.price}
    const options = {upsert: true}

    User.findOneAndUpdate(conditions, update, options, (error, afterBuy) => {
        if(error)
            return res.status(400).json({error: error})

        res.send(afterBuy)
    })
}

// info
exports.getProfileInfo = (req, res, next) => {
    User.findOne({email: req.params.email}, (error, Uemail) => {
        if(error)
            return res.status(400).json({error: error})

        req.userUnfo = Uemail
            next()
    })
}

exports.getuserUnfo = (req, res) => {
    res.send(req.userUnfo)
}

