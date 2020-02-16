var SolidityDrive = artifacts.require("./SolidityDrive.sol");
var FriendsList = artifacts.require("./FriendsList.sol");


module.exports = function(deployer) {
  deployer.deploy(SolidityDrive);
  deployer.deploy(FriendsList);
};
