truffle compile
truffle migrate --reset
truffle test
truffle console
tether = await Tether.deployed();
tether.name()
tether.address
rwd = await RWD.deployed();
rwd.address
db = await DecentralBank.deployed();
db.address

accounts = await web3.eth.getAccounts();
balance = await tether.balanceOf(accounts[1])
convertBalance = web3.utils.fromWei(balance)
web3.utils.toWei("15", "Ether")

truffle exec scripts/issue-tokens.js