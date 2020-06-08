import { ProcessState } from '@/lib/Execution/ProcessState'

/**
 * Represents the state for a specific clients process
 */
export interface ClientProcessState {
	clientId: string
	eid: string
	state: ProcessState
}

export interface ProcessIdentifierState {
	eid: string
	state: ProcessState
}

export interface ClientProcessesState {
	clientId: string
	processes: Array<ProcessIdentifierState>
}
