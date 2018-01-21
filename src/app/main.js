/**
 * import node module getting hash code for each person/block
 */
const SHA256 = require('crypto-js/SHA256');

// creating class
class Block {
    /**
     * @param {*} index - member
     * @param {*} timestamp - block created time
     * @param {*} data - coins / amount
     * @param {*} previousHash - checking hash is valid
     */
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();  //generating hash code
    }
    /**
     * returning hash code of each block
     */
    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    // creating genesis block
    createGenesisBlock() {
        return new Block(0, "01/21/2018", "Genesis block", "0");
    }
    // get the lastest block
    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }
    /**
     * 
     * @param {*} newBlock 
     */
    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    // checking hash for each person
    isValidChain() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== prevBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let blockPerson = new Blockchain();

blockPerson.addBlock(new Block(1, "01/22/2018", { amount: 2 }));
blockPerson.addBlock(new Block(2, "01/23/2018", { amount: 20 }));
blockPerson.addBlock(new Block(3, "01/24/2018", { amount: 52 }));
blockPerson.addBlock(new Block(4, "01/25/2018", { amount: 92 }));

//console.log(JSON.stringify(blockPerson, null, 5));

console.log('Is blockchain is valid? ' + blockPerson.isValidChain());

// tampering the data for 2nd person
blockPerson.chain[2].data = { amount: 500 };

blockPerson.chain[2].hash = blockPerson.chain[2].calculateHash();

console.log('Is blockchain is valid? ' + blockPerson.isValidChain());
