pragma solidity ^0.5.0;

contract FriendsList {
    struct Friend {
        
        string uaddress;
        string status;
       
    }

     mapping(address => Friend[]) public friends;
     event LeaderUpdated(string uaddress , string status);   

    function add(string memory  _uaddress, string memory _status) public {
        friends[msg.sender].push(Friend({uaddress: _uaddress, status: _status}));
    }

    function getFriends(uint _index) public view returns(string memory, string memory) {
        Friend memory friend = friends[msg.sender][_index];
        return (friend.uaddress, friend.status);
    }
    
    
    function getFriendInfo(string memory _uaddress, uint totalFriends) public returns(bool success) {
      
     for(uint256 i =0; i< totalFriends; i++){
           if(compareStrings(friends[msg.sender][i].uaddress ,_uaddress)){
              return true;
           }else{
              return false; 
           }
                
           
     }
      

    }
    
    
   
    function updateFriend(string memory _uaddress, string memory _status, uint totalFriends) public returns(bool success) {
      
     for(uint256 i =0; i< totalFriends; i++){
           if(compareStrings(friends[msg.sender][i].uaddress ,_uaddress)){
              friends[msg.sender][i].status = _status;
              emit LeaderUpdated(_uaddress, _status);
              return true;
           }
     }
      
       return true;
    }
    
    /*function getFrienddata(string memory _uaddress) public view returns(string memory) {
        Friend memory friend = friends[msg.sender]._uaddress;
        return (friend.status);
    }*/
    
    
    


     function compareStrings (string memory a, string memory b) public view returns (bool) {
      return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
   }
    

    
    
    function getLength() public view returns(uint) {
        return friends[msg.sender].length;
    }

    
    
    
    
    
}