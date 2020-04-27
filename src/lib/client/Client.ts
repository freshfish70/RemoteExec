import { ExecuteableApplication } from '../Execution/ExecuteableApplication'
import { IpAddresses } from '../Network/IpAddresses'

/**
 * A client is a remote machine that is connected or has been connected
 * to the service. This is the representation of the actual client aka
 * data that is to be displayed in the application, and saved to storage. This client
 * has nothing to do with networking.
 */
export class Client {
	// The name of the client, provided by the remote client
	private _name: string = 'New client'
	// Unique id of the client, generated by the client to identify, this id should never change when
	// it is first created by the client.
	private _id: string = ''
	// The two different IP addresses for the client
	private _ipAddresses: IpAddresses = {
		ipv4: '',
		ipv6: '',
	}
	// Timestamp (ISOstring) of when the client was first seen/connected
	private _firstSeen: string = ''
	// Timestamp (ISOstring) of when the client last connected
	private _lastSeen: string = ''
	// List of all the avaiable folders that we are allowed
	// to execute application is, provided by the remote client
	private _validExecutionFolders: Array<string> = []
	// List of all the created executable applications for this client
	private _executions: Array<ExecuteableApplication> = []
	//State flag for connection, true if client is connected
	private _connected: boolean = false

	constructor(name?: string, id?: string) {
		if (name) this.name = name
		if (id) this.id = id
	}

	public get name(): string {
		return this._name
	}

	public set name(v: string) {
		this._name = v
	}

	public get id(): string {
		return this._id
	}

	public set id(v: string) {
		this._id = v
	}

	public get ipAddresses(): IpAddresses {
		return this._ipAddresses
	}

	public set ipAddresses(v: IpAddresses) {
		this._ipAddresses = v
	}

	public get firstSeen(): string {
		return this._firstSeen
	}

	public set firstSeen(v: string) {
		this._firstSeen = v
	}

	public get lastSeen(): string {
		return this._lastSeen
	}

	public set lastSeen(v: string) {
		this._lastSeen = v
	}

	public get validExecutionFolders(): Array<string> {
		return this._validExecutionFolders
	}

	public set validExecutionFolders(v: Array<string>) {
		this._validExecutionFolders = v
	}

	public get executions(): Array<ExecuteableApplication> {
		return this._executions
	}

	public set executions(v: Array<ExecuteableApplication>) {
		this._executions = v
	}

	public get connected(): boolean {
		return this._connected
	}

	public set connected(v: boolean) {
		this._connected = v
	}
}
