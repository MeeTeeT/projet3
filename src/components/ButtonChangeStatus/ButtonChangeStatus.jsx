import { useDispatch } from "react-redux";
import { ListItem } from "../ListItem/ListItem";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { } from "store/auth/auth-slice";
//import CircularJSON from 'circular-json';
import { ContractContext } from "providers/ContractProvider/ContractProvider";
import { changeSessionStatus } from "store/voter/voter-slice";

export function ButtonChangeStatus() {
  const dispatch = useDispatch();
  const winningId = null;
  const {contract, addressOwner, userAddress} = useContext(ContractContext);
  const votingStatus = useSelector(store => store.VOTER.status);

  let statusTitle = "RegisteringVoters";
  //var newStatus = {"previousStatus":0,"newStatus":0};
           

  if(votingStatus.newStatus == 0){
    statusTitle = "Start proposal Registration";
    //newStatus = {"previousStatus":0,"newStatus":1};
  }
  else if(votingStatus.newStatus == 1){
    statusTitle = "End proposal Registration";
    //newStatus = {"previousStatus":1,"newStatus":2};
  }
  else if(votingStatus.newStatus ==2){
    statusTitle = "Start Voting Session";
    //newStatus = {"previousStatus":2,"newStatus":3};
  }
  else if(votingStatus.newStatus ==3){
    statusTitle = "End Voting Session";
    //newStatus = {"previousStatus":3,"newStatus":4};
  }
  else if(votingStatus.newStatus ==4){
    statusTitle = "Taillied votes";
    //newStatus = {"previousStatus":4,"newStatus":5};
  }
  

 // function nextStep(votingStatus){
   // e.preventDefault();
   //console.log("valeur de statut a changer",e);
    
    //mettre a jour la Blockchain
    const nextStep = async (votingStatus) => {
      try {
        if(votingStatus.newStatus == 0)
        {
          
          try {
            // Appeler une fonction du contrat
            //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
            await contract.methods.startProposalsRegistering().send({ from: userAddress });
            console.log('La fonction du contrat a été exécutée avec succès.');
            
            //console.log('return ', status);
         
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }

        }
        else if ((votingStatus.newStatus == 1)) {
         
          try {
            // Appeler une fonction du contrat
            //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
            await contract.methods.endProposalsRegistering().send({ from: userAddress });
            console.log('La fonction du contrat a été exécutée avec succès.');
            
            //console.log('return ', status);
         
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }

        }
        else if ((votingStatus.newStatus == 2)) {
         
          try {
            // Appeler une fonction du contrat
            //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
            await contract.methods.startVotingSession().send({ from: userAddress });
            console.log('La fonction du contrat a été exécutée avec succès.');
            
            //console.log('return ', status);
         
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }
        }
        else if ((votingStatus.newStatus == 3)) {
          try {
            // Appeler une fonction du contrat
            //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
            await contract.methods.endVotingSession().send({ from: userAddress });
            console.log('La fonction du contrat a été exécutée avec succès.');
            
            //console.log('return ', status);
         
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }
          
        }
        else if ((votingStatus.newStatus == 4)) {
          try {
            // Appeler une fonction du contrat
            //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
            await contract.methods.tallyVotes().send({ from: userAddress });
             console.log('La fonction du contrat a été exécutée avec succès.');
            
            //console.log('return ', status);
         
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }
         
        //  console.log('return ', status);
        }
        else{
           winningId = await contract.methods.winningProposalId().call({ from: userAddress });
           
        }
       // dispatch(changeSessionStatus(e));
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'appel de la fonction:", error);
      }
    };
  //}

  
 
  return (

   
    
    votingStatus.newStatus == 5 ? <div className={s.voteFinish}> Vote finished !!! winner is {winningId} </div> :
    <button onClick={() => nextStep(votingStatus)} className={`btn btn-primary ${s.btn}`}>
            Next step : {statusTitle}
          </button>
  );
}
