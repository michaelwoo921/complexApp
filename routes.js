const router = require('express').Router()


router.get('/', function(req,res){
    res.render('home-guest')
})
router.post('/register', function(req,res){
    console.log(req.body);
    res.send('register route')
})

module.exports = router;