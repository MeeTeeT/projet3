import { useDispatch } from "react-redux";
import { ListItem } from "../ListItem/ListItem";
import s from "./style.module.css";
import { useSelector } from "react-redux";

import { changeSessionStatus } from "store/voter/voter-slice";

export function ButtonVote() {
  const dispatch = useDispatch();
  const currentProposal = useSelector(store => store.VOTER.currentVoteProposal);
  
 function changeStatus(e){
   // e.preventDefault();
   // dispatch(changeSessionStatus(idStatus));
  }

  
 
  return (

  currentProposal ?
    <button onClick={() => console.log(currentProposal.description)} className={`btn btn-primary ${s.btn}`}>
            I vote for proposal : {currentProposal.description}
          </button> : null
  );
}
