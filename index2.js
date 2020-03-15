const nas = require('tweetnacl')
nas.util = require('tweetnacl-util')

const box = nas.box
const randomBytes = nas.randomBytes
const decodeUTF8 = nas.util.decodeUTF8,
	encodeUTF8 = nas.util.encodeUTF8,
	encodeBase64 = nas.util.encodeBase64,
	decodeBase64 = nas.util.decodeBase64

const newNonce = () => randomBytes(box.nonceLength)
const generateKeyPair = () => box.keyPair()

const encrypt = (secretOrSharedKey, json, key) => {
	const nonce = newNonce()
	const messageUint8 = decodeUTF8(JSON.stringify(json))
	const encrypted = key
		? box(messageUint8, nonce, key, secretOrSharedKey)
		: box.after(messageUint8, nonce, secretOrSharedKey)

	const fullMessage = new Uint8Array(nonce.length + encrypted.length)
	fullMessage.set(nonce)
	fullMessage.set(encrypted, nonce.length)

	const base64FullMessage = encodeBase64(fullMessage)
	return base64FullMessage
}

const decrypt = (secretOrSharedKey, messageWithNonce, key) => {
	const messageWithNonceAsUint8Array = decodeBase64(messageWithNonce)
	const nonce = messageWithNonceAsUint8Array.slice(0, box.nonceLength)
	const message = messageWithNonceAsUint8Array.slice(
		box.nonceLength,
		messageWithNonce.length
	)
	console.log(message)

	const decrypted = key
		? box.open(message, nonce, key, secretOrSharedKey)
		: box.open.after(message, nonce, secretOrSharedKey)

	if (!decrypted) {
		throw new Error('Could not decrypt message')
	}

	const base64DecryptedMessage = encodeUTF8(decrypted)
	return JSON.parse(base64DecryptedMessage)
}

var io = Require('socket.io-client')
var socket = io.connect('http://localhost:1487', { reconnect: true })

// Add a connect listener
socket.on('connect', function(socket) {
	console.log('CLIENT CONNECTION!')
})

let key = ''
const pairB = generateKeyPair()
let sharedB
// const decrypted = decrypt(sharedB, encrypted)

socket.on('welcome', data => {
	key = data
	// cons
	socket.emit('pubkey', pairB.publicKey)
})

socket.on('sendEncrypt', () => {
	et()
})

function et(params) {
	setInterval(() => {
		const obj = { hello: 'world' }
		socket.emit(
			'encrypted',
			encrypt(
				pairB.secretKey,
				obj,
				new Uint8Array(Object.values(key.key))
			)
		)
	}, 1000)
}
