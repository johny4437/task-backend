const db =  require('../config/db');
const { hashPassword, comparePassword} = require('../config/decrypt')
const jwt = require('jsonwebtoken');



exports.singup = async (req, res) =>{

    const hash = hashPassword(req.body.password)
    const password = hash.hash
    const { name, email } =  req.body;

    if(name !== '' && email !== '' ){
        const data = await db('users').select('*').where('email', email);
        
        if(data.length === 0 ){
            return db('users').insert({name: name, email:email, password:password})
                    .then(()=>res.status(204).send())
                    .catch(err=> res.status(400).json(err))
        }else{
            return res.status(400).json('email já cadastrado')
        }
    }else{
        res.json('insira todos os dados')
    }
}



exports.singin = async (req, res) =>{
    const { email, password } = req.body;

    if(email !== "" && password !== '' ){
        const user  = await db('users').select('*').where('email', email);
        if(user.length === 0 ){
            res.status(400).json('usuário não cadastrado')
        }else{
            if(!(comparePassword(password, user[0].password ))){
                res.json('senha incorreta')
            }
            
            const token =  jwt.sign({id:user[0].id}, process.env.JWT)
            res.cookie('t', token, {expire:new Date() + 8888})

            res.status(200).json({ user, token })
        }
    }else{
        res.json('é necessário inserir todos os dados')
    }
}