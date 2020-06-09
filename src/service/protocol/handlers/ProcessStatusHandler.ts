import { Client } from '@/service/network/Client'
import ClientStoreBinder from '@/service/binder/ClientStoreBinder'
import { ProcessState } from '@/lib/Execution/ProcessState'
import { ProcessIdentifierState } from '@/types/Execution/ClientProcessState'

type ProcessStatusPayload = [
	{
		id: string
		state: ProcessState
		message: string
	}
]

export default (client: Client, payload: ProcessStatusPayload) => {
	let processes: Array<ProcessIdentifierState> = []

	for (const processStatus of payload) {
		processes.push({
			eid: processStatus.id,
			state: processStatus.state,
		})
	}

	ClientStoreBinder.updateProcessStatusForClient({
		clientId: client.id,
		processes,
	})
}
