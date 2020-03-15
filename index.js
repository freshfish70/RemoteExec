const nas = require('tweetnacl')
nas.util = require('tweetnacl-util')

const io = require('socket.io')
const server = io.listen(1487)

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
	console.log(nonce)

	const decrypted = key
		? box.open(message, nonce, key, secretOrSharedKey)
		: box.open.after(message, nonce, secretOrSharedKey)

	if (!decrypted) {
		throw new Error('Could not decrypt message')
	}

	const base64DecryptedMessage = encodeUTF8(decrypted)
	return JSON.parse(base64DecryptedMessage)
}

server.on('connection', function(socket) {
	console.log('SERVER GOT CONNECTION')

	const obj = { hello: 'world' }
	const pairA = generateKeyPair()
	let sharedA

	let bkey = ''
	const sharedA = box.before(pairB.publicKey, pairA.secretKey)
	// const encrypted = encrypt(sharedA, obj)

	socket.emit('welcome', { key: pairA.publicKey })

	socket.on('pubkey', data => {
		bkey = Object.values(data)
		socket.emit('sendEncrypt')
	})

	socket.on('encrypted', data => {
		console.log(data)
		const decrypted = decrypt(pairA.secretKey, data, new Uint8Array(bkey))
		console.log(decrypted)
	})
})
