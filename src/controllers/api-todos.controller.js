const { Router } = require('express');
const ErrorResponse = require('../classes/error-response');
const ToDo = require('../dataBase/models/ToDo.model');
const { asyncHandler, requireToken } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.post('/', asyncHandler(requireToken),asyncHandler(createToDo)); 
    router.get('/', asyncHandler(requireToken), asyncHandler(getToDos));
    router.get('/:id', asyncHandler(requireToken),asyncHandler(getToDoById));
    router.patch('/:id', asyncHandler(requireToken),asyncHandler(updateToDoById));
    router.delete('/:id', asyncHandler(requireToken),asyncHandler(deleteToDoById));
    router.delete('/', asyncHandler(requireToken),asyncHandler(deleteToDos));
}

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll({where:{
        user_id: req.token.user_id
    }});

    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.body.id);

    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(todo);
}
async function createToDo(req, res, next) { 
    const todo = await ToDo.create({ body: req.body, user_id: req.token.user_id});
    res.status(200).json(todo);
}
async function updateToDoById(req, res, next) {

    const updateToDo = await ToDo.update({ body: req.body}, {
        where: {
            id: req.body.id,
            user_id: req.token.user_id
        }
      });

    if (!updateToDo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json(updateToDo);
}
async function deleteToDoById(req, res, next) {

    const deleteToDo = await ToDo.destroy({
        where:{
            id: req.body.id,
            user_id: req.token.user_id
    }});

    if (!deleteToDo) {
        throw new ErrorResponse('No todo found', 404);
    }

    res.status(200).json({message: 'ToDo deleted successfully'});
}
async function deleteToDos(req, res, next) {

    await ToDo.destroy({
        where: {
            user_id: req.token.user_id
        }
    });
    
    res.status(200).json({message: 'All ToDos deleted successfully'});
}

initRoutes();

module.exports = router;