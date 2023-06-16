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
//console.log(ABI);
  const dispatch = useDispatch();
  //const contract = useContext(ContractContext.contract);
  //const addressOwner = useContext(ContractContext.addressOwner);
  const {contract, addressOwner, userAddress} = useContext(ContractContext);

  //console.log("login useraddress", userAddress);
  
  //const userConnected = useSelector(store => store.AUTH.auth);
  //dispatch(addProposal({"description" : proposal, "voteCount" : 0}));
  
 /*
const contract = useContext(ContractContext);
  const [contractInstance, setContractInstance] = useState(null);
  const loadContract = async () => {
    // Connexion au fournisseur Web3 (par exemple, MetaMask)
    if (window.ethereum) {
      await window.ethereum.enable();
      const web3Instance = new Web3(window.ethereum);
      
      // Création de l'instance du contrat
      const contract = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS);
      const owner = await contract.methods.owner().call();
      console.log("contract",contract);
      console.log("contract",contract.U);
      setContractInstance(contract);
     // dispatch(setContract(CircularJSON.stringify(contract)));
     //dispatch(setContract(contract));

    const accounts = await web3Instance.eth.getAccounts();
    const userAddress = accounts[0];
    var role = "Owner";

   
   if(owner == userAddress){
    role = "Owner";
   }
   else{
    role = "Registered";
   }

   dispatch(setConnectedUser({"address":userAddress,"role":role}));
      
    }
  };

  useEffect(() => {
    
    
    loadContract();
  }, []);
*/
/*
  useEffect(() => {
    if (contractInstance) {
      const listenToEvents = async () => {
        contractInstance.events.WorkflowStatusChange({}, (error, event) => {
          if (error) {
            console.error(error);
          } else {
            // Récupération de la nouvelle valeur à partir de l'événement
            const newStatus = {"previousStatus":event.returnValues.previousStatus,"newStatus":event.returnValues.newStatus}
            //setValue(newStatus);
            dispatch(changeSessionStatus(newStatus));

          }
        });
      };

      listenToEvents();
    }
  }, [contractInstance]);
*/

const auth = useSelector((store) => store.AUTH.auth);
  //const dispatch = useDispatch();
//console.dir("auth",auth);


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
