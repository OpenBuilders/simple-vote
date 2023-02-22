import { Address, toNano } from 'ton-core';
import { Vote } from '../wrappers/Vote';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const vote = await Vote.createFromConfig({
        initiatorAddress: provider.sender().address ?? Address.parseFriendly('EQBYxzHox8t7EdJe-9MM5WwNJT1UPI3jIP_yl4bDxzBawHuU').address,
        item_code_hex: await compile('VoteItem')
    }, await compile('Vote'));

    const openedContract = provider.open(vote);

    // run methods on `openedContract`
    const result = await openedContract.sendVote(provider.sender(), true, toNano('0.1'))

    console.log(result)
}
