import s from "./style.module.css";

export function ListItemProposal({ item,titleCol2 }) {

  
  return (
    <tr>
      <th>{item.description}</th>
      <td className={s.price}>{titleCol2}</td>
    </tr>
  );
}
