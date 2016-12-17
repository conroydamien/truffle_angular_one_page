# truffle_angular_one_page

This is a simple one-page AngularJS app that uses Truffle to communicate with the Ethereum Testrpc (it's not ready for anything else yet).

The rough idea is to use Truffle's generated app.js as an angular controller simply by adding a couple of declarations at the top of the file and closing them off at the end.

This means that by importing AngularJS into the Truffle index.html (where app.js is already imported by default) you get a bare-bones ultra-simple AngularJS app that's ready to use Truffle.

## Why?
I've built this as my first attempt at an Ethereum pico-project.

It has one very simple contract with a payable method. The contract extracts a fee (which is lost to the world forever - so let's stick to test rigs) and distributes the remainder equally between two accounts chosen by the user.

## Instructions
1. Ensure that Truffle is installed and working.
2. Ensure that Testrpc is running and available at `localhost:8545`.
3. From the root directory of the project run `truffle migrate`.
4. From the root directroy of the project run `truffle build`.
5. You should now have a `build` directory under the root directory, `cd` into the `build` directory.
6. Use `python -m SimpleHTTPServer` and visit `localhost:8000` with a browser.

## Notes
Right now the app just uses the default 10 accounts provided by the Testrpc demo wallet.

The code using the contract is pretty inefficient as it sets the two recipient accounts each time a payment is sent. Also - fees to the contract are lost forever. There are quite a few opportunities to improve this - I'm learning as I go! 

If you have Metamask installed in Chrome you're going to see its accounts rather than the Testrpc ones as the app will not displace the web3 already installed.    
