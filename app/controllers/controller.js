const sendSuccess = (res, data, message = 'success') => {
    return res.status(200).json( {
        message: message,
        data: data
    })
}

const sendError = (res, message = 'internal server error') => {
    return res.status(500).json({
        message: message
    })
}

module.exports = {
    sendError,
    sendSuccess
}