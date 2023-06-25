import s from "./style.module.css";
import {VoterInput } from "containers/VoterInput/VoterInput";
import { List } from "components/List/List";
import { ListProposal } from "components/ListProposal/ListProposal";
import { useSelector } from "react-redux";
import { Logo } from "components/Logo/Logo";
import { ButtonChangeStatus } from "components/ButtonChangeStatus/ButtonChangeStatus";
import { Login } from "containers/Login/Login";
import { ProposalInput } from "containers/ProposalInput/ProposalInput";
import { ListGlobalProposal } from "components/ListGlobalProposal/ListGlobalProposal";
import { ButtonVote } from "components/ButtonVote/ButtonVote";
import { ContractProvider } from "providers/ContractProvider/ContractProvider";
import Stepper from 'react-stepper-horizontal';

export function App() {
  const voterList = useSelector(store => store.VOTER.voterList);
  var votingStatus = useSelector(store => store.VOTER.status);
  const proposalList = useSelector(store => store.VOTER.proposalList);
  const proposalGlobalList = useSelector(store => store.VOTER.proposalGlobalList);
  const auth = useSelector(store => store.AUTH.auth);

    var currentStep = Number(useSelector(store => store.VOTER.status.newStatus));
 

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
      <Stepper steps={ [
          {title: 'Registering voters'}, 
          {title: 'Start proposal'}, 
          {title: 'End Proposal'}, 
          {title: 'Start Voting'},
          {title: 'End Voting'},
          {title: 'Vote Taillies'}
          ] }  activeColor= "#ff85d1" 
          completeColor= "#ff85d1" 
          activeTitleColor="white" 
          completeTitleColor="white" 
          completeBarColor = "white" 
          activeStep={ currentStep} />
      <br/><br/>

      { auth.role == "Owner" ?

          /* Si le user connecté est le owner du contrat */
          /* => "Owner" dans l'ecran de login */
          <div className={`row ${s.workspace}`}>
          {
            votingStatus.newStatus == 0 && <div className={`col-12  ${s.expense_input}`}>
              <VoterInput />
            </div> 
          }
            
            <div className={`col-11 col-md-6 col-lg-4 ${s.whitelisting_list}`}>
              {votingStatus.newStatus != 5 ?
              <List items={voterList} titleCol2={"Registered"}/>
            : null  
            }
    
              <div className={`col-12 ${s.expense_total}`}>
              <ButtonChangeStatus />
              </div>
            </div>
              
          </div> 
          /* Fin Si owner du contrat */
      : 

      auth.role == "Registered" ?

      /* Si le user connecté whitelisté dans le contrat => "Registered" dans l'ecran de login */
       <div className={`row ${s.workspace}`}>
        {votingStatus.newStatus == 0 ? 
        /* Si Status registering voters, on affiche un message d'attente au users whitelistés */
            
            <> <div className={`col-11 col-md-6 col-lg-4 ${s.msg_info}`}>Registering voters in progress... Stay tuned !</div></> : 

         votingStatus.newStatus == 1 ? 
         /* Si Status start proposal, on affiche la possibilité de renseigner une proposal aux users whitelistés */
            <>
            <div className={`col-12  ${s.expense_input}`}>
                <ProposalInput />
              </div> 
            
              <div className={`col-11 col-md-6 col-lg-4 ${s.whitelisting_list}`}>
                <ListProposal items={proposalList} titleCol2={"Proposed"}/>
                
              </div>
              </>
          : 

         votingStatus.newStatus == 2 ? 
          /* Si Status end proposal , on affiche un message d'attente au users whitelistés */

            <><div className={`col-11 col-md-6 col-lg-4 ${s.msg_info}`}>
         Proposal session is termined... Wait for voting sessions opening</div> </> :
         
         votingStatus.newStatus == 3 ? 
           /* Si Status start voting, on affiche la possibilité de voter */
         auth.hasVoted == false ?
         /* si l'utilisateur n'a pas déja voté, on lui laisse la possiblité de voter */
              <><div className={`col-11 col-md-6 col-lg-4 ${s.msg_info}`}>
                Please vote for a proposal</div><br/>
                  <>
                    <div className={`col-11 col-md-6 col-lg-4 ${s.whitelisting_list}`}>
                      <ListGlobalProposal items={proposalGlobalList} titleCol2={""}/>
                      <div className={`col-12 ${s.expense_total}`}>
                      <ButtonVote />
                      </div>
                    </div>
                  </>
                
                </> :
                /* si l'utilisateur a deja voté, on lui affiche un message */
                <div className={`col-11 col-md-6 col-lg-4 ${s.msg_info}`}>
                Thanks you for your vote. Please wait for next step</div>
          :

         votingStatus.newStatus == 4 ? <> <div className={`col-11 col-md-6 col-lg-4 ${s.msg_info}`}>Session vote ended. Winner annoncment to come</div> </>:
         votingStatus.newStatus == 5 ? <> <div className={`col-11 col-md-6 col-lg-4 ${s.whitelisting_list}`}><ButtonChangeStatus /></div></> :
        "ERROR"
        }

       </div>
       /* Fin user connecté est whitelisté sur le contrat */
       :

       /* Si le user connecté n'est ni le owner, ni whitelisté, on affiche des messages selon les status du workflow de vote*/
       /* => "Other" dans l'ecran de login */
       <div className={`row ${s.workspace}`}>
         {votingStatus.newStatus == 0 ? <><div className={`col-11 col-md-6 col-lg-4 ${s.msg_info}`}><div>Registering voters in progress... Stay tuned !</div> </div></> 
         : votingStatus.newStatus == 1 ||
         votingStatus.newStatus == 2 ||
         votingStatus.newStatus == 3 ||
         votingStatus.newStatus == 4  ? <><div className={`col-11 col-md-6 col-lg-4 ${s.msg_info}`}><div>Sorry... But your are not whitelisted !</div> </div></> 
        :
        <div className={`col-11 col-md-6 col-lg-4 ${s.whitelisting_list}`}><ButtonChangeStatus/></div>
 }
       </div>
      }
    </div>
    </ContractProvider>
  );
}
