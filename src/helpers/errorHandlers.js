module.exports  = {
    serverError(req, res, msg = 'An error occurred', status = 500) {
        res.status(status).json({
            status: 'error',
            error: msg
        });
    },
}