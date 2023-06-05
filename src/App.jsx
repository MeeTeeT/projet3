import s from "./style.module.css";
import {VoterInput } from "containers/VoterInput/VoterInput";
import { List } from "components/List/List";
import { ListProposal } from "components/ListProposal/ListProposal";
import { useSelector } from "react-redux";
import { IncomeInput } from "containers/IncomeInput/IncomeInput";
import { ExpenseTotal } from "containers/ExpenseTotal/ExpenseTotal";
import { Logo } from "components/Logo/Logo";
import { ButtonChangeStatus } from "components/ButtonChangeStatus/ButtonChangeStatus";
import { Login } from "containers/Login/Login";
import { ProposalInput } from "containers/ProposalInput/ProposalInput";
import { ListGlobalProposal } from "components/ListGlobalProposal/ListGlobalProposal";
import { ButtonVote } from "components/ButtonVote/ButtonVote";
import { ContractProvider } from "providers/ContractProvider/ContractProvider";

export function App() {
  const voterList = useSelector(store => store.VOTER.voterList);
  const votingStatus = useSelector(store => store.VOTER.status);
  const proposalList = useSelector(store => store.VOTER.proposalList);
  const proposalGlobalList = useSelector(store => store.VOTER.proposalGlobalList);

  //console.log("proposalList",proposalList);

  const auth = useSelector(store => store.AUTH.auth);

  return (
    <ContractProvider>
    <div className={s.main_container}>
      <div className={`row ${s.header}`}>
        <div className={`col-3`}>
          <Logo title={"Voting"} subtitle="Blockchain Voting system"/>
        </div>
        <div className={`col-9 ${s.income_input}`}>
       <Login /> 
        </div>
      </div>
      { auth.role == "Owner" ?

      <div className={`row ${s.workspace}`}>
      {
        votingStatus.newStatus == 0 && <div className={`col-12  ${s.expense_input}`}>
          <VoterInput />
        </div> 
      }
        
        <div className={`col-11 col-md-6 col-lg-4 ${s.expense_list}`}>
          <List items={voterList} titleCol2={"Registered"}/>
          <div className={`col-12 ${s.expense_total}`}>
          <ButtonChangeStatus />
          </div>
        </div>
      </div> : 
      auth.role == "Registered" ?
       <div className={`row ${s.workspace}`}>
        
        {votingStatus.newStatus == 0 ? <><div>Registering voters in progress... Stay tuned !</div> <ButtonChangeStatus /></> : 
         votingStatus.newStatus == 1 ? 
        <>
        <div className={`col-12  ${s.expense_input}`}>
            <ProposalInput />
          </div> 
        
          <div className={`col-11 col-md-6 col-lg-4 ${s.expense_list}`}>
            <ListProposal items={proposalList} titleCol2={"Proposed"}/>
            <div className={`col-12 ${s.expense_total}`}>
            <ButtonChangeStatus />
            </div>
          </div>
          </>
          : 
         votingStatus.newStatus == 2 ? <><div>Proposal session is termined... Wait for voting sessions opening</div> <ButtonChangeStatus /></> : 
         votingStatus.newStatus == 3 ? 
         <><div>Vote for a proposal (click on proposal)</div>
          <>
        
        
          <div className={`col-11 col-md-6 col-lg-4 ${s.expense_list}`}>
            <ListGlobalProposal items={proposalGlobalList} titleCol2={""}/>
            <div className={`col-12 ${s.expense_total}`}>
            <ButtonVote />
            </div>
            <div className={`col-12 ${s.expense_total}`}>
            <ButtonChangeStatus />
            </div>
          </div>
          </>
          
          </> :

         votingStatus.newStatus == 4 ? <><div>Session vote ended. Winner annoncment to come</div> <ButtonChangeStatus /></>:
         votingStatus.newStatus == 5 ? <><div>Let see winner</div> <ButtonChangeStatus /></> :
        "ERROR"
        }

       </div>
       :
       <div className={`row ${s.workspace}`}>
         {votingStatus.newStatus == 0 ? <><div>Registering voters in progress... Stay tuned !</div> <ButtonChangeStatus /></> 
         : votingStatus.newStatus == 1 ||
         votingStatus.newStatus == 2 ||
         votingStatus.newStatus == 3 ||
         votingStatus.newStatus == 4  ? <><div>Sorry... But your are not whitelisted !</div> <ButtonChangeStatus /></> 
        :<ButtonChangeStatus/>
 }
       </div>
      }
    </div>
    </ContractProvider>
  );
}
