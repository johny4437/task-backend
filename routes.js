const route = require('express').Router();
const { sign } = require('jsonwebtoken');
const { singup, singin } = require('./controllers/user');
const { read, create, update, remove}  = require('./controllers/tasks')
const auth = require('./middlewares/auth')
const { userId, isAuth } = require('./middlewares/userAuth')


route.post('/singup', singup);
route.post('/singin', singin);
route.post('/create/:id',auth, isAuth, create);
route.put( '/update/:id', auth, isAuth, update);
route.delete('/remove/:id', auth, isAuth, remove);

route.param('id', userId)
module.exports = route