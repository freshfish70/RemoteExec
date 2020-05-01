import { ExecuteableApplication } from './ExecuteableApplication'
import { ProcessState } from './ProcessState'
import { v4 as uuidv4 } from 'uuid'

/**
 * An executable is an extension of an executable application for
 * adding additional fields to idividual execution groups, like Delay.
 * Each Exectuable gets and Unique id when created.
 */
export class Executable {
	/**
	 * Unique id for this executable
	 */
	private _id: string = uuidv4()

	/**
	 * The executable application that should be executed
	 */
	private _executableApplication: ExecuteableApplication

	/**
	 * Time in milliseconds before this executable should start
	 */
	private _delay: number = 0

	constructor(
		executableApplication: ExecuteableApplication,
		delay: number = 0
	) {
		this._executableApplication = executableApplication
		this._delay = delay
	}

	public get id(): string {
		return this._id
	}

	public set delay(delay: number) {
		this._delay = delay
	}

	public get delay(): number {
		return this._delay
	}

	public get executableApplication(): ExecuteableApplication {
		return this._executableApplication
	}
}
