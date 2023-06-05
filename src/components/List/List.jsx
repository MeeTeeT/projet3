import { ListItem } from "../ListItem/ListItem";

export function List({ items, titleCol2 }) {
  return (
    <div style={{ overflowY: "scroll", height: "40%" }}>
      <table className="table table-hover table-borderless">
        <tbody>
          {
            items.map((item,i)=>{
              return <ListItem key={item+i} item={item} titleCol2={titleCol2}/>
            })

          }
          
        </tbody>
      </table>
    </div>
  );
}
