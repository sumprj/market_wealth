//Use import and export

import * as bcrypt from 'bcrypt';

function hashPassword(password: string) {
	const saltRounds = 10;
	return bcrypt.hashSync('demorm', saltRounds);
}

export { hashPassword };