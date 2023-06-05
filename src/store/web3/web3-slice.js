import {createSlice} from "@reduxjs/toolkit";
import { number } from "prop-types";
import CircularJSON from 'circular-json';

export const web3Slice = createSlice({
    name:"web3slice",
    initialState:{
      web3:null,
      contract:null,
    },
    reducers:{
      
        setWeb3:(currentSlice, action)=>{
           // currentSlice.voterList.push({...action.payload});
           currentSlice.web3 = {...action.payload};
        },
        setContract:(currentSlice, action)=>{
         // currentSlice.voterList.push({...action.payload});
         currentSlice.contract = {...action.payload};
        // currentSlice.contract = Object.assign({}, CircularJSON.stringify(action.payload));
      },
       
 

    }

})


const {setWeb3,setContract} = web3Slice.actions;
export {setWeb3,setContract};
