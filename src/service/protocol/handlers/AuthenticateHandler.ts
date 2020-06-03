import { Client } from '@/service/network/Client'

const password = 'topsecret' // !TEMPORARY

type AuthenticationVerification = {
	accapted: boolean
	message: string
}

/**
 * Creates an authentication response depending on if the verification
 * was successfull or not, returns the message
 * @param verified flag true if password is correct, else false
 */
function createAuthenticationResponse(
	verified: boolean
): AuthenticationVerification {
	let response: AuthenticationVerification = {
		accapted: verified,
		message: 'Password is wrong',
	}

	if (verified) {
		response.message = 'Authenticated'
	}
	return response
}

export default (client: Client, payload: any) => {
	const verified = payload == password

	if (verified) {
		client.setAuthenticated()
	}

	client.socket.write({
		data: {
			verification: createAuthenticationResponse(verified),
		},
	})
}
