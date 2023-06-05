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
      
 

    }

})


const {setConnectedUser} = authSlice.actions;
export {setConnectedUser};