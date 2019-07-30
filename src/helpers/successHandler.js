module.exports = {
    successReport(req, res, msg){
        res.status(201).json({
            status: 'success',
            data: msg
        });
    },

    successMessageReport(req, res, msg = 'operation was successful') {
        res.status(200).json({
            status: 'success',
            data: {
                message: msg
            }
        });
    },

    okSuccessReport (req, res, msg) {
        res.status(200).json({
            status: 'success',
            data: msg
        });
    }
}