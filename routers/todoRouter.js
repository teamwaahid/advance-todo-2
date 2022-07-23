const { Router } = require('express');
const {
  addnewTaskHandler,
  deleteTaskHandler,
  updateStatusHandler,
  updateTaskHandler,
} = require('../controllers/todo/todoControllers');
const { authChecker } = require('../middlewares/auth/authMiddleware');
const todoRouter = Router();

// add a new task
todoRouter.post('/addnewTask', authChecker, addnewTaskHandler);

// delete a task
todoRouter.get('/deleteTask/:taskId', authChecker, deleteTaskHandler);

// update a task status
todoRouter.get('/updateStatus/:taskId', authChecker, updateStatusHandler);

// update a task status
todoRouter.post('/updateTask', authChecker, updateTaskHandler);

module.exports = todoRouter;
