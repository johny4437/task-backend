const jwt =  require('jwt-simple');
const {comparePassword} = require('../config/decrypt')
require('dotenv').config();
const knex = require('../config/db')
module.exports = app =>{
    const singin = async(req, res) =>{
        const { email, password } = req.body;
        if(email !== "" && password !== "" ){
            const user  = await knex('users').select('*').where('email', email);
            if(user.length === 0 ){
                res.status(400).json('usuário não cadastrado')
            }else{
                if(!(comparePassword(password, user[0].password ))){
                    res.json('senha incorreta')
                }
                const payload = { id: user[0].id };

                res.json({
                    name:user[0].name,
                    email:user[0].email,
                    token:jwt.encode(payload, process.env.JWT)
                })
            }
        }else{
            res.json('é necessário inserir todos os dados')
        }
    }

    const login = (req, res) =>{
        
    }

    return {singin}
}
