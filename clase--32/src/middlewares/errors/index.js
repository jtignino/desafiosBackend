import EErrors from './enums.js';

export default (error, req, res, next) => {
    console.log('error code: ' + error.code)
    switch(error.code) {
        case EErrors.INVALID_TYPE_ERROR:
            res.status(400).send({
                status: 'error',
                error: error.name,
                description: error.cause
            });
            break;

        default:
            res.status(500).send({
                status: 'error',
                error: error.name,
                description: 'error default message'
            });
            break;
    }

    next();
}