/**
 * Represents a tree structure of a files and folders
 */
export type ExecutableTree = {
	path: string
	files: [string]
	folders: [ExecutableTree]
}
