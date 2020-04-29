import Vue from 'vue'
import Component from 'vue-class-component'
import { ProcessState } from '@/lib/Execution/ProcessState'

/**
 * Mixin with helper methods regarding process states, names, css classes etc.
 */
@Component
export default class ProcessMixin extends Vue {
	/**
	 * Returns the process state name
	 * @param processState state of the process
	 */
	getStateNameString(processState: ProcessState): string {
		return ProcessState[processState]
	}

	/**
	 * Returns a background class name based on process state
	 * Green/yellow/red background class name
	 */
	getProcessStateBackgroundColor(state: ProcessState): string {
		let stateClass = ''
		switch (state) {
			case ProcessState.RUNNING:
				stateClass = 'green-background'
				break
			case ProcessState.STARTED:
				stateClass = 'yellow-background'
				break
			default:
				stateClass = 'red-background'
				break
		}
		return stateClass
	}

	/**
	 * Returns a text color class name based on process state
	 * Green/yellow/red text color class name
	 */
	getProcessStateTextColor(state: ProcessState): string {
		let stateClass = ''
		switch (state) {
			case ProcessState.RUNNING:
				stateClass = 'green-color'
				break
			case ProcessState.STARTED:
				stateClass = 'yellow-color'
				break
			default:
				stateClass = 'red-color'
				break
		}
		return stateClass
	}

	/**
	 * Returns true if a process is STOPPED, TERMINATED or UNKNOWN
	 * @param state process state to validate
	 */
	canStartProcess(state: ProcessState): boolean {
		switch (state) {
			case ProcessState.RUNNING:
			case ProcessState.STARTED:
				return false
			default:
				return true
		}
	}
}
