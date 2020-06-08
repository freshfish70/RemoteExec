import { IpAddresses } from '../Network/IpAddresses'
import { ExecutableTree } from '@/types/Clients/ExecutableTree'
import { MultiExecutable } from '@/types/Processes/MultiExecutable'

export type StoredClient = {
	name: string
	id: string
	ipAddresses: IpAddresses
	firstSeen: string
	lastSeen: string
	validExecutionFolders: Array<ExecutableTree>
	groupExecutions: Array<MultiExecutable>
}
