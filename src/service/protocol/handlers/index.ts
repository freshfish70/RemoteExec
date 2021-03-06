// actions
import setupHandler from './SetupHandler'
import publicKeyHandler from './PublicKeyHandler'
import authenticateHandler from './AuthenticateHandler'
import processStatusHandler from './ProcessStatusHandler'

import { Client } from '@/service/network/Client'
import { PayloadSender } from '@/types/Network/PayloadSender'

let payloadSender: PayloadSender

/**
 * Handler entry for authorized, and not authorized action possible for clients
 * connected.
 *
 * The client and payloads are passed automaticaly to the handlers if they require
 * it.
 * @param client client that is connected
 * @param payload the data payload from socket
 */
function handle(client: Client, payload: any) {
	/**
	 * Handlers for authorized actions
	 */
	const authorizedHandlers = {
		setup: () => setupHandler(client, payload),
		processStatus: () => processStatusHandler(client, payload),
	}

	/**
	 * Handlers for pre-authorization actions
	 */
	const preauthorizedHandlers = {
		publicKey: () => publicKeyHandler(client, payload),
		authenticate: () => authenticateHandler(client, payload),
	}

	/**
	 * Validates the client if authenticated, returns the
	 * authorized handlers if authorized, else nothing.
	 */
	function authorizedAction() {
		if (client.isAuthenticated()) {
			return authorizedHandlers
		}
	}

	/**
	 * Validates the client if not-authenticated and is handshaking, returns the
	 * preautorized handlers if handshaking, else nothing.
	 */
	function preauthorizeAction() {
		if (!client.isAuthenticated()) {
			return preauthorizedHandlers
		}
	}

	return {
		authorizedAction,
		preauthorizeAction,
	}
}

export default function(sender: PayloadSender) {
	payloadSender = sender
	return handle
}
