# Intro



# Core

## Network

- Uses IP/TCP for communication with clients

## Storage

- Application configuration are stored as encrypted JSON objects

## Security

- The application is locked with a login password
  - Minimum length 6 characters
- The configuration files are encrypted with the login password
  - Changing password must re-encrypt the files with the new password
  - Forgot password will delete 
- Network communication is encrypted after handshaking with the server

## Protocol

Described in separate document

# Login view

> The login page of the application, this is the first screen you will se when you enter the application.
>

## Functionality

- I can enter my password and press enter to login to the application 
- I must get feedback if my password is wrong
- I can use enter key to submit the form

# Settings view

> This page displays all settings for the application
>

## Functionality

- I should be able to change which port the application listens on
- I should be able to add IP addresses to a white list, which is the only addresses that is allowed to connect
- I should be able to change my login password
- I should be able to add SMTP info for mail server
  - I should be able to add email for notification of process statues

# Main menu

> The main menu that makes it possible to quick navigate the application
>

## Functionality

- I must be able to go to clients view
- I must be able to go to group sequences view
- I must be able to go to settings 
- I must be able to logout of the application
- I must be able to navigate back from the current page
- I must be able to use the menu from every page of the application

# Clients view

> This overview displays all connected, and previously connected/disconnected clients.
>

## Functionality

- I should be able to see all connected clients
- I should be able to see previously connected clients
- I should be able to see the status of a client [connected / disconnected]
- I should be able to click on a client to go to the client executions view for that client
- I should be able to see a count of connected clients vs total clients in the list -> 7/15 
- I should be able to see the clients name, IP address (v4 and v6)

# Client executions view

> This view displays all execution sequences for a specific client.
>

## Functionality

- I should be able to see the clients name at the top of the page
- I should be able to see the clients IP addresses (v4 and v6) at the top of the page
- I should be able to see when the client first connected [date/time]
- I should be able to add a new execution sequence
- I should be able to see a list of all the executions for this client
  - Name, description, created [date]
- I should be able to toggle the execution from the list
- I should be able to click on a execution sequence and go to the execution view to edit/view the sequence
- I should be able to see if the sequence is running or is stopped
- I should be able to select an execution and remove it from the list

# Client execution view

> This view displays a clients execution sequence, where you can add or remove an execution from the sequence.
>

## Functionality

- I should be able to add a new process to execute to a list
  - I should be able to set base path
  - I should be able to set the executable 
  - I should be able to set arguments
  - I should be able to set an execution delay
- I should be able to select an process and remove it from the list
- I should be able to see a list of all the processes
  - Executable, Arguments, Delay time, process status
- I should be able to start the process from the list
- I should be able to edit the execution in a modal window
  - I should be able to set base path
  - I should be able to set the executable 
  - I should be able to set arguments
  - I should be able to set an execution delay
- I should be able to give the execution sequence a name
- I should be able to give the execution sequence a description
- I should be able to flag the execution for email notification

# Group sequences overview

> This view displays all group sequences that bundles multiple clients together to create a system sequence spread over different machines.
>

## Functionality

- I should be able to see number of group sequences that are running
- I should be able to add a new group sequence to a list
- I should be able to select an group sequence and remove it from the list
- I should be able to see a list of all the group sequences
  - Sequence name, Clients involved, sequence status
- I should be able to start the group sequence from the list
- I should be able to click a button to edit the group sequence in a new view

# Group sequence view

> This view displays a group sequence executions for each client in the group.
>

## Functionality

- I should be able to add a client to the group sequence view
  - I should be able to choose from already created client execution sequence
  - I should be able to add a new process to a client execution list from a modal window
    - I should be able to set base path
    - I should be able to set the executable 
    - I should be able to set arguments
    - I should be able to set an execution delay
  - I should be able to select a process and remove it from the list
  - I should be able to see a list of all the processes
    - Executable, Arguments, Delay time, process status
  - I should be able to start the process from the list
  - I should be able to edit the execution in a modal window
    - I should be able to set base path
    - I should be able to set the executable 
    - I should be able to set arguments
    - I should be able to set an execution delay
- I should be able to set a clients execution delay
- I should be able to give the group sequence a name
- I should be able to give the group sequence a description

