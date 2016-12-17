pragma solidity ^0.4.2;

contract SplitCoin {

  address public accountA;
  address public accountB;

  uint public fee = 0;

  function setAccountA(address _a) {
    accountA = _a;
  }

  function setAccountB(address _b) {
    accountB = _b;
  }

  function setFee(uint _fee) {
    fee = _fee;
  }

  function paySomeEther() payable {
    uint valueToSend = (msg.value - fee)/ 2;

    bool retValA = accountA.send(valueToSend);
    bool retValB = accountB.send(valueToSend);
  }
}
