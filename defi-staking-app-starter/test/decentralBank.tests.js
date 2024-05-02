const { assert } = require("chai");

const RWD = artifacts.require("RWD");
const Tether = artifacts.require("Tether");
const DecentralBank = artifacts.require("DecentralBank");

require("chai")
  .use(require("chai-as-promised"))
  .should();

contract("DecentralBank", (accounts) => {
  let tether, rwd, decentralBank, customer;

  function tokens(number) {
    return web3.utils.toWei(number, "ether");
  }

  before(async () => {
    // load contracts
    tether = await Tether.new();
    rwd = await RWD.new();
    decentralBank = await DecentralBank.new(rwd.address, tether.address);
    customer = accounts[1];

    // transfer initial balance
    await rwd.transfer(decentralBank.address, tokens("1000000"));
  });

  describe("Mock Tether Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await tether.name();
      assert.equal(name, "Mock Tether Token");
    });
  });

  describe("RWD Token", async () => {
    it("matches name successfully", async () => {
      const name = await rwd.name();
      assert.equal(name, "Reward Token");
    });
  });

  describe("Decentral Bank Deployment", async () => {
    it("matches name successfully", async () => {
      const name = await decentralBank.name();
      assert.equal(name, "DecentralBank");
    });

    it("contract has tokens", async () => {
      let balance = await rwd.balanceOf(decentralBank.address);
      assert.equal(balance, tokens("1000000"));
    });
  });

  describe("Yield Farming", async () => {
    it("rewards tokens for staking", async () => {
      let result = await tether.balanceOf(customer);
      assert.equal(result.toString(), tokens('100'), "customer mock wallet balance correct before staking");

      await tether.approve(decentralBank.address, tokens('100'), { from: customer });
      await decentralBank.depositTokens(tokens('100'), { from: customer });
    }); 
  })
});
