# Simple vote

Simple vote contracts on TON blockchain based on blueprint template.

## DISCLAIMER - It is draft and under development

## How it works
* Voting system includes two types of contracts: **Main** and **Item**. Item deployed per User vote. Main contracts store counts only.
* Send transaction with a comment "yes", "no" or "abstain" to the **Main** contract to make a vote. **Main** will deploy **Item** contract based on sender's address.
* To change your vote, send transaction with a comment "yes", "no" or "abstain" to the **Item** contract, this action will call **Main** contract and change the vote.

# License
MIT
