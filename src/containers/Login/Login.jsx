import s from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import Web3 from 'web3';
import {ABI, CONTRACT_ADDRESS} from "config";
import { useState, useEffect } from "react";
import { setWeb3 , setContract} from "store/web3/web3-slice";
import { setConnectedUser} from "store/auth/auth-slice";

import { changeSessionStatus } from "store/voter/voter-slice";
import { } from "store/auth/auth-slice";
//import CircularJSON from 'circular-json';
import { ContractContext } from "providers/ContractProvider/ContractProvider";



export function Login(props) {

  const dispatch = useDispatch();
  
  const {contract, addressOwner, userAddress} = useContext(ContractContext);

 

const auth = useSelector((store) => store.AUTH.auth);

  return (
    <div className="row justify-content-center mb-2">
      
{

userAddress == null ?
 <div  className={`col-6 ${s.label}`}>Se connecter</div> :
 
      <div className={`col-6 ${s.label}`}>{userAddress.substring(0, 3)+"..."+userAddress.substring(userAddress.length - 3)}</div>
     
}
      <div className="col-6">
       {auth.role}
      </div>
    </div>
  );
}
