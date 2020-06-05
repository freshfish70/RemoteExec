import { DataPayload } from './DataPayload'
import { ErrorPayload } from './ErrorPayload'

/**
 * Type for classes that is responsible for sending a payload to
 * clients with an ID.
 */
export interface PayloadSender {
	/**
	 *	Sends a data packet to the socket with provided id
	 * @param id id of the socket receiver
	 * @param data data payload to send
	 */
	sendPayload(id: string, data: DataPayload | ErrorPayload): void
}
