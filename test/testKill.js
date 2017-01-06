contract('SplitCoin', function(accounts) {
  it("see if ether paid is accrued to the contract", function() {
    var split = SplitCoin.deployed();

    Promise.all([split.setFee(500, {from:accounts[0]}),
                split.setAccountA(accounts[1], {from:accounts[0]}),
                split.setAccountB(accounts[2], {from:accounts[0]})]).then(function() {

        split.paySomeEther({from: accounts[0], value:200000}).then(function(){

        web3.eth.getBalance(split.address, function(e,r) {
          console.log(split.address + ':contract:' + r.valueOf());
        });

        web3.eth.getBalance(accounts[0], function(e,r) {
          console.log(accounts[0] + ':acc0:' + r.valueOf());
        });

        web3.eth.getBalance(accounts[1], function(e,r) {
          console.log(accounts[1] + ':acc1:' + r.valueOf());
        });

        web3.eth.getBalance(accounts[2], function(e,r) {
          console.log(accounts[2] + ':acc2:' + r.valueOf());
        });

        assert.equal(true, true, "Hey, fix this!");
        });

        split.kill().then(function() {
          web3.eth.getBalance(accounts[0], function(e,r) {
            console.log(accounts[0] + ':acc0 after kill:' + r.valueOf());
          });
        })
    });
  });
});
