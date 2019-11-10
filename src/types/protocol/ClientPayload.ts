import { AuthenticatePayload } from './AuthenticatePayload'
import { ProcessStatusPayload } from './ProcessStatusPayload'
import { ExecutedPayload } from './ExecutedPayload'
import { PublicKeyPayload } from './PublicKeyPayload'

export interface ClientPayload {
    data?: ClientDataPayload
    error?: ClientErrorPayload
}

interface ClientDataPayload {
    [key: string]: any
    publicKey?: PublicKeyPayload
    authenticate?: AuthenticatePayload
    processStatus?: Array<ProcessStatusPayload>
    executed?: Array<ExecutedPayload>
}

interface ClientErrorPayload {
    code: number
}
