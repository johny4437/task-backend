const moment =  require('moment');
const { update } = require('../config/db');
const knex = require('../config/db');

module.exports = app =>{
    const getTasks = async (req, res) =>{
        const date = req.query.date ? req.query.date 
        : moment().endOf('day').toDate();
        
        await knex('tasks')
                .where({userId:req.user.id})
                .where('estimateAt','<=', date)
                .orderBy('estimateAt')
                .then(task =>res.status(200).json(task))
                .catch(e => res.status(500).json(e))
    }
    const save = async  (req, res) => {
        
        if(req.body.desc !== ""){
            req.body.userId = req.user.id
            await knex('tasks')
                .insert(req.body)
                .then(()=>res.status(204).json('tarefa criada..'))
                .catch(e => res.status(500).json(e))

        }else{
            res.status(400).json('é obrigatório inserir uma descrição..')
        }
    }

    const remove = async (req, res) =>{
        await knex('tasks')
            .where({id: req.params.id, userId: req.user.id})
            .delete()
            .then(()=>res.status(204).send())
            .catch(e=> res.status(500).json(e))
    }
    const updateTaskDoneAt = async (req, res, doneAt) =>{
        await knex('tasks')
        .where({id:req.params.id, userId:req.user.id })
        .update({doneAt})
        .then(()=>res.status(200).json('tarefa atualizada'))
        .catch(e=>res.status(500).json(e));   
    }

    const toggleTask = async (req, res) =>{
        await knex('tasks')
        .where({id:req.params.id, userId:req.user.id })
        .first()
        .then(task=>{
            if(!task){
                const msg =  `Task com ${req.params.id} não existe`;
                res.status(400).send(msg)
            }
            const doneAt = task.doneAt ? null : new Date();
            updateTaskDoneAt(req,res, doneAt)
        })
        .catch(e=>res.status(500).json(e)); 
    }

    return{ getTasks, remove, toggleTask, save}
}
