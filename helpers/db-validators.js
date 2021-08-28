const Role = require('../models/role');

const isRoleValidator = async(role = '') =>{
	const isRole = await Role.findOne({role});
	if(!isRole){
		throw new Error(`El rol ${role} no está registrado en la BD`)
	}
}

module.exports = {
	isRoleValidator
}