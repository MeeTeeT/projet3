import { ListItemProposal } from "../ListItemProposal/ListItemProposal";

export function ListProposal({ items, titleCol2 }) {
  return (
    <div style={{ overflowY: "scroll", height: "20%" }}>
      <table className="table table-hover table-borderless">
        <tbody>
          {
            items.map((item,i)=>{
              return <ListItemProposal key={item+i} item={item} titleCol2={titleCol2}/>
            })

          }
          
        </tbody>
      </table>
    </div>
  );
}
