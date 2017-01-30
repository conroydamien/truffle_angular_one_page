contract('SplitCoin', function(accounts) {
  it("see if ether paid is accrued to the contract", function() {
    var split = SplitCoin.deployed();

    var balanceBeforeKill;
    var balanceAfterKill;

    var acc0BalanceBeforePayment;
    var acc1BalanceBeforePayment;
    var acc2BalanceBeforePayment;
    var contractBalanceBeforePayment;

    var fee = 500;
    var amount = 2000000;

    web3.eth.getBalance(accounts[0], function(e,r) {
      acc0BalanceBeforePayment = r.toString(10);
    });

    web3.eth.getBalance(accounts[1], function(e,r) {
      acc1BalanceBeforePayment = r.toString(10);
    });

    web3.eth.getBalance(accounts[2], function(e,r) {
      acc2BalanceBeforePayment = r.toString(10);
    });

    web3.eth.getBalance(split.address, function(e,r) {
      contractBalanceBeforePayment = r.toString(10);
    });

    return Promise.all([split.setFee(fee, {from:accounts[0]}),
                split.setAccountA(accounts[1], {from:accounts[0]}),
                split.setAccountB(accounts[2], {from:accounts[0]})])
          .then(function(txnHashes) {
            return split.paySomeEther({from: accounts[0], value:amount});
          })
          .then(function(txHashes){
            web3.eth.getBalance(split.address, function(e,r) {
              assert.equal(Number(contractBalanceBeforePayment) + fee + amount%2, r.toString(10))
            });

            web3.eth.getBalance(accounts[0], function(e,r) {
                  //assert.equal(acc0BalanceBeforePayment + r.valueOf());
            });

            web3.eth.getBalance(accounts[1], function(e,r) {
              assert.equal(Number(acc1BalanceBeforePayment) + (amount - fee)/2, r.toString(10));
            });

            web3.eth.getBalance(accounts[2], function(e,r) {
              assert.equal(Number(acc2BalanceBeforePayment) + (amount - fee)/2, r.toString(10));
            });

            return split.kill();
          })
          .then(function(txnHashes) {
             web3.eth.getBalance(accounts[0], function(e,r) {
               assert(Number(acc0BalanceBeforePayment) - amount > r.toString(10));
             });
          })
  }); //it
});
