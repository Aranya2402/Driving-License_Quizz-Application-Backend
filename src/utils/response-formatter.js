function SuccessResponse( data ) {
    return {
        status: true,
        data
    }
}

function ErrorResponse( err ) {
    return {
        status: false,
        ...( Array.isArray( err ) ? { errors: err } : { error: err }),
    }
}

module.exports = {
    SuccessResponse,
    ErrorResponse
}
