import * as crypto from "crypto";

export class Block {
    data: any;
    index: number;
    timestamps: Date;
    hash: string;
    hashFromBlockBefore: string;
    nonce: number;

    /**
     * Creates a block that can be stores in the blockchain.
     * @param data any
     * @param index number
     * @param hashFromBlockBefore string
     * @param timestamps Date (given by default)
     */
    constructor(data: any, index: number, hashFromBlockBefore: string, timestamps: Date = new Date()) {
        this.data = data;
        this.index = index;
        this.timestamps = timestamps;
        this.hashFromBlockBefore = hashFromBlockBefore;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    /**
     * Calculate hash of a block with the `SHA256` hash algorithm.
     */
    calculateHash(): string {
        const hashContent: string = this.data + this.index + this.timestamps + this.hashFromBlockBefore + this.nonce;
        return crypto.createHash('sha256').update(hashContent).digest('hex');
    }

    /**
     * Mining a block in the blockchain. Therefore a difficulty is needed which defines how many zeros are needed before the hash. This process is also called `Proof of Work`.
     * @param difficulty 
     */
    mine(difficulty: number) {
        while(Array(difficulty + 1).join('0') !== this.hash.substring(0, difficulty)) {
            this.nonce++;
            console.log(this.nonce)
            this.hash = this.calculateHash();
        }
        console.log(`Block ${this.index} has been mined with hash ${this.hash}`);
    }
}
