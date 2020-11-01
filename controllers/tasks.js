const db= require('../config/db');
const moment =  require('moment');


exports.read = async (req, res) =>{
    const date = req.query.date ? req.query.date :
                moment().endOf('day').toDate();  
                
        await db('tasks')
            .where({userId:req.params.id})
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks =>res.status(200).json(tasks))
            .catch(err=>res.status(500).json(err))

}

exports.create = async (req, res)=>{

    if(req.body.desc == ''){
        res.status(400).json('Descrição é um campo obrigatório')
    }
    
    const oldId = req.params.id;

    const id = parseInt(oldId, 10)

    const task  = {
        desc:req.body.desc,
        estimateAt:req.body.estimateAt,
        doneAt:req.body.doneAt,
        userId:id
    }

    await db('tasks')
        .insert(task)
        .then(()=>res.status(200).json('criada'))
        .catch(err => res.status(500).json(err))


}

exports.update = async (req, res) =>{
    const taskId = req.body.taskId;
    const id = req.params.id;
    const newTask = {
        desc:req.body.desc,
        estimateAt:req.body.estimateAt,
        doneAt:req.body.doneAt,
        userId:id
    }

    const task = await db('tasks').select('*').where({id:taskId}).andWhere({userId:id})

    if(task.length !== 0 ){
        await db('tasks')
            .where({id:taskId})
            .update(newTask)
            .then(()=>res.status(200).json('tarefa atualizada'))
            .catch(err => res.status(500).json(err))
    }else{
        res.status(404).json('tarefa não existe')
    }

}
exports.remove = async (req, res) =>{
    const taskId = req.headers.task_id;
    const id = req.params.id;

    await db('tasks')
    .where({id:taskId})
    .andWhere({userId:id})
    .delete()
    .then(()=> res.status(200).send())
    .catch(err=>res.status(500).json(err));

    
}