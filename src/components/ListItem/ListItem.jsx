import s from "./style.module.css";

export function ListItem({ item,titleCol2 }) {
  return (
    <tr>
      <th>{item.address}</th>
      <td className={s.price}>{titleCol2}</td>
    </tr>
  );
}
