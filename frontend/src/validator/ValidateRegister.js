function Validate(register) {
	const errors = {};

	if (!register.name) {
		errors.name = 'Nome é necessário';
	}
	if (register?.name?.length > 60) {
		errors.name = 'Nome é longo demais';
	}

	if (!register.password) {
		errors.password = 'Senha é necessária';
	}
	if (register?.password?.length <= 8) {
		errors.password = 'Senha deve ter pelo menos 8 dígitos';
	}

	if (!register.passwordConfirm) {
		errors.passwordConfirm = 'Confirmação de senha é necessária';
	}
	if (register.passwordConfirm !== register.password) {
		errors.passwordConfirm = 'A confirmação de senha deve ser igual a senha';
	}

	if (!register.email) {
		errors.email = 'Email é necessário';
	}
	if (register?.email?.length > 60) {
		errors.email = 'Email é longo demais';
	}
	const regexEmail =
		/^(\S+)@((?:(?:(?!-)[a-zA-Z0-9-]{1,62}[a-zA-Z0-9])\.)+[a-zA-Z0-9]{2,12})$/;
	if (!regexEmail.test(register.email)) {
		errors.email = 'Email deve ser valido';
	}

	return errors;
}

export default Validate;
