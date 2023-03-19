# TON Voting Smart Contract
This repository contains a TON smart contract designed to handle a simple voting process. The contract is written in FunC, a high-level functional programming language for TON blockchain. The contract manages votes for yes, no, and abstain options.

## Features
- Initiating and changing votes
- Keeping track of the number of votes (yes, no, abstain)
- Checking if the voting period has ended
- Retrieving vote addresses and project names

## The contract stores the following information:
- `votes_yes` The number of yes votes.
- `votes_no` The number of no votes.
- `votes_abstain` The number of abstain votes.
- `time_when_finish` The timestamp when the voting period ends.
- `initiator_addr` The address of the initiator.
- `vote_code_hex` The voting code in hexadecimal format.
- `project_name` The name of the project being voted on.

## How it works
* Voting system includes two types of contracts: **Main** and **Item**. Item deployed per User vote. Main contracts store counts only.
* Send transaction with a comment "yes", "no" or "abstain" to the **Main** contract to make a vote. **Main** will deploy **Item** contract based on sender's address.
* To change your vote, send transaction with a comment "yes", "no" or "abstain" to the **Item** contract, this action will call **Main** contract and change the vote.

## Methods
- `get_votes()` Retrieves the number of yes and no votes.
- `is_finished()` Checks if the voting period is over.
- `get_vote_addr(user_addr)` Returns the voting address of the user.
- `get_project_name()` Retrieves the project name.

## Usage
To participate in the voting process, users must send a message to the contract with a minimum amount of funds specified by the min_to_vote constant. Users can initiate or change their vote by sending messages to the contract. The contract maintains a count of votes and ensures that the voting process is fair.

## Deployment
- `npx blueprint run` # and choose Vote contract for deploy