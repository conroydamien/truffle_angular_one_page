var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope) {

var accounts;
var balances = {};
var initialAmount = 2000;
var initialFee = 500;
var contractBalance;
var contractAddress;

$scope.splitFunction = function splitFunction() {
  var split = SplitCoin.deployed();

  split.setFee($scope.fee, {from:$scope.accountFrom}).then(function(r) {
    return;
  }).catch(function(e){
    throw(e);
  });

  split.setAccountB($scope.accountB, {from:$scope.accountFrom}).then(function(r) {

    return split.setAccountA($scope.accountA, {from:$scope.accountFrom}).then(function(r) {

        return split.paySomeEther({from:$scope.accountFrom, value:$scope.amount}).then(function(){
          refreshBalances();
          $scope.$apply();
        }).catch(function(e) {
          throw(e);
        });

    }).catch(function(e) {
        throw(e);
    });
  }).catch(function(e) {
      throw(e);
  });

  function refresh() {
    refreshBalances();
    $scope.$apply();
  }
}

function refreshBalances() {

  accounts.forEach(function(_account) {
    web3.eth.getBalance(_account, function(e, r){
        balances[_account] = r.valueOf();
        $scope.balances = balances;
        $scope.$apply();
        return;
    });
  });

  web3.eth.getBalance(contractAddress, function(e, r){
      $scope.contractBalance = r.valueOf();
      $scope.$apply();
      return;
    }
  )

};

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {

    var split = SplitCoin.deployed();

    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    contractAddress = split.address;

    $scope.accounts = accounts;

    $scope.accountFrom = accounts[0]
    $scope.accountA = accounts[1];
    $scope.accountB = accounts[2];

    $scope.balances = balances;
    $scope.contractBalance = contractBalance;
    $scope.contractAddress = contractAddress;
    $scope.amount = initialAmount;
    $scope.fee = initialFee;
    refreshBalances();
  });
}

}); //end of angular controller
