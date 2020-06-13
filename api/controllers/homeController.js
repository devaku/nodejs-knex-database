const express = require('express');
const router = express.Router();
const storeModule = require('../../lib_modules/store.js');

router.get('/', async function (req, res) {
    res.render('home', {
        title: 'THIS IS A TITLE',
        message: 'THIS IS A MESSAGE',
    });
});

router.post('/createuser', express.json(), async function POST_createuser(
    req,
    res
) {
    try {
        console.log('');
        console.log('homecontroller.POST_createuser');
        let { username, password } = req.body;
        await storeModule.CreateUser({
            username,
            password,
        });
        res.status(200).json({
            status: 'success',
        });
    } catch (e) {
        console.log('');
        console.log('homecontroller.POST_createuser ERROR');
        console.log(e);
        res.json({
            status: 'error',
            message: e.message,
        });
    }
});

module.exports = {
    router: router,
};
