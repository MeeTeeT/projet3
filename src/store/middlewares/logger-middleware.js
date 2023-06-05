import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {addExpense, setIncome, incrementCountActionPerformed} from "store/expense/expense-slice";
export const loggerMiddleWare = createListenerMiddleware();

loggerMiddleWare.startListening({
    /*
    predicate:(action) => {
        return action.type === "expenseSlice/addExpense" || "expenseSlice/setIncome";
    },
    */
    matcher : isAnyOf(addExpense,setIncome),
    effect: async (action, listenerAPI) =>{
        //console.log(action);
        listenerAPI.dispatch(incrementCountActionPerformed());
        //console.log(listenerAPI.getState());
    }
})