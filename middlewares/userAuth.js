const db =  require('../config/db');


exports.isAuth = (req, res, next)=>{
    if(req.profile !== req.params.id){
        return res.status(400).json('usuário não autorizado')
    }
    next()
}




exports.userId = async (req, res, next, id) =>{
    try {
        const user = await db('users').select('*').where('id',id);
        req.profile = `${user[0].id}`
        next()
    } catch (error) {
        res.status(400).json('usuário não encontrado');
    }
    
}