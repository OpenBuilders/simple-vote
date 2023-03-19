import {
    Address,
    beginCell,
    Cell,
    Contract,
    contractAddress,
    ContractProvider,
    Sender,
    SendMode,
    toNano
} from 'ton-core';
import { compile } from "@ton-community/blueprint";

export type VoteConfig = {
    initiatorAddress: Address
    yes?: number
    no?: number
    abstain?: number
    timeWhenFinish?: number
    item_code_hex: Cell
    project_name: Cell
};

export function voteConfigToCell(config: VoteConfig): Cell {
    return beginCell()
        .storeUint(config.yes ?? 0, 32)
        .storeUint(config.no ?? 0, 32)
        .storeUint(config.abstain ?? 0, 32)
        .storeInt(config.timeWhenFinish ?? 0, 32)
        .storeAddress(config.initiatorAddress)
        .storeRef(config.item_code_hex)
        .storeRef(config.project_name)
        .endCell();
}

export class Vote implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new Vote(address);
    }

    static createFromConfig(config: VoteConfig, code: Cell, workchain = 0) {
        const data = voteConfigToCell(config);
        const init = { code, data };
        return new Vote(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATLY,
            body: beginCell().endCell(),
        });
    }

    async sendVote(provider: ContractProvider, via: Sender, vote: boolean, value?: bigint) {
        return await provider.internal(via, {
            value: value ?? toNano('0.1'),
            body: beginCell()
                .storeUint(0, 32)
                .storeUint(vote ? 249166704916623 : 4036989588, vote ? 48 : 32)
                .endCell(),
        });
    }

    sendBouncedItem(provider: ContractProvider, via: Sender, vote: boolean, value?: bigint) {
        return provider.internal(via, {
            bounce: true,
            value: value ?? toNano(1),
            body: beginCell()
                .storeUint(0, 32)
                .storeInt(vote ? -1 : 0, 3)
                .endCell(),
        });
    }

    async getVotes(provider: ContractProvider) {
        const result = await provider.get('get_votes', [])
        return [result.stack.readNumber(), result.stack.readNumber()]
    }

    async getProjectName(provider: ContractProvider) {
        const result = await provider.get('get_project_name', [])
        return [result.stack.readString()]
    }
}
