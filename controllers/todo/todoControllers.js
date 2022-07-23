const Todo = require("../../models/Todo");

async function addnewTaskHandler(req, res) {
   try {
       const { taskname, priority, date } = req.body;
       const todo = new Todo({
           taskname,
           priority,
           date,
           status: "pending",
           user: req.email
       })
       const result = await todo.save()
       if (result) {
         return  res.redirect('/')
       }

   } catch (error) {
        throw error
   }
}


async function deleteTaskHandler(req, res) {
    try {

        const taskId = req.params.taskId;
        const result = await Todo.findOneAndDelete({ _id: taskId, user: req.email });
        if (result) {
            return    res.redirect('/')
        }
        
    } catch (error) {
        throw error
    }
    
}

async function updateStatusHandler(req, res) {
    try {

        const taskId = req.params.taskId;


const task = await Todo.findOne({
    _id: taskId,
    user: req.email
})

        const status = task.status === "pending" ? "completed" : "pending";

        const result = await Todo.findOneAndUpdate({
            _id: taskId,
            user: req.email
        },
            {
                $set: {
                    status
                }
            }
        );
        if (result) {
            return    res.redirect('/')
        }
        
    } catch (error) {
        throw error
    }
    
}


async function updateTaskHandler(req, res) {
    try {
        const { taskname, priority, date, id } = req.body;

        const result = await Todo.findOneAndUpdate({
            _id: id,
            user: req.email
        }, {
            $set: {
                taskname, 
                priority,
                date,
            }
        })

      res.redirect('/')

    } catch (error) {
        throw error
    }
    
}




module.exports = {
    addnewTaskHandler,
    deleteTaskHandler,
    updateStatusHandler,
    updateTaskHandler
}