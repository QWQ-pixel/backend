const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/',asyncHandler(createToDo)); 
    router.get('/', asyncHandler(getToDos));
    router.get('/:id', asyncHandler(getToDoById));
    router.patch('/:id', asyncHandler(updateToDo));
    router.delete('/:id', asyncHandler(deleteToDo));
    router.delete('/', asyncHandler(deleteToDos));
}

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll();

    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(todo);
}
async function createToDo(req, res, next) { 
    const todo = await ToDo.create(req.params.title, req.params.isCompleted);
    res.status(200).json(todo);
}
async function updateToDo(req, res, next) {
    const updateToDo = await ToDo.update(req.params.id);

    if (!updateToDo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(updateToDo);
}
async function deleteToDo(req, res, next) {
    const deleteToDo = await ToDo.destroy(req.params.id);
    if (!deleteToDo) {
        throw new ErrorResponse('No todo found', 404);
    }
    res.status(200).json(deleteToDo);
}
async function deleteToDos(req, res, next) {
    const deleteToDos = await ToDo.destroyAll();
    res.status(200).json(deleteToDos);
}
initRoutes();

module.exports = router;