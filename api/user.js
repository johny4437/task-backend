const {hashPassword} = require('../config/decrypt');
const knexv= require('../config/db');
const knex = require('../config/db');
module.exports = app =>{
    const save = async (req ,res) =>{
        const password = hashPassword(req.body.password).hash;
        const userInformation = await knex('users').select('*').where({email:req.body.email});
        if(userInformation.length === 0){
            await knex('users')
                .insert({
                    name:req.body.name,
                    email:req.body.email,
                    password:password
                })
                .then(()=>res.status(204).send())
                .catch(err=>res.status(500).json(err))
        }else{
            res.status(400).json('usuário já existe')
        }
        
    }
    return {save}
}