import React, { createContext, useEffect, useState } from 'react';
import Web3 from 'web3';
import { useDispatch, useSelector } from "react-redux";
import { setConnectedUser} from "store/auth/auth-slice";
import { changeSessionStatus,addGlobalProposal,addProposal,addVoter } from "store/voter/voter-slice";
import {ABI, CONTRACT_ADDRESS} from "config";

const ContractContext = createContext();

const ContractProvider = ({ children }) => {
  const dispatch = useDispatch();
  const votingStatus = useSelector(store => store.VOTER.status);

  const [contract, setContract] = useState(null);
  const [addressOwner, setAddressOwner] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  
  useEffect(() => {
    const loadContract = async () => {
      try {
        // Vérifier si MetaMask est installé
        if (window.ethereum) {
          // Activer MetaMask
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);

          // Charger le contrat
          const contract = await new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS);
          setContract(contract);

          const owner = await contract.methods.owner().call();
          setAddressOwner(owner);
          console.log("owner",owner);


          const accounts = await web3Instance.eth.getAccounts();
          const userAdd = accounts[0];
          setUserAddress(userAdd);
          console.log("user connected",userAdd);

         
            var role = "Owner";
            if(owner == userAdd){
             role = "Owner";
            }
            else{
              try {
                const voter = await contract.methods.getVoter(userAdd).call({ from: userAdd });
                console.log('is registred', voter.isRegistered);
              if(voter.isRegistered){role = "Registered";}
              else{role="Other";}
             
            }
           // dispatch(changeSessionStatus({"previousStatus":status-1,"newStatus":parseInt(status)}));
           catch (error) {
            role="Other";
            console.error(error.message);
          }}

         
          dispatch(setConnectedUser({"address":userAdd,"role":role}));
           
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
           // dispatch(changeSessionStatus({"previousStatus":eventData.previousStatus,"newStatus":eventData.newStatus} ));
         console.log("new voter registered : ",eventData.returnValues);
          }).on("error", error =>{console.log("erreur lors de lecoute des evenement", error);})

          contract.events.ProposalRegistered().on('data',async (eventData) => {
            console.log("Nouvelle proposition Registered: ", eventData.returnValues.proposalId);
           // dispatch(changeSessionStatus({"previousStatus":eventData.previousStatus,"newStatus":eventData.newStatus} ));
         
         const proposal = await contract.methods.getOneProposal(eventData.returnValues.proposalId).call({ from: userAdd });
          //on push dans le tableau redux des proposal proposalGlobalList
         dispatch(addProposal({"description" : proposal.description, "voteCount" : proposal.voteCount}));
         //dispatch(addGlobalProposal({"description" : proposal.description, "voteCount" : proposal.voteCount}));
        
        }).on("error", error =>{console.log("erreur lors de lecoute des evenement", error);})

        contract.events.Voted().on('data',async (eventData) => {
          console.log("new vote done: ", eventData.returnValues.proposalId);
         // dispatch(changeSessionStatus({"previousStatus":eventData.previousStatus,"newStatus":eventData.newStatus} ));
       
       //const proposal = await contract.methods.getOneProposal(eventData.returnValues.proposalId).call({ from: userAdd });
        //on push dans le tableau redux des proposal proposalGlobalList
       //dispatch(addProposal({"description" : proposal.description, "voteCount" : proposal.voteCount}));
       //dispatch(addGlobalProposal({"description" : proposal.description, "voteCount" : proposal.voteCount}));
      
      }).on("error", error =>{console.log("erreur lors de lecoute des evenement", error);})

        
          

        } else {
          console.error("Veuillez installer MetaMask pour interagir avec le contrat.");
        }
      } catch (error) {
        console.error("Une erreur s'est produite lors du chargement du contrat :", error);
      }
    };

    loadContract();
  }, []);

async function fillProposal(){
  var erreur = false;
  var i = 0;
  //recuperer la liste des proposal et la stocker dans le store
 //dispatch(addGlobalProposal({"description" : proposal, "voteCount" : 0}));

while(erreur == false){
  try {
    var proposal = await contract.methods.getOneProposal(i).call({ from: userAddress });
    i++;
    console.log("proposal ",i," ",proposal);
    dispatch(addGlobalProposal({"description" : proposal.description, "voteCount" : parseInt(proposal.voteCount,10)}));
  }
  catch{
    erreur = true;
    //console.error("Une erreur s'est produite lors de l'appel de la fonction:", error);
    
  }
  
}
}

  useEffect(() => {
    if(votingStatus.newStatus == 3){
      fillProposal();
     
    }
  },[votingStatus])

  /*
  useEffect(() => {
    const loadProposal = async () => {
      const proposalArray = await contract.methods.proposalArray().call({ from: userAddress });
      console.log("proposal",proposalArray);
     // dispatch(addGlobalProposal({"description" : proposal.description, "voteCount" : proposal.voteCount}));
        
    }},[])
*/
  return (
    <ContractContext.Provider value={{contract : contract, adressOwner : addressOwner, userAddress: userAddress}}>
      {children}
    </ContractContext.Provider>
  );
};

export { ContractContext, ContractProvider };
