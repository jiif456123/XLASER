const response = {

    create: (req, res, code, data) => {

        let result = {
            ok: true,
        };

        if (data) {
            result.message = data
        }

        res.status(code).json(result);
    },


    ok: (req, res, code, data) => {

        let result = {
            ok: true,
        };

        if (data) {
            result.data = data
        }

        res.status(code).json(result);
    },

    err: (req, res, code, message, err) => {

        let error = {
            ok: false,
            message: message
        };

        if (err) {
            error.exception = err
        }

        res.status(code).json(error);

    }
}

module.exports = response;