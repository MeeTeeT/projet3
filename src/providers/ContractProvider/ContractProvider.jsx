import React, { createContext, useCallback, useEffect, useState, useReducer } from 'react';
import Web3 from 'web3';
import { useDispatch, useSelector } from "react-redux";
import { setConnectedUser,setHasVoted} from "store/auth/auth-slice";
import { changeSessionStatus,addGlobalProposal,addProposal,addVoter,resetVoter,resetProposal } from "store/voter/voter-slice";
import {ABI, CONTRACT_ADDRESS} from "config";

const ContractContext = createContext();

const ContractProvider = ({ children }) => {
  const dispatch = useDispatch();
  const votingStatus = useSelector(store => store.VOTER.status);
  const auth = useSelector(store => store.AUTH.auth);

  const [contract, setContract] = useState(null);
  const [addressOwner, setAddressOwner] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [artifactState, setArtifactState] = useState(null);
  const [networkIDState, setNetworkID] = useState(null);
  
  async function loadContract() {
    const artifact = require("../../contracts/Voting.json");
    try {
      // Vérifier si MetaMask est installé
      if (window.ethereum) {
        
        
        const web3Instance = new Web3(Web3.givenProvider || "ws://localhost:8545");
        const accounts = await web3Instance.eth.requestAccounts();
        const networkID = await web3Instance.eth.net.getId();

        // Charger le contrat
        const { abi } = artifact;
      let address, contract;
     
        address = artifact.networks[networkID].address;
        contract = new web3Instance.eth.Contract(abi, address);
        
        setContract(contract);

        const owner = await contract.methods.owner().call();
        setAddressOwner(owner);
        console.log("owner",owner);


       
        const userAdd = accounts[0];
        setUserAddress(userAdd);
        console.log("user connected",userAdd);

       
        var role = "Owner";
        var hasVoted = false;
        if(owner == userAdd){
         role = "Owner";
        }
        else{
        
           try {
              const voter = await contract.methods.getVoter(userAdd).call({ from: userAdd });
            
            hasVoted = voter.hasVoted;
             console.log('is registred', voter.isRegistered);
            if(voter.isRegistered){role = "Registered";}
            else{role="Other";}
          
          }
        catch (error) {
          role="Other";
          console.error(error.message);
        }
      
        }
       
        dispatch(setConnectedUser({"address":userAdd,"role":role,"hasVoted":hasVoted}));
         
        try {
          const status = await contract.methods.workflowStatus().call({ from: userAdd });
          console.log('return actual status', status);
          dispatch(changeSessionStatus({"previousStatus":status-1,"newStatus":parseInt(status)}));
        } catch (error) {
          console.error("Une erreur s'est produite lors de l'appel de la fonction:", error);
        }

        contract.events.WorkflowStatusChange().on('data',eventData => {
          console.log("Nouvel évenement : ", eventData.returnValues.newStatus);
          dispatch(changeSessionStatus({"previousStatus":eventData.returnValues.previousStatus,"newStatus":eventData.returnValues.newStatus} ));
       
         
        }).on("error", error =>{console.log("erreur lors de lecoute des evenement", error);})

        contract.events.VoterRegistered().on('data',eventData => {
          dispatch(addVoter({"address" : eventData.returnValues.voterAddress, "isRegistered" : true, "hasVoted" : false, "votedProposalId" : 0}));
          console.log("Nouveau votant Registered: ", eventData.returnValues);
       console.log("new voter registered : ",eventData.returnValues);
        }).on("error", error =>{console.log("erreur lors de lecoute des evenement", error);})


        contract.events.ProposalRegistered().on('data',async (eventData) => {
          console.log("Nouvelle proposition Registered: ", eventData.returnValues.proposalId);
          const proposal = await contract.methods.getOneProposal(eventData.returnValues.proposalId).call({ from: userAdd });
          
          dispatch(addProposal({"description" : proposal.description, "voteCount" : proposal.voteCount}));
          
        }).on("error", error =>{console.log("erreur lors de lecoute des evenement", error);})


      contract.events.Voted().on('data',async (eventData) => {
        console.log("new vote done: ", eventData.returnValues.proposalId);
        try {
          dispatch(setHasVoted(true));
        }
        catch (error) {
          console.error(error.message);
        }
    }).on("error", error =>{console.log("erreur lors de lecoute des evenement", error);})
} else {
        console.error("Veuillez installer MetaMask pour interagir avec le contrat.");
      }
    } catch (error) {
      console.error("Une erreur s'est produite lors du chargement du contrat :", error);
    }
  };
  
  useEffect(() => {
    

    loadContract();
  }, []);


  useEffect(() => {
    const events = ["chainChanged", "accountsChanged"];
    const handleChange = () => {
      console.log("changement d'event");
      //loadContract();
      window.location.reload();
    };
 
    events.forEach(e => window.ethereum.on(e, handleChange));
    return () => {
      events.forEach(e => window.ethereum.removeListener(e, handleChange));
    };
  }, []);

//Fill proposal to vote for when user go the page
async function fillProposal(){
  dispatch(resetProposal());
   

  let oldEvents= await contract.getPastEvents('ProposalRegistered', {
    fromBlock: 0,
    toBlock: 'latest'
});
 oldEvents.forEach(async event => {
    console.log("event proposal history",event.returnValues.proposalId);
    try {
      var proposal = await contract.methods.getOneProposal(event.returnValues.proposalId).call({ from: userAddress });
      console.log("proposal ",proposal);
      dispatch(addGlobalProposal({"description" : proposal.description, "voteCount" : parseInt(proposal.voteCount,10)}));
      dispatch(addProposal({"description" : proposal.description, "voteCount" : parseInt(proposal.voteCount,10)}));
    }
    catch(e){
      
      console.error("error:", e);
      
    }

  });


}

//Fill registered voter listwhen user go to page
async function fillVoter(){
  dispatch(resetVoter());
try{
  let oldEvents= await contract.getPastEvents('VoterRegistered', {
    fromBlock: 0,
    toBlock: 'latest'
});
 oldEvents.forEach(async event => {
   dispatch(addVoter({"address" : event.returnValues.voterAddress, "isRegistered" : true, "hasVoted" : false, "votedProposalId" : 0}));
 });
}catch(e){console.log(e);}
}


  useEffect(() => {
    if(votingStatus.newStatus == 0 || votingStatus.newStatus == 1){
      fillVoter();
     
    }
    if(votingStatus.newStatus == 1 || votingStatus.newStatus == 3){
      fillProposal();
    }
  },[votingStatus])


  return (
    <ContractContext.Provider value={{contract : contract, adressOwner : addressOwner, userAddress: userAddress}}>
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractProvider };
