module.exports = app =>{
    app.post('/singup', app.api.user.save)
    app.post('/singin', app.api.auth.singin)

    app.route('/tasks')
    .all(app.config.passport.authenticate())
    .get(app.api.task.getTasks)
    .post(app.api.task.save)
    

    app.route('/tasks/:id')
    .all(app.config.passport.authenticate())
    .delete(app.api.task.remove)
    
    app.route('/toggle/:id/tasks')
    .all(app.config.passport.authenticate())
    .put(app.api.task.toggleTask)
}
