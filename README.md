# TON Voting Smart Contract
This repository contains a TON smart contract designed to handle a simple voting process. The contract manages votes for yes, no, and abstain options. Also, you can use time limit for voting.

## How it works
- The voting system consists of two types of contracts: Main and Item. An Item contract is deployed for each user's vote, while the Main contract only keeps track of the vote counts.
- To cast a vote, send a transaction with a comment "yes", "no", or "abstain" to the Main contract. The Main contract will then deploy an Item contract based on the sender's address.
- If you wish to change your vote, send a transaction with a comment "yes", "no", or "abstain" to the Item contract. This action will trigger the Main contract to update the vote accordingly.

## Features
- Initiating and changing votes
- Keeping track of the number of votes (yes, no, abstain)
- Checking if the voting period has ended

## The contract stores the following information:
- `votes_yes` The number of yes votes.
- `votes_no` The number of no votes.
- `votes_abstain` The number of abstain votes.
- `time_when_finish` The timestamp when the voting period ends.
- `initiator_addr` The address of the initiator.
- `vote_code_hex` The voting code in hexadecimal format.
- `project_name` The name of the project being voted on.

## Methods
- `get_votes()` Retrieves the number of yes and no votes.
- `is_finished()` Checks if the voting period is over.
- `get_vote_addr(user_addr)` Returns the voting address of the user.
- `get_project_name()` Retrieves the project name.

## Usage
To participate in the voting process, users must send a message to the contract with a minimum amount of funds specified by the min_to_vote constant. Users can initiate or change their vote by sending messages to the contract. The contract maintains a count of votes and ensures that the voting process is fair.

## Deployment
- `npx blueprint run` # and choose `deployVote` method for deploy contract