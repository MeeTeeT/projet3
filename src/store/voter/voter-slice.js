import {createSlice} from "@reduxjs/toolkit";
import { number } from "prop-types";

export const voterSlice = createSlice({
    name:"voterSlice",
    initialState:{
      voterList:[],
      status:{"previousStatus" :0,"newStatus":0},
      proposalList:[],
      proposalGlobalList:[],
      currentVoteProposal:0
    },
    reducers:{
        addVoter:(currentSlice, action)=>{
           // currentSlice.voterList.push({...action.payload});
           currentSlice.voterList.push(action.payload);
        },
        changeSessionStatus:(currentSlice, action)=>{
            // currentSlice.voterList.push({...action.payload});
            currentSlice.status.newStatus = action.payload.newStatus;
            currentSlice.status.previousStatus = action.payload.previousStatus;
         },
         addProposal:(currentSlice, action)=>{
            //currentSlice.proposal.push({...action.payload, });
            currentSlice.proposalList.push(action.payload);
            currentSlice.proposalGlobalList.push(action.payload);
         },
         setCurrentVoteProposal:(currentSlice, action)=>{
            currentSlice.currentVoteProposal = action.payload;
            
         },
         addGlobalProposal:(currentSlice, action)=>{
            currentSlice.proposalGlobalList.push(action.payload);
         },
 

    }

})


const {addVoter,changeSessionStatus,addProposal,setCurrentVoteProposal,addGlobalProposal} = voterSlice.actions;
export {addVoter,changeSessionStatus,addProposal,setCurrentVoteProposal,addGlobalProposal};