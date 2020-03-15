This document describes the communication between client and server.
The server is the RemoteExec application, where the client is an application implementing the protocol and all related communication dependencies described in this document.

[TOC]

# Network

**Network protocols:** TCP/IP

## First transmissions

The client is responsible for initiating the authentication process.
Failing to do so before 10 seconds after TCP handshake is complete will result in socket termination.

**Authentication process:**

[IMG HERE]

## Remote Exec Protocol

The remote exec application stack uses its own protocol above TCP.
Any data exchange between server<-->client (Remote Exec stack) must comply with the protocol to be able to successfully communicate.

### Pseudo header

```
1            4            8             12            16
[  LENGTH   ][               RESERVED                 ]
[                          DATA                       ]
```

### Definitions

-   **Length**

    -   4 Bytes - 32 Bit unsigned integer

-   **Data**

    -   Max size 2^17 = 131072 Bytes = 128KB

    -   Data exceeding this size must be denied

    -   Format

        -   [JSON](https://www.json.org/)

## JSON as data

The data type for messages exchanged between server<-->client must be done with JSON
JSON is available in all major programming languages and is a commonly used format for storing and transporting data.

<u>Why JSON?</u> Since the application(server) is written in JavaScript the natural choice was JSON. JavaScript has built-in JSON parsing which evaluates to native JavaScript objects.

### General structure

#### Data

The structure for sending data.

```JSON
"data": {
  // FIELDS
}
```

#### Error

The structure sending error messages.
The error codes can be viewed here: [Error codes](#error-codes)

```JSON
"error": {
  "code": // Error code
}
```

### Valid data fields

#### Server

Packets sent only from server

##### Execute

**Request**:

```JSON
"execute" : [
  {
    "id": 10 //int
    "name": "process name",
    "delay": 1000, //Time in milliseconds before execution
    "application": "process.exe"
    "path": "C:/folder/folder2/",
    "arguments": ["arg1", "arg2"],
  }
]
```

**Response**:

```JSON
"executed": [
    {
        "id": 10
        "started": true/false
        "message": "feedback message"
    }
]
```

**Request**:

```JSON
"" : {
}
```

**Response**: NONE

**Request**:

```JSON
"" : {
}
```

**Response**: NONE

**Request**:

```JSON
"" : {
}
```

**Response**: NONE

#### Client

Packets sent only from clients

##### Authenticate

**Request**:

```JSON
"authenticate" : {
  "password" : // SERVER PASSWORD
}
```

**Response**: NONE

##### Process status

**Request**:

```JSON
"processStatus" : [
    {
        "id": 10
		"state": EXITED | CLOSED | RUNNING
        "message": "Message from process or why it closed/exited"
    }
]
```

**Response**: NONE

#### Shared

Packets sent from both client and server

**Key share**

**Request**:

```JSON
"publicKey" : // PUBLIC KEY
```

**Response**: NONE

Holder

```JSON
"holder" : {
  "holder2" : // comment
}
```

## Error codes

### 100 - Communication

Errors regarding communication and network.

-   **100** Authenticate
    -   100 - Failed to receive key
        -   Error is sent by server or client when public key share sequence is done where one did not get a key when a key was expected.
    -   101 - IP address is not authorized to establish connection
        -   Error is sent by server if a connection is established with a client which is not authorized to connect with the server (Not in allows IP pool)
    -   102 - Password was incorrect
        -   Error is sent by server if the client tries to authenticate with the wrong password
-   **110** Encryption
    -   110 - Could not decrypt
        -   Error is sent by server or client if one fails to decrypt

### 200 - Data

Errors regarding data received, either format or values

-   **200** Package
    -   200 - Invalid JSON, could not parse JSON
        -   Error is sent by server of client if they fail to parse the received JSON
    -   201 - Package exceeds max package size
        -   Error is sent by server if package received is larger then max package size limit

# Crypto

All data sent between server<-->client has to be encrypted.
The only exception is the first sequence of data transfers where public keys are exchanged.

Encryption method is Asymmetrical encryption which means public/private keys. Where the Public key is shared between server and client. The private key are private, and must not be distributed.
Please read https://searchsecurity.techtarget.com/definition/asymmetric-cryptography

The encryption method of choice is **TweetNaCl** http://tweetnacl.cr.yp.to/

-   JS Library: https://github.com/dchest/tweetnacl-js
-   Java Library: https://github.com/InstantWebP2P/tweetnacl-java
