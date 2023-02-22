import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from 'ton-core';

export type VoteItemConfig = {
    ownerAddress: Address;
    mainAddress: Address;
    vote: number;
};

export function voteItemConfigToCell(config: VoteItemConfig): Cell {
    return beginCell()
        .storeAddress(config.ownerAddress)
        .storeAddress(config.mainAddress)
        .storeInt(config.vote, 3)
        .endCell();
}

export class VoteItem implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new VoteItem(address);
    }

    static createFromConfig(config: VoteItemConfig, code: Cell, workchain = 0) {
        const data = voteItemConfigToCell(config);
        const init = { code, data };
        return new VoteItem(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().endCell(),
        });
    }
}
