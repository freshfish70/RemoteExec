// const Store = require('electron-store');

import EStore from 'electron-store'

/**
 * Store for regular configuration
 * Does not need protection.
 */
const configStorage = new EStore({ name: 'config' })

export { configStorage }
