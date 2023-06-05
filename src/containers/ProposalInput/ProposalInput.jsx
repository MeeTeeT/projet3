import { useDispatch, useSelector } from "react-redux";
import { addProposal } from "store/voter/voter-slice";
import s from "./style.module.css";
import { ContractContext } from "providers/ContractProvider/ContractProvider";
import { useContext } from "react";


export function ProposalInput(props) {
  const dispatch = useDispatch();
  const {contract, addressOwner, userAddress} = useContext(ContractContext);
  
console.log(contract);

async function submit(e){
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const proposal = formData.get("proposal");
  console.log(proposal);
  try {
    // Appeler une fonction du contrat
    //await contractInstance.methods.functionName().send({ from: '0x...' }); // Adresse du compte depuis lequel vous souhaitez exécuter la fonction
    await contract.methods.addProposal(proposal).send( { from: userAddress });
    console.log('La fonction du contrat a été exécutée avec succès.');
    dispatch(addProposal({"description" : proposal, "voteCount" : 0}));

    //console.log('return ', status);
  
  } catch (error) {
    console.error(error.message);
  }
 
 
}
  

  return (
    <form onSubmit={submit}>
      <div className="row justify-content-center">
        <div className="col-12 col-sm-5 col-md-4 col-lg-8 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder='Proposal to register"'
            name="proposal"
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
