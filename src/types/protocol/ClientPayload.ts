import { AuthenticatePayload } from './AuthenticatePayload'
import { ProcessStatusPayload } from './ProcessStatusPayload'
import { ExecutedPayload } from './ExecutedPayload'

export interface ClientPayload {
    data?: ClientDataPayload
    error?: ClientErrorPayload
}

interface ClientDataPayload {
    [key: string]: any
    publicKey?: string
    authenticate?: AuthenticatePayload
    processStatus?: Array<ProcessStatusPayload>
    executed?: Array<ExecutedPayload>
}

interface ClientErrorPayload {
    code: number
}
