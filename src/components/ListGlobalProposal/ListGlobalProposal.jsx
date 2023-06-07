import { ListItemGlobalProposal } from "../ListItemGlobalProposal/ListItemGlobalProposal";

export function ListGlobalProposal({ items, titleCol2 }) {
  return (
    <div style={{ overflowY: "scroll", height: "20%" }}>
      <table className="table table-hover table-borderless">
        <tbody>
          {
            items.map((item,i)=>{
              return (i != 0) ? 
              <ListItemGlobalProposal key={item+i} item={item} id={i} titleCol2={titleCol2}/>
              : null
            })

          }
          
        </tbody>
      </table>
    </div>
  );
}
