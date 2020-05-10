module.exports = (err,req,res,next) => {
    let statusCode = 500;
    let errorCode = 'INTERNAL SERVER ERROR';
    let message = 'Internal Server Error';

    if(err.name === "SequelizeValidationError"){
        errorObj = {}
        for (let i = 0; i < err.errors.length; i++) {
            errorObj[err.errors[i].path] = err.errors[i].message
        }
        statusCode = 400
        errorCode = 'VALIDATION_ERROR'
        message = errorObj
    }else if(err.name === 'Invalid email/password'){
        statusCode = 400
        errorCode = 'INVALID_EMAIL_OR_PASSWORD'
        message = 'Invalid email / password'
    }else if(err.name === "SequelizeUniqueConstraintError"){
        statusCode = 400
        errorCode = 'UNIQUE_CONSTRAINT_ERROR'
        message = {email: 'Email address already in use!' }
    }else if(err.name === 'Data not found' || err.name === 'Token not found'){
        statusCode = 404
        errorCode = 'DATA_NOT_FOUND'
        message = err.name
    }else if(err.name === 'Forbidden Access'){
        statusCode = 403
        errorCode = 'FORBIDDEN_ACCESS'
        message = err.name
    }

    res.status(statusCode).json({errorCode, message})
}