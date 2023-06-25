import { useDispatch } from "react-redux";
import { addVoter } from "store/voter/voter-slice";
import s from "./style.module.css";
import { ContractContext } from "providers/ContractProvider/ContractProvider";
import { useContext } from "react";
import { useSelector } from "react-redux";


export function VoterInput(props) {
  const voterList = useSelector(store => store.VOTER.voterList);
const dispatch = useDispatch();
const {contract, addressOwner, userAddress} = useContext(ContractContext);

async function  submit(e){
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const address = formData.get("address");
  console.log(voterList, voterList.length);
  for(var i=0;i<voterList.length;i++){
    console.log("voter list i", voterList[i].address);
    if(voterList[i].address == address){
      alert("Address "+address+" has already been registered");
      return
    }
    
  }
  
  console.log(address);

 try {
  
  await contract.methods.addVoter(address).send( { from: userAddress });
  console.log('La fonction du contrat a été exécutée avec succès.');


} catch (error) {
  alert("An error occurs : ",error);
  console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
}
 
 
}
  

  return (
    <form onSubmit={submit}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-5 col-md-4 col-lg-9 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder='Voter address to register'
            name="address"
          />
        </div>

        <div className="col-12 col-sm-2 col-md-4 col-lg-3 mb-2">
          <button type="submit" className={`btn btn-primary ${s.btn}`}>
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
