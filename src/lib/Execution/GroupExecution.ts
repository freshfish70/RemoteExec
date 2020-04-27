import { ProcessState } from './ProcessState'
/**
 * A parent class for creating group executions, this will
 * provide the name, and description for the group executions.
 */
export class GroupExecution {
	// The name of the group execution
	private _name: string

	// The descrption of the group execution
	private _description: string

	constructor(name: string, description: string) {
		this._name = name
		this._description = description
	}

	public get name(): string {
		return this._name
	}

	public get description(): string {
		return this._description
	}
}
