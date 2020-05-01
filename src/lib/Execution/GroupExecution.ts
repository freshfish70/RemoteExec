import { ProcessState } from './ProcessState'
import { v4 as uuidv4 } from 'uuid'
/**
 * A parent class for creating group executions, this will
 * provide the name, and description for the group executions.
 */
export class GroupExecution {
	private _id: string = uuidv4()
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

	public set name(name: string) {
		this._name = name
	}

	public get description(): string {
		return this._description
	}

	public set description(description: string) {
		this._description = description
	}

	public get id(): string {
		return this._id
	}
}
