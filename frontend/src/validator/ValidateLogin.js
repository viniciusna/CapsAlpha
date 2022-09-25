function Validate(login) {
	const errors = {};
	if (!login.email) {
		errors.email = 'Email é necessário';
	}
	if (!login.password) {
		errors.password = 'Senha é necessária';
	}

	return errors;
}

export default Validate;
