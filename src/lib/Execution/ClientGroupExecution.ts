import { GroupExecution } from './GroupExecution'
import { Executable } from './Executable'
import { ProcessState } from './ProcessState'

/**
 * Holds all executables for a client group exectuion.
 * It is possible to add and remove executables
 */
export class ClientGroupExecution extends GroupExecution {
	// All the executables that is controlled by this group execution
	private _executables: Set<Executable> = new Set()

	constructor(name: string, description: string) {
		super(name, description)
	}

	/**
	 * Returns all the executables for this group execution group
	 */
	public get executables(): Set<Executable> {
		return this._executables
	}

	/**
	 * Returns the state of the overal processes state.
	 * If all processes are stopped/terminated returns: STOPPED
	 * If there are > 0 processes started/running returns: STARTED
	 * or when all processes are started/running returns: RUNNING
	 */
	public get state(): ProcessState {
		let state: ProcessState
		let notRunning = 0
		let numberOfExecutables = this._executables.size

		for (const iterator of this._executables.values()) {
			switch (iterator.executableApplication.processState) {
				case ProcessState.STOPPED:
				case ProcessState.TERMINATED:
					notRunning++
					break
			}
		}

		if (notRunning == numberOfExecutables) state = ProcessState.STOPPED
		else if (notRunning > 0) state = ProcessState.STARTED
		else {
			state = ProcessState.RUNNING
		}
		return state
	}

	/**
	 * Adds an executable to the client group execution
	 * @param executable the executable to add
	 */
	public addExecutable(executable: Executable) {
		this._executables.add(executable)
	}

	/**
	 * Removes the provided executable
	 * @param executable the executable to remove
	 */
	public removeExecutable(executable: Executable) {
		this._executables.delete(executable)
	}
}
