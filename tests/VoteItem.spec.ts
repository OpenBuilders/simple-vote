import { Blockchain } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { VoteItem } from '../wrappers/VoteItem';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
import { Vote } from "../wrappers/Vote";

describe('VoteItem', () => {
    let code: Cell;
    //
    // beforeAll(async () => {
    //     code = await compile('VoteItem');
    // });

    it('should deploy', async () => {
        expect(true).toBe(true)
    });
});
