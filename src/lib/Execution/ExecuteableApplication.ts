import { ProcessState } from './ProcessState'

/**
 * Represents an executeable application on a remote client
 */
export class ExecuteableApplication {
	// Unique id used to identify the execution
	private _eid: string = ''

	// The name of the process /executable
	private _name: string = ''

	// Description of the process, what it does?
	private _description: string = ''

	// The application to execute
	private _application: string = ''

	// The path on the remote system for the application
	private _path: string = ''

	// Arguments for the application
	private _arguments: string = ''

	// Delays in milliseconds
	private _delay: number = 0

	// The state of the process
	private _processState: ProcessState = ProcessState.STOPPED

	constructor(
		eid: string,
		name: string,
		description: string,
		application: string,
		path: string,
		args: string,
		delay: number
	) {
		this._eid = eid
		this._name = name
		this._description = description
		this.application = application
		this.path = path
		this.arguments = args
		this.delay = delay
	}

	public get eid(): string {
		return this._eid
	}

	public get name(): string {
		return this._name
	}

	public set name(name: string) {
		this._name = name
	}

	public get description(): string {
		return this._description
	}

	public set description(description: string) {
		this._description = this._description
	}

	public get application(): string {
		return this._application
	}

	public set application(v: string) {
		this._application = v
	}

	public get path(): string {
		return this._path
	}

	public set path(v: string) {
		this._path = v
	}

	public get arguments(): string {
		return this._arguments
	}

	public set arguments(v: string) {
		this._arguments = v
	}

	public get delay(): number {
		return this._delay
	}

	public set delay(v: number) {
		this._delay = v
	}

	public get processState(): ProcessState {
		return this._processState
	}

	public set processState(state: ProcessState) {
		this._processState = state
	}
}
