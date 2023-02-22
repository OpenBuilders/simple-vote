import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Vote } from '../wrappers/Vote';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Vote', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Vote');
    });

    it('default test with votes', async () => {
        const blockchain = await Blockchain.create();
        // blockchain.verbosity = {
        //     blockchainLogs: true,
        //     vmLogs: "none",
        //     debugLogs: false,
        // }
        const initiator = await blockchain.treasury('initiator')
        const user = await blockchain.treasury('user')
        const vote = blockchain.openContract(Vote.createFromConfig({
            initiatorAddress: initiator.address,
            item_code_hex: await compile('VoteItem')
        }, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await vote.sendDeploy(deployer.getSender(), toNano('0.1'));
        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: vote.address,
            deploy: true,
        });

        const [yes, no] = await vote.getVotes()
        expect(yes).toEqual(0)
        expect(no).toEqual(0)

        const result = await vote.sendVote(user.getSender(), true)
        expect(result.transactions).toHaveTransaction({
            from: user.address,
            to: vote.address,
            aborted: false,
        })

        const vote1 = await vote.getVotes()
        expect(vote1[0]).toEqual(1)
        expect(vote1[1]).toEqual(0)

        await vote.sendVote(user.getSender(), false)
        const vote2 = await vote.getVotes()
        expect(vote2[0]).toBe(1)
        expect(vote2[1]).toBe(1)

        await vote.sendVote(user.getSender(), false)
        const vote3 = await vote.getVotes()
        expect(vote3[0]).toBe(1)
        expect(vote3[1]).toBe(2)
    });

    it('bounce test', async () => {
        const blockchain = await Blockchain.create();
        const initiator = await blockchain.treasury('initiator')
        const user = await blockchain.treasury('user')
        const voteItem = await blockchain.treasury('vote_item')
        const vote = blockchain.openContract(Vote.createFromConfig({
            initiatorAddress: initiator.address,
            item_code_hex: await compile('VoteItem')
        }, code));

        const deployer = await blockchain.treasury('deployer');
        await vote.sendDeploy(deployer.getSender(), toNano('0.05'));
        await vote.sendVote(user.getSender(), true)
        await vote.sendVote(user.getSender(), true)
        const result = await vote.sendBouncedItem(voteItem.getSender(), true)
        console.log(result.transactions[1])
        expect(result.transactions).toHaveTransaction({
            from: voteItem.address,
            to: vote.address,

        })
        const vote1 = await vote.getVotes()
        expect(vote1[0]).toEqual(1)
        expect(vote1[1]).toEqual(0)
    });
});
