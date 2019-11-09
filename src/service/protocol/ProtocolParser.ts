import { ClientPayload } from '@/types/protocol/ClientPayload'
import { Client } from '../network/Client'

export class ProtocolParser {
    /**
     * All command actions
     */
    private _actions: Map<string, (payload: any) => void> = new Map()

    /**
     * Adds an action to the action pool
     * @param action name of the action (key to respond to	)
     * @param callable the function to execute
     * @throws Error thrown if an action is already registered with name
     */
    public registerActions(action: string, callable: (payload: any) => void) {
        if (this._actions.has(action))
            throw new Error(`Action "${action}" is already defined.`)

        this._actions.set(action, callable)
    }

    /**
     * Parses the payload recieved by a client
     * @param client The client the package came from
     * @param payload the payload recieved by client
     */
    public parse(clientid: string, payload: ClientPayload): void {
        //TODO HANDLE CLIENT DATA
        if (payload.error) {
            console.error('package error')
        } else if (payload.data) {
            const identifier: string = Object.keys(payload.data)[0]
            const message = payload.data[identifier]
            const callable = this._actions.get(identifier)
            if (callable) callable(message)
        }
    }
}
