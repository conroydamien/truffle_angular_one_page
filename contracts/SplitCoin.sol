pragma solidity ^0.4.2;

contract mortal {
    /* Define variable owner of the type address*/
    address owner;

    /* this function is executed at initialization and sets the owner of the contract */
    function mortal() { owner = msg.sender; }

    /* Function to recover the funds on the contract */
    function kill() { if (msg.sender == owner) selfdestruct(owner); }
}

contract SplitCoin is mortal {

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
    uint valueToSend = (msg.value - fee)/2;

    if (!(accountA.send(valueToSend) && accountB.send(valueToSend))) {
      throw;
    }
  }

  function() payable {
    paySomeEther();
  }
}
