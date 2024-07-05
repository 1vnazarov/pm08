import React from "react";

const Order = (props) => {
    return (
        <tr>
            <th scope="row">{props.data.id}</th>
            <td>{Object.values(props.data.products).sort().join("\n")}</td>
            <td>{Object.values(props.data.products).length}</td>
            <td>{props.data.order_price}</td>
            
          </tr>
    )
}

export default Order