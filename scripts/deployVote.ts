import { Address, beginCell, toNano } from 'ton-core';
import { Projects, Vote } from '../wrappers/Vote';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const vote = await Vote.createFromConfig({
        initiatorAddress: provider.sender().address ?? Address.parseFriendly('EQBYxzHox8t7EdJe-9MM5WwNJT1UPI3jIP_yl4bDxzBawHuU').address,
        item_code_hex: await compile('VoteItem'),
        project_name: beginCell().storeStringTail(Projects.tegro).endCell()
    }, await compile('Vote'));

    await provider.deploy(vote, toNano('0.05'));

    const openedContract = provider.open(vote);

    // run methods on `openedContract
    console.log(await openedContract.getVotes())
}
