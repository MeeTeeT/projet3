import s from "./style.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ContractContext } from "providers/ContractProvider/ContractProvider";

import { setCurrentVoteProposal } from "store/voter/voter-slice";


export function ListItemGlobalProposal({ item,titleCol2,id }) {
  const dispatch = useDispatch();
  const {contract, addressOwner, userAddress} = useContext(ContractContext);

  const currentProposal = useSelector(store => store.VOTER.currentVoteProposal);
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
    <tr onClick={()=>{voteForCurrentProposal(id)}} 
    className = {item.description == currentProposal.description ? s.proposalSelected : s.proposal}>
      <th>{item.description}</th>
      <td className={s.price}>{titleCol2}</td>
    </tr>
  );
}
