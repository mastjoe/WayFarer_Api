module.exports  = {
    serverError(req, res, msg = 'An error occurred', status = 500) {
        res.status(status).json({
            status: 'error',
            error: msg
        });
    },

    notFoundError(req, res, msg = 'resource not found') {
        res.status(404).json({
            status: 'error',
            error: msg
        });
    },

    validationError(req, res,msg='a field is required or not right') {
        res.status(422).json({
            status: 'error',
            error: msg
        });
    }
}