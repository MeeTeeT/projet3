import { ListItemGlobalProposal } from "../ListItemGlobalProposal/ListItemGlobalProposal";

export function ListGlobalProposal({ items, titleCol2 }) {
  return (
    <div style={{ overflowY: "scroll", height: "20%" }}>
      <table className="table table-hover table-borderless">
        <tbody>
          {
            items.map((item,i)=>{
              return <ListItemGlobalProposal key={item+i} item={item} id={i+1} titleCol2={titleCol2}/>
            
            })

          }
          
        </tbody>
      </table>
    </div>
  );
}
