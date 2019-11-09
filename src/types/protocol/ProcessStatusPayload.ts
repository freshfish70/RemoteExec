export interface ProcessStatusPayload {
	id: number
	state: 'exited' | 'closed' | 'running'
	message: string
}
