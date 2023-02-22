# TON project template (RFC)

Simple vote contracts on Ton blockchain based on blueprint template 

## DISCLAIMER - It is draft and under development

## How it works
* Two contract Main and Item. Item deployed per User vote. Main contracts store counts only.
* Send "yes" or "no" or "abstain" to master contract to vote. Master contract will deploy Item contract for user address.
* For change your vote you can send "yes" or "no" or "abstain" to Item contract that's will call master contract for change vote

# License
MIT
