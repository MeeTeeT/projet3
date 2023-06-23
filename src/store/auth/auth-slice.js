import {createSlice} from "@reduxjs/toolkit";
import { number } from "prop-types";

export const authSlice = createSlice({
    name:"authSlice",
    initialState:{
        auth:{address:null,role:""},
    },
    reducers:{
        setConnectedUser:(currentSlice, action)=>{
           // currentSlice.voterList.push({...action.payload});
           currentSlice.auth = action.payload;
        },
        setHasVoted:(currentSlice, action)=>{
            // currentSlice.voterList.push({...action.payload});
            console.log("reducer", action.payload);
            currentSlice.auth.hasVoted = action.payload;
         },
      
 

    }

})


const {setConnectedUser,setHasVoted} = authSlice.actions;
export {setConnectedUser,setHasVoted};