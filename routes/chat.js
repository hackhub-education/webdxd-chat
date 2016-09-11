var express = require('express');
var router = express.Router();

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

/* GET chat page. */
router.get('/', loggedIn, function(req, res, next) {
    res.render('chat', { username: req.user.username });
});

module.exports = router;
