const express = require('express');
const router = express.Router();
const storeModule = require('../../lib_modules/store.js');

router.get('/', async function (req, res) {
    const n = req.session.views || 0;
    req.session.views = n + 1;
    console.log('VIEWS');
    console.log(req.session.views);
    res.render('home', {
        title: 'THIS IS A TITLE',
        message: 'THIS IS A MESSAGE',
    });
});

router.get('/destroy', async function (req, res) {
    req.destroy();
    res.json({
        status: 'success',
        message: 'destroyed',
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

router.post('/login', express.json(), async function POST_login(req, res) {
    try {
        console.log('');
        console.log('homecontroller.POST_login');
        let { username, password } = req.body;

        let authenticate = await storeModule.AuthenticateUser({
            username,
            password,
        });

        console.log('AUTHENTICATION: ', authenticate);

        if (authenticate) {
            res.status(200).json({
                status: 'success',
            });
        } else {
            res.status(401).json({
                status: 'error',
                message: 'Username and Password is wrong.',
            });
        }
    } catch (e) {
        console.log('');
        console.log('homecontroller.POST_login ERROR');
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
