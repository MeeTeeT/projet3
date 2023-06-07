import { useDispatch, useSelector } from "react-redux";
import { ListItem } from "../ListItem/ListItem";
import s from "./style.module.css";
import { useContext, useState,useEffect } from "react";
import { } from "store/auth/auth-slice";
//import CircularJSON from 'circular-json';
import { ContractContext } from "providers/ContractProvider/ContractProvider";
import { changeSessionStatus } from "store/voter/voter-slice";

export function ButtonChangeStatus() {
  const dispatch = useDispatch();
  const userConnected = useSelector(store => store.AUTH.auth);

  var [_winningId,setWinningId] = useState(0);
  var [_winnerName,setWinnerName] = useState("");

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
  else if(votingStatus.newStatus ==5){
    //loadWinner();
   // statusTitle = "Taillied votes";
    //newStatus = {"previousStatus":4,"newStatus":5};
  }
  
  useEffect(() => {
    const loadWinner = async () => {
  
      var winningId = await contract.methods.winningProposalID().call({ from: userAddress });
      console.log("id ",winningId);
      setWinningId(winningId);
      console.log("role : ",userConnected.role);
      if(userConnected.role == "Registered"){
        var winnerName = await contract.methods.getOneProposal(winningId).call({ from: userAddress });
        setWinnerName(winnerName);
        console.log("winner name ",winnerName);
      }
    }
   if(contract){
    loadWinner();
   }
    
  },[contract,userAddress,userConnected.role, votingStatus])
  

    const nextStep = async (votingStatus) => {
      try {
        if(votingStatus.newStatus == 0)
        {
          
          try {
            await contract.methods.startProposalsRegistering().send({ from: userAddress });
            console.log('La fonction du contrat a été exécutée avec succès.');
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }

        }
        else if ((votingStatus.newStatus == 1)) {
         
          try {
           await contract.methods.endProposalsRegistering().send({ from: userAddress });
            console.log('La fonction du contrat a été exécutée avec succès.');
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }

        }
        else if ((votingStatus.newStatus == 2)) {
         
          try {
              await contract.methods.startVotingSession().send({ from: userAddress });
              console.log('La fonction du contrat a été exécutée avec succès.');
          } catch (error) {
              console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }
        }
        else if ((votingStatus.newStatus == 3)) {
          try {
            await contract.methods.endVotingSession().send({ from: userAddress });
            console.log('La fonction du contrat a été exécutée avec succès.');
          
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }
          
        }
        else if ((votingStatus.newStatus == 4)) {
          try {
            await contract.methods.tallyVotes().send({ from: userAddress });
          } catch (error) {
            console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
          }
         
        }
        else{
          
        }
   
      } catch (error) {
        console.error("Une erreur s'est produite lors de l'appel de la fonction:", error);
      }
    };


  
 
  return (
        votingStatus.newStatus == 5 ? 
        <div className={s.voteFinish}> Vote finished !!! <br/>
            {
            ((_winnerName == "") && (_winningId == 0)) ? " Loading winner ..." 
            : (_winnerName != "") ?  `  Winner is ${_winnerName.description}`
                                  : ` Winner is ${_winningId}`
            }
             </div> :
        <button onClick={() => nextStep(votingStatus)} className={`btn btn-primary ${s.btn}`}>
                Next step : {statusTitle}
              </button>
  );
}
