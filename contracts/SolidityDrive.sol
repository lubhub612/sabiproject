pragma solidity ^0.5.0;

contract SolidityDrive {
    struct File {
        string hash;
        string fileName;
        string fileType;
        uint date;
        string roll;
        uint fileno;
        
    }

    mapping(address => File[]) public files;
   
   
   event LeaderUpdated(string hash , string roll);
    
    /* modifier onlyAfter(uint _time) {
        require(
            hasNonZeroData(_time)==0,
            "Not yet to strated."
        );
         _;
    }*/
    

    function add(string memory  _hash, string memory _fileName, string memory _fileType, uint _date, string memory _roll, uint _fileno) public {
        files[msg.sender].push(File({hash: _hash, fileName: _fileName, fileType: _fileType, date: _date, roll: _roll, fileno: _fileno }));
        
    }

    function getFile(uint _index) public view returns(string memory, string memory, string memory, uint, string memory, uint) {
        File memory file = files[msg.sender][_index];
        return (file.hash, file.fileName, file.fileType, file.date,file.roll,file.fileno);
    }
    
    /////update status of file storage 
    function updateFile(string memory _hash, string memory _roll, uint totalFiles) public returns(bool success) {
      
     for(uint256 i =0; i< totalFiles; i++){
           if(compareStrings(files[msg.sender][i].hash ,_hash)){
              files[msg.sender][i].roll = _roll;
              emit LeaderUpdated(_hash, _roll);
              return true;
           }
     }
      
       return true;
    }
    
    
    /// get file data using file stored time
    /*function getFile1(uint _date) public onlyAfter(_date) view returns(string memory, string memory, string memory,string memory) {
        File memory file = files[msg.sender][_date];
       
        return (file.hash, file.fileName, file.fileType, file.roll);
        
        
    }*/

    //function compareStrings (string memory a, string memory b)  internal pure returns (bool){
      /// return keccak256(a) == keccak256(b);
///}//
    function compareStrings (string memory a, string memory b) public view returns (bool) {
      return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))) );
   }

    
    
    function getLength() public view returns(uint) {
        return files[msg.sender].length;
    }
    
    /*function hasNonZeroData(uint _time) public view returns(uint) {
     File memory file = files[msg.sender][_time];
     bytes memory b3 = bytes(file.fileName);
        return b3.length;
        
        
    }*/
    
    
    
    
    
}