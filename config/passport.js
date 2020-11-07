const passport = require('passport');
const passportJWT =  require('passport-jwt');
const{ExtractJwt,  Strategy } = passportJWT;
const knex = require('./db');
require('dotenv').config

module.exports = app =>{
    const params = {
        secretOrKey:process.env.JWT,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    }
    const strategy =  new Strategy(params, (payload, done)=>{
        knex('users')
        .where({id: payload.id})
        .first()
        .then(user =>{
            if(user){
                done(null, {id:user.id, email:user.email})
            }else{
                done(null, false)
            }
        }).catch(e=>done(e, false))
    })
    passport.use(strategy);

    return{
        initialize:() => passport.initialize(),
        authenticate:() => passport.authenticate('jwt',{session:false}),
    }
}