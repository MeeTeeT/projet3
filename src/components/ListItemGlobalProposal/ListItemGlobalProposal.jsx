import s from "./style.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { ContractContext } from "providers/ContractProvider/ContractProvider";

import { setCurrentVoteProposal } from "store/voter/voter-slice";


export function ListItemGlobalProposal({ item,titleCol2,id }) {
  const dispatch = useDispatch();
  const currentProposal = useSelector(store => store.VOTER.currentVoteProposal);
  const {contract, addressOwner, userAddress} = useContext(ContractContext);
  
  function setCurVoteProposal(item, id){
    console.log("item",item);
    console.log("id",id);
    if(currentProposal.description == item.description && currentProposal.id == id)
    {
      dispatch(setCurrentVoteProposal({"id":0, "description":""}));
    }
    else{
      dispatch(setCurrentVoteProposal({"id":id, "description":item.description}));
      
    }
  }

  
  

  return (
    <tr onClick={()=>{setCurVoteProposal(item, id)}} 
    className = {item.description == currentProposal.description ? s.proposalSelected : s.proposal}>
      <th>{item.description}</th>
      <td className={s.price}>{titleCol2}</td>
    </tr>
  );
}
