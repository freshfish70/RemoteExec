import { ProcessState } from '@/lib/Execution/ProcessState'

/**
 * Represents the state for a specific clients process
 */
export interface ClientProcessState {
	clientId: string
	eid: string
	state: ProcessState
}
