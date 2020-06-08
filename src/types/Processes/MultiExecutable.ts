import { Application } from './Application'

export interface MultiExecutable {
	name: string
	description: string
	executables: Array<{
		id: string
		executableApplication: Application
		delay: number
	}>
}
