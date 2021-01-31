import { RawCreds } from './types';

export const tryLogin = async ([username, password]: RawCreds): Promise<boolean> => {
	const encodedCreds = btoa(`${username}:${password}`);
	const data = { payload: encodedCreds };

	const res = await fetch('api/auth/login', {
		method: 'POST',
		mode: 'same-origin',
		body: JSON.stringify(data),
	});

	if (res.ok) return true;
	return false;
};
