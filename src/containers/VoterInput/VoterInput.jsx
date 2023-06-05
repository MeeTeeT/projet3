import { useDispatch } from "react-redux";
import { addVoter } from "store/voter/voter-slice";
import s from "./style.module.css";
import { ContractContext } from "providers/ContractProvider/ContractProvider";
import { useContext } from "react";

export function VoterInput(props) {
const dispatch = useDispatch();
const {contract, addressOwner, userAddress} = useContext(ContractContext);

async function  submit(e){
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const address = formData.get("address");
  console.log(address);
 // dispatch(addVoter({address}));
 try {
  // Appeler une fonction du contrat
  //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
  await contract.methods.addVoter(address).send( { from: userAddress });
  console.log('La fonction du contrat a été exécutée avec succès.');
  dispatch(addVoter({"address" : address, "isRegistered" : true, "hasVoted" : false, "votedProposalId" : 0}));

  //console.log('return ', status);

} catch (error) {
  console.error('Une erreur s\'est produite lors de l\'exécution de la fonction du contrat :', error);
}
 
 
}
  

  return (
    <form onSubmit={submit}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-5 col-md-4 col-lg-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder='Address to register"'
            name="address"
          />
        </div>

        <div className="col-12 col-sm-2 col-md-4 col-lg-4 mb-2">
          <button type="submit" className={`btn btn-primary ${s.btn}`}>
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
