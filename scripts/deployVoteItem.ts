import { toNano } from 'ton-core';
import { VoteItem } from '../wrappers/VoteItem';
import { compile, NetworkProvider } from '@ton-community/blueprint';

export async function run(provider: NetworkProvider) {
    const voteItem = VoteItem.createFromConfig({}, await compile('VoteItem'));

    await provider.deploy(voteItem, toNano('0.05'));

    const openedContract = provider.open(voteItem);

    // run methods on `openedContract`
}
