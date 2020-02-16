import React, { Component } from "react";
import SolidityDriveContract from "./contracts/SolidityDrive.json";
import FriendsListContract from "./contracts/FriendsList.json";
import getWeb3 from "./utils/getWeb3";
import { StyledDropZone } from "react-drop-zone";
import FileIcon, { defaultStyles } from "react-file-icon";
import "react-drop-zone/dist/styles.css";
import "bootstrap/dist/css/bootstrap.css";
import { Table } from "reactstrap";
import fileReaderPullStream from 'pull-file-reader';
import ipfs from './utils/ipfs';
import Moment from "react-moment";
import "./App.css";

class App extends Component {
  constructor(props){
    super(props);
    //add new parameters on state
    this.state = { solidityDrive: [], friendDrive: [],  web3: null, accounts: null, contract: null, contract1: null, hidediv: false, hidediv33: false, hidediv34: false, hidediv44: false, hidediv45: false, hidediv35: false, hidediv24: false, hidediv36: false,
      hidediv1: false,  socialvalue : 'public', addressvalue: '', username: '',  hidediv12: false, hidediv13: false, hidediv2: true, hidediv3: false, hidediv4: false, hidediv41: true, hidediv42: false, hidediv43: false, hidediv5: true, hidediv6: true, hidediv55: false,
     };
     ///add new functions 
     this.handleClick     = this.handleClick.bind(this);
     this.handleClick1    = this.handleClick1.bind(this);
     this.handleChange    = this.handleChange.bind(this);
     this.handleChange2   = this.handleChange2.bind(this);
     this.handleChange22  = this.handleChange22.bind(this);
     this.handleClick2    = this.handleClick2.bind(this);
     this.handleClick3    = this.handleClick3.bind(this);
     this.handleClick4    = this.handleClick4.bind(this);
     this.handleClick5    = this.handleClick5.bind(this);
     this.handleClick21   = this.handleClick21.bind(this);
     this.handleClick22   = this.handleClick22.bind(this);
     this.handleClick23   = this.handleClick23.bind(this);
     this.handleClick33   = this.handleClick33.bind(this);
     this.handleClick34   = this.handleClick34.bind(this);
     this.handleClick24   = this.handleClick23.bind(this);
     this.handleClick11   = this.handleClick11.bind(this);
     this.handleClick111  = this.handleClick111.bind(this);
     this.handleClick12   = this.handleClick12.bind(this);
     this.handleClick121  = this.handleClick121.bind(this);
     this.handleClick35   = this.handleClick35.bind(this);
     this.handleClick6    = this.handleClick6.bind(this);
     this.handleClick7    = this.handleClick7.bind(this);
}



  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SolidityDriveContract.networks[networkId];
     
      const instance = new web3.eth.Contract(
        SolidityDriveContract.abi,
        deployedNetwork && deployedNetwork.address
      );
     
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.getFiles);

      const deployedNetwork1 = FriendsListContract.networks[networkId];
      const instance1 = new web3.eth.Contract(
        FriendsListContract.abi,
        deployedNetwork1 && deployedNetwork1.address
      );

       // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract1: instance1 }, this.getFriend);

    
      web3.currentProvider.publicConfigStore.on('update', async () => {
        const changedAccounts = await web3.eth.getAccounts();
        this.setState({accounts: changedAccounts});
        this.getFiles();
        this.getFriend();
      })
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  getFiles = async () => {
    try {
      const { accounts, contract } = this.state;
      let filesLength = await contract.methods
        .getLength()
        .call({ from: accounts[0] });
      let files = [];
      for (let i = 0; i < filesLength; i++) {
        let file = await contract.methods.getFile(i).call({ from: accounts[0] });
        files.push(file);
      }
      this.setState({ solidityDrive: files });
    } catch (error) {
     console.log(error);
    }
  };


  getFriend = async () => {
    try {
      const { accounts, contract1 } = this.state;
      let friendsLength = await contract1.methods
        .getLength()
        .call({ from: accounts[0] });
      let friends = [];
      for (let i = 0; i < friendsLength; i++) {
        let friend = await contract1.methods.getFriends(i).call({ from: accounts[0] });
        friends.push(friend);
      }
      this.setState({ friendDrive: friends });
    } catch (error) {
     console.log(error);
    }
  };



  onDrop = async (file) => {
    try {
      const {contract, accounts} = this.state;
      const stream = fileReaderPullStream(file);
      const result = await ipfs.add(stream);
      const timestamp = Math.round(+new Date() / 1000);
      const type = file.name.substr(file.name.lastIndexOf(".")+1);
      const roll = this.state.socialvalue;
      let filesLength = await contract.methods
        .getLength()
        .call({ from: accounts[0] });
        const fileid = filesLength+1;
      let uploaded = await contract.methods.add(result[0].hash, file.name, type, timestamp, roll, fileid).send({from: accounts[0], gas: 300000})
      console.log(uploaded);
      this.getFiles();
    } catch (error) {
      console.log(error);
    }
  };

// add function for status change
  handleClick33 = async (e) => {
    try {
      const { accounts, contract } = this.state;
      const roll = 'friends';
      const hash = e.target.value;
      let filesLength = await contract.methods
        .getLength()
        .call({ from: accounts[0] });
        let updated = await contract.methods.updateFile(hash, roll, filesLength).send({from: accounts[0], gas: 300000})
        console.log(updated);
        this.getFiles();
    } catch (error) {
     console.log(error);
    }
  };

// add functions for status change
  handleClick34 = async (e) => {
    try {
      const { accounts, contract } = this.state;
      const roll = 'public';
      const hash = e.target.value;
      let filesLength = await contract.methods
        .getLength()
        .call({ from: accounts[0] });
        let updated = await contract.methods.updateFile(hash, roll, filesLength).send({from: accounts[0], gas: 300000})
        console.log(updated);
        this.getFiles();
    } catch (error) {
     console.log(error);
    }
  };

  handleClick35 = async (e) => {
    try {
      const { accounts, contract1 } = this.state;
      const roll = 'inactive';
      const hash = e.target.value;
      let filesLength = await contract1.methods
        .getLength()
        .call({ from: accounts[0] });
        let updated = await contract1.methods.updateFriend(hash, roll, filesLength).send({from: accounts[0], gas: 300000})
        console.log(updated);
        this.getFriend();
    } catch (error) {
     console.log(error);
    }
  };

///add new function for handle select option
  handleChange = (e) => {
    console.log("pressed"); 
    const txt1 = e.target.value;
    console.log(txt1);
    this.setState({ socialvalue: txt1 });
  }

  handleClick(e) {
    ///change keys
    console.log('The link was clicked.');
    fetch(`https://api.ipdata.co/?api-key=2384590363c5a6262353afda3d151cf5d8f1767c98566590ed98431c`)
   .then(response => response.json())
   .then(function(data){
     console.log(data);
     var today = new Date().getHours();
         if(data.country_code==="IN" && today >= 4 && today <= 23){
            console.log("ok");
            this.setState({
             hidediv: true
           });
         }else{
            console.log("access denied");
           this.setState({
             hidediv1: true
           });
   
         }
   }.bind(this))
   .catch(error => console.log('failed to fetch', error));
   }
////add to div view for message
   handleClick1(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    ////alert("button number " + txt1 + " clicked");
    this.setState({  status: false });
    
    /////window.location.reload();
  }

/// add fuctions for handler
  handleClick2(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv2: true, hidediv5: false, hidediv6: false });
  }
  
  /// add fuctions for handler
  handleClick21(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv3: false,  hidediv2: true,  addressvalue: '', username: '' });
  }
  
  /// add fuctions for handler
  handleClick22(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv4: false, hidediv2: true,  addressvalue: '', username: '' });
  }
  
  handleClick23(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv41: false, hidediv42: true });
  }


  handleClick24(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv43: true, hidediv41: false });
  }


  handleClick11(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv44: true });
  }


  handleClick12(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv45: true });
  }

  handleClick111(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv44: false });
  }

  handleClick121(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    this.setState({ hidediv45: false });
  }


  /// add fuctions for handler
  handleClick3 = async (e) => {
    try{
      const { accounts, contract1 } = this.state;
      const addressvalue = this.state.addressvalue;
    console.log("Clicked"); 
    const txt1 = e.target.value;
    console.log(txt1);
    await  fetch(`https://api.ipdata.co/?api-key=2384590363c5a6262353afda3d151cf5d8f1767c98566590ed98431c`)
   .then(async response =>   await response.json())
   .then(async function(data){
     console.log(data);
     var today = new Date().getHours();
         if(data.country_code==="IN" && today >= 4 && today <= 23){
            console.log("ok");
        const fstatus = "active";
            let added = await contract1.methods.add(addressvalue,fstatus).send({from: accounts[0], gas: 300000})
      console.log(added);
      this.getFriend();
      this.setState({
        hidediv3: true, hidediv2:false
     });
            /*this.setState({
              hidediv4: true , hidediv2: false , addressvalue: addressvalue
           });
           */
         }else{
            console.log("access denied");
           this.setState({
             hidediv1: true, hidediv12: true, hidediv13: false
           });
   
         }
   }.bind(this))
   .catch(error => console.log('failed to fetch', error));
  }
  catch (error) {
    console.log(error);
   }
  }
  
  /// add fuctions for handler
  handleClick4(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    console.log(txt1);
    fetch(`https://api.ipdata.co/?api-key=2384590363c5a6262353afda3d151cf5d8f1767c98566590ed98431c`)
   .then(response => response.json())
   .then(function(data){
     console.log(data);
     var today = new Date().getHours();
         if(data.country_code==="IN" && today >= 4 && today <= 23){
            console.log("ok");
            
            this.setState({
              hidediv3: true, hidediv2:false
           });
        
         }else{
            console.log("access denied");
           this.setState({
             hidediv1: true, hidediv12: true, hidediv13: false
           });
   
         }
   }.bind(this))
   .catch(error => console.log('failed to fetch', error));
   ///// this.setState({  });
  }
  
  handleClick5(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    console.log(txt1);
    fetch(`https://api.ipdata.co/?api-key=2384590363c5a6262353afda3d151cf5d8f1767c98566590ed98431c`)
   .then(response => response.json())
   .then(function(data){
     console.log(data);
     var today = new Date().getHours();
         if(data.country_code==="IN" && today >= 4 && today <= 23){
            console.log("ok");
            
            this.setState({
              hidediv55: true, hidediv2:false
           });
        
         }else{
            console.log("access denied");
           this.setState({
             hidediv1: true, hidediv12: true, hidediv13: false
           });
   
         }
   }.bind(this))
   .catch(error => console.log('failed to fetch', error));
   ///// this.setState({  });
  }


  handleClick6(e) {

    console.log("Clicked"); 
    const txt1 = e.target.value;
    console.log(txt1);
    fetch(`https://api.ipdata.co/?api-key=2384590363c5a6262353afda3d151cf5d8f1767c98566590ed98431c`)
   .then(response => response.json())
   .then(function(data){
     console.log(data);
     var today = new Date().getHours();
         if(data.country_code==="IN" && today >= 4 && today <= 23){
            console.log("ok");
            console.log("Public Friend View");
            this.setState({
              hidediv24: true, hidediv2:false
           });
        
         }else{
            console.log("access denied");
           this.setState({
             hidediv1: true, hidediv12: true, hidediv13: false
           });
   
         }
   }.bind(this))
   .catch(error => console.log('failed to fetch', error));
   ///// this.setState({  });
  }

  handleClick7(e) {
    console.log("Clicked"); 
    const txt1 = e.target.value;
    console.log(txt1);
    fetch(`https://api.ipdata.co/?api-key=2384590363c5a6262353afda3d151cf5d8f1767c98566590ed98431c`)
   .then(response => response.json())
   .then(function(data){
     console.log(data);
     var today = new Date().getHours();
         if(data.country_code==="IN" && today >= 4 && today <= 23){
            console.log("ok");
            
            this.setState({
              hidediv3: true, hidediv2:false
           });
        
         }else{
            console.log("access denied");
           this.setState({
             hidediv1: true, hidediv12: true, hidediv13: false
           });
   
         }
   }.bind(this))
   .catch(error => console.log('failed to fetch', error));
   ///// this.setState({  });
  }

  /// add fuctions for handler
  handleChange2 = async (e) => {
    const { accounts, contract1,addressvalue } = this.state;
    console.log("pressed"); 
    const txt1 = e.target.value;
    console.log("a  " +txt1);
    console.log("b  " + txt1.length);
   //this.setState({ addressvalue: txt1 });
    const v1  =  (/^(0x){1}[0-9a-fA-F]{40}$/i.test(txt1));
    console.log("c  " + this.state.addressvalue);
    console.log("d  " + v1);
    console.log("The Ethereum address " +  this.state.addressvalue + " is " + v1 +"  address");
    ////alert("The Ethereum address " +  this.state.addressvalue + " is "+ v1  + " address");
    if(v1 == true){
      if(txt1 == 0xE294649fffb725B33f13412ff6c4E89E2a486b8f){
        console.log("yes....");
      this.setState({ addressvalue: txt1, hidediv34: true, hidediv13: true, hidediv12: false });
    }
    else{
      console.log("no.....");
      let friendsLength = await contract1.methods
        .getLength()
        .call({ from: accounts[0] });
        console.log("Toal Friends : " + friendsLength);
      let friendinfo = await contract1.methods.getFriendInfo(txt1,friendsLength).call({from: accounts[0] });
      console.log("result is : " + friendinfo);
      console.log("result status is : " + friendinfo.status);
      if(friendinfo == true)
      {
        console.log("Please .......");
        this.setState({ addressvalue: txt1, hidediv35: true, hidediv13: true, hidediv12: false });
      }
      else
      {
        console.log("Sorry ....");
        this.setState({ addressvalue: txt1, hidediv33: true, hidediv13: true, hidediv12: false });
      }
     }
    }
    else{
      this.setState({ addressvalue: txt1, hidediv12: true, hidediv13: false });
    }
  }
  
  handleChange22(e) {
    console.log("pressed"); 
    const txt1 = e.target.value;
    console.log("a  " +txt1);
    this.setState({ username: txt1 });
  }


  render() {
    const {solidityDrive} = this.state;
    const addressvalue1 = this.state.addressvalue;
    const enabled = (/^(0x){1}[0-9a-fA-F]{40}$/i.test(addressvalue1));
    ////const enabled1 = (/^(0x){1}[0-9a-fA-F]{40}$/i.test(addressvalue1)) && (addressvalue1 === 0xE294649fffb725B33f13412ff6c4E89E2a486b8f);
    console.log(addressvalue1);

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }

    


    return (
      <div className="App">
        <div className="container pt-3">
        {/* add div to show results*/}
<div style={{ display: this.state.hidediv55 ? "block" : "none" }} >
        
        <select   onChange={this.handleChange}>
           <option  value="public">Public</option>
           <option  value="friends">Friends</option>
        </select>
          <StyledDropZone onDrop={this.onDrop} />
          <button onClick={this.handleClick}>
             Click to view Files
           </button>
           <button onClick={this.handleClick11}>
             FriendsList
           </button>
           <button onClick={this.handleClick12}>
            show FriendsList
           </button>
    </div> 
    
 {/* add div for friends sectons */}
    {/*
      <div style={{ display: this.state.hidediv6 ? "block" : "none" }} >
    <button onClick={this.handleClick2}>
     Cick to add friend
    </button>
    </div>
    */}
 {/* add div to friends wallet */}
<div style={{ display: this.state.hidediv2 ? "block" : "none" }} >
          <h1>username</h1> 
           <br/>
        <input
            type="text"
            value={this.state.username}
            onChange={this.handleChange22}
    /> 
         <br/>
              <h1> Enter Public Wallet Address </h1> <br/>
         <input
            type="text"
            value={this.state.addressvalue}
            onChange={this.handleChange2}
    />
    <br/> 
    <div style={{ display: this.state.hidediv33 ? "block" : "none" }} >
              <button disabled ={!enabled}  onClick={this.handleClick3}>
                 Send Request 
              </button>
    <br/>

              <button  disabled ={!enabled} onClick={this.handleClick4}>
                  Next
              </button>
    <br/>          
    </div>


    <div style={{ display: this.state.hidediv34 ? "block" : "none" }} >
               <button  disabled ={!enabled} onClick={this.handleClick5}>
                   Check Profile
               </button>
    </div>


    <div style={{ display: this.state.hidediv35 ? "block" : "none" }} >
               <button  disabled ={!enabled} onClick={this.handleClick6}>
                  Get Access
               </button>
    </div>


    <div style={{ display: this.state.hidediv36 ? "block" : "none" }} >
               <button  disabled ={!enabled} onClick={this.handleClick7}>
                  Next
               </button>
    </div>
  
    <div style={{ display: this.state.hidediv12 ? "block" : "none" }} >
       <p> Sorry {this.state.addressvalue} is not a valid address</p>
    </div>



    <div style={{ display: this.state.hidediv13 ? "block" : "none" }} >
        <p>  {this.state.addressvalue} is  a valid address</p>
    </div>



    </div>


    <div style={{ display: this.state.hidediv ? "block" : "none" }} >
         <h1>Public View</h1>
          <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
                <th className="text-right">File No</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
        
            <tbody>
              {solidityDrive !== [] ? solidityDrive.map((item, index)=>(
                <tr>
                {/* add social status paramter and display datas through social status parameter */}  
                <th>
                {item[4] === "public" ?
                  <FileIcon
                    size={30}
                    extension={item[2]}
                    {...defaultStyles[item[2]]}
                  />
                  :"Public accessed only"}
                </th>
                <th className="text-left">{item[4] === "public" ? <a href={"https://ipfs.io/ipfs/"+item[0]}>{item[1]}</a> :"Public accessed only"}</th>
                <th className="text-right">
                {item[4] === "public" ?  <Moment format="YYYY/MM/DD" unix>{item[3]}</Moment>
               :"Public accessed only"} </th>
               <th className="text-right">
                {item[4] === "public" ?  <h1>{item[5]}</h1>
               :"Public accessed only"} </th>
                <th className="text-right">
                { item[4] === "public" ? "Public Access Granted" : "Public accessed only"}
                </th>
              </tr>
              )) : null}
            </tbody>
          </Table>
          <br/>
          <br/>
          <br/>
          {/* add another table for friends accessd */}
          <h1> Friend View</h1>
          <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
                <th className="text-right">File No</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
        
            <tbody>
              {solidityDrive !== [] ? solidityDrive.map((item, index)=>(
                <tr>
                {/* add social status paramter and display datas through social status parameter */}  
                <th>
                {item[4] === "friends" ?
                  <FileIcon
                    size={30}
                    extension={item[2]}
                    {...defaultStyles[item[2]]}
                  />
                  :"Friends  accessed only"}
                </th>
                <th className="text-left">{item[4] === "friends" ? <a href={"https://ipfs.io/ipfs/"+item[0]}>{item[1]}</a> :"Friends accessed only"}</th>
                <th className="text-right">
                {item[4] === "friends" ?  <Moment format="YYYY/MM/DD" unix>{item[3]}</Moment>
               :"Friends accessed only"} </th>
               <th className="text-right">
                {item[4] === "public" ?  <h1>{item[5]}</h1>
               :"Friends accessed only"} </th>
                <th className="text-right">
                { item[4] === "friends" ? "Friends Accessed Granted" : "Friends accessed only"}
                </th>
              </tr>
              )) : null}
            </tbody>
          </Table>


  <div style={{ display: this.state.hidediv44 ? "block" : "none" }} >
          <button onClick={this.handleClick111}> Back </button> <br/>
           <br/>
   
      <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Address
                </th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
        
            <tbody>
              { this.state.friendDrive !== [] ? this.state.friendDrive.map((item, index)=>(
              <tr>
                 <th>
                   {item[0]}
                 </th>
                 <th className="text-right">
                { item[1] == "active" ? <button value={item[0]} onClick={this.handleClick35}> add Friend</button> : "Friends"}
                </th>
               </tr>
              )) : null} 
              
               {/*{this.state.addressvalue}  */}
            </tbody>
          </Table>
              
</div>


<div style={{ display: this.state.hidediv45 ? "block" : "none" }} >
          <button onClick={this.handleClick121}> Back </button> <br/>
           <br/>
   
      <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Address
                </th>
              </tr>
            </thead>
        
            <tbody>
             { this.state.friendDrive !== [] ?  this.state.friendDrive.map((item, index)=>(
              <tr>
                 <th>
                 { item[1] == "active" ?  item[0] : "Not selected " }
                 </th>
                 
               </tr>
              )) : null}
            </tbody>
          </Table>
              
</div>


          </div>

          <div id="b2" style={{ display: this.state.hidediv1 ? "block" : "none" }}>
            <p>Access  denied.... Only access between 6am to 6 pm </p>
          </div>


 {/* add div to public sections view*/}
<div style={{ display: this.state.hidediv3 ? "block" : "none" }} >
          <button onClick={this.handleClick21}> Back </button> 
          <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
                <th className="text-right">File No</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
        
            <tbody>
              {solidityDrive !== [] ? solidityDrive.map((item, index)=>(
                <tr>
                {/* add social status paramter and display datas through social status parameter */}  
                <th>
                {item[4] === "public" ?
                  <FileIcon
                    size={30}
                    extension={item[2]}
                    {...defaultStyles[item[2]]}
                  />
                  :"Public accessed only"}
                </th>
                <th className="text-left">{item[4] === "public" ? <a href={"https://ipfs.io/ipfs/"+item[0]}>{item[1]}</a> :"Public accessed only"}</th>
                <th className="text-right">
                {item[4] === "public" ?  <Moment format="YYYY/MM/DD" unix>{item[3]}</Moment>
               :"Public accessed only"} </th>
               <th className="text-right">
                {item[4] === "public" ?  <h1>{item[5]}</h1>
               :"Public accessed only"} </th>
                <th className="text-right">
                { item[4] === "public" ? "Public Access Granted" : "Public accessed only"}
                </th>
              </tr>
              )) : null}
            </tbody>
          </Table>
          <br/>
          <br/>
</div>

 {/* add div for friends section view*/}
<div style={{ display: this.state.hidediv4 ? "block" : "none" }} >
          <h1>Friends List</h1> <br/>
         
          <h1>{this.state.username}</h1> <br/>
          <button onClick={this.handleClick22}> Back </button> <br/>

       
          <button onClick={this.handleClick24}> Friends List </button><br/>

         

 <div style={{ display: this.state.hidediv43 ? "block" : "none" }} >
    <h1>{this.state.addressvalue}</h1> <br/>
   {/*
      <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Address
                </th>
                
              </tr>
            </thead>
        
            <tbody>
              {friendsList !== [] ? friendsList.map((item, index)=>(
              <tr>
                 <th>
                   {item[0]}
                 </th>
               </tr>
              )) : null}
            </tbody>
          </Table>
              */}
</div>
              


<div style={{ display: this.state.hidediv41 ? "block" : "none" }} >
<Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
                <th className="text-right">File No</th>
                <th className="text-right">Status</th>
              </tr>
            </thead>
        
            <tbody>
              {solidityDrive !== [] ? solidityDrive.map((item, index)=>(
                <tr>
                {/* add social status paramter and display datas through social status parameter */}  
                <th>
                {item[4] === "public" ?
                  <FileIcon
                    size={30}
                    extension={item[2]}
                    {...defaultStyles[item[2]]}
                  />
                  :"Public accessed only"}
                </th>
                <th className="text-left">{item[4] === "public" ? <a href={"https://ipfs.io/ipfs/"+item[0]}>{item[1]}</a> :"Public accessed only"}</th>
                <th className="text-right">
                {item[4] === "public" ?  <Moment format="YYYY/MM/DD" unix>{item[3]}</Moment>
               :"Public accessed only"} </th>
               <th className="text-right">
                {item[4] === "public" ?  <h1>{item[5]}</h1>
               :"Public accessed only"} </th>
                <th className="text-right">
                { item[4] === "public" ? "Public Access Granted" : "Public accessed only"}
                </th>
              </tr>
              )) : null}
            </tbody>
          </Table>

</div>





<div style={{ display: this.state.hidediv42 ? "block" : "none" }} >
         <h1>Public View</h1>
          <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
                <th className="text-right">Status</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
        
            <tbody>
              {solidityDrive !== [] ? solidityDrive.map((item, index)=>(
                <tr>
                {/* add social status paramter and display datas through social status parameter */}  
                <th>
                
                  <FileIcon
                    size={30}
                    extension={item[2]}
                    {...defaultStyles[item[2]]}
                  />
                  
                </th>
                <th className="text-left"><a href={"https://ipfs.io/ipfs/"+item[0]}>{item[1]}</a> </th>
                <th className="text-right">
                 <Moment format="YYYY/MM/DD" unix>{item[3]}</Moment>
                </th>
                <th className="text-right">
                {item[4]}
                </th>
                <th className="text-right">
                {item[4] === "public" ?  <button  value={item[0]} onClick={this.handleClick33}> Change to friend</button>
               : <button  value={item[0]} onClick={this.handleClick34}> Change to Public</button>} 
               </th>
              </tr>
              )) : null}
            </tbody>
          </Table>
          <br/>
          <br/>
          <br/>
</div>



</div>


<div style={{ display: this.state.hidediv24 ? "block" : "none" }} >
          <h1> View</h1>
          <Table>
            <thead>
              <tr>
                <th width="7%" scope="row">
                  Type
                </th>
                <th className="text-left">File Name</th>
                <th className="text-right">Date</th>
                <th className="text-right">Status</th>
                
              </tr>
            </thead>
        
            <tbody>
              {solidityDrive !== [] ? solidityDrive.map((item, index)=>(
                <tr>
                {/* add social status paramter and display datas through social status parameter */}  
                <th>
                
                  <FileIcon
                    size={30}
                    extension={item[2]}
                    {...defaultStyles[item[2]]}
                  />
                  
                </th>
                <th className="text-left"><a href={"https://ipfs.io/ipfs/"+item[0]}>{item[1]}</a> </th>
                <th className="text-right">
                 <Moment format="YYYY/MM/DD" unix>{item[3]}</Moment>
                </th>
                <th className="text-right">
                {item[4]}
                </th>
                
              </tr>
              )) : null}
            </tbody>
          </Table>
          <br/>
          <br/>
          </div>
          </div>
      </div>
    );
  }
}

export default App;
