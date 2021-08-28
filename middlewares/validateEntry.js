const { validationResult } = require('express-validator');

const validateEntry = (req, res, next) => {


    //Validar campos

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next();

}

module.exports = {
	validateEntry
}