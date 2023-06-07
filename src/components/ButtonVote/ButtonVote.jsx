import { useDispatch } from "react-redux";
import { ListItem } from "../ListItem/ListItem";
import s from "./style.module.css";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { ContractContext } from "providers/ContractProvider/ContractProvider";

import { changeSessionStatus } from "store/voter/voter-slice";

export function ButtonVote() {
  const dispatch = useDispatch();
  const currentProposal = useSelector(store => store.VOTER.currentVoteProposal);
  const {contract, addressOwner, userAddress} = useContext(ContractContext);

 function changeStatus(e){
   // e.preventDefault();
   // dispatch(changeSessionStatus(idStatus));
  }
  async function voteForCurrentProposal(id){
    // e.preventDefault();
      //const formData = new FormData(e.currentTarget);
      //const proposal = formData.get("proposal");
    // console.log(proposal);
    // dispatch(addVoter({address}));
    //dispatch(setCurrentVoteProposal(item));
    //voter dans la BC pour cette proposition
    try {
        // Appeler une fonction du contrat
        //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
        await contract.methods.setVote(id).send( { from: userAddress });
        console.log('La fonction du contrat a été exécutée avec succès.');
        console.log("vous avez votez pour la proposition", id);
    } catch (error) {
        console.error(error.message);
    }
 
  }
  
 
  return (

  currentProposal.id != 0 ?
    <button onClick={
      () => voteForCurrentProposal(currentProposal.id)
    } 
    className={`btn btn-primary ${s.btn}`}>
            I vote for proposal : {currentProposal.description}
          </button> : 
          <button disabled  className={`btn btn-primary ${s.btn}`}>
            Pick a proposal to vote
          </button>
  );
}
