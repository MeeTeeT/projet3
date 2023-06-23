import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

import { addProposal } from "store/voter/voter-slice";
export const loggerMiddleWare = createListenerMiddleware();

loggerMiddleWare.startListening({
    /*
    predicate:(action) => {
        return action.type === "voterSlice/addProposal";
    },
    */

    matcher : isAnyOf(addProposal),
    effect: async (action, listenerAPI) =>{
        //console.log(action);
        //listenerAPI.dispatch();
        //console.log(listenerAPI.getState());
    }
})