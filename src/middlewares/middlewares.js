const ErrorResponse = require("../classes/error-response");
const Token = require('../dataBase/models/Token.model');
var validate = require('uuid-validate');

const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const syncHandler = (fn) => (req, res, next) => {
    try {
        fn(req, res, next);
    } catch (error) {
        next(error);
    }
};

const notFound = (req, _res, next) => {
    next(new ErrorResponse(`Not found - ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
    console.log('Ошибка', {
        message: err.message,
        stack: err.stack,
    });
    res.status(err.code || 500).json({
        message: err.message
    });
};

const requireToken = async(req, res, next) => {

    const token = req.get('token');
  
    const _token = await Token.findOne({where: {value: token}});
    
    if(!_token) {
        throw new ErrorResponse('No todo found', 404);
    }

    if(!validate(_token.value)){
        await _token.destroy();
        throw new ErrorResponse('Bad token', 404);
    }
    
    req.token = _token;
    
    next();
};

module.exports = {
    asyncHandler,
    syncHandler,
    notFound,
    errorHandler,
    requireToken,
};