import React from "react";
import { useNavigate } from "react-router";

const Product = (props) => {
  const navigate = useNavigate()
    return       <div
    className="d-flex flex-row flex-wrap border m-3 p-3"
    style={{ minWidth: 300, width: "45%" }}
  >
    <p className=" text-primary" style={{ minWidth: 250, width: "45%" }}>
      id:
    </p>
    <p className="" style={{ minWidth: 250, width: "45%" }}>
      {props.data.id}
    </p>
    <p className=" text-primary" style={{ minWidth: 250, width: "45%" }}>
      Название товара:
    </p>
    <p className="" style={{ minWidth: 250, width: "45%" }}>
      {props.data.name}
    </p>
    <p className=" text-primary" style={{ minWidth: 250, width: "45%" }}>
      Описание:
    </p>
    <p className="" style={{ minWidth: 250, width: "45%" }}>
        {props.data.description}
    </p>
    <p className=" text-primary" style={{ minWidth: 250, width: "45%" }}>
      Цена:
    </p>
    <p className="" style={{ minWidth: 250, width: "45%" }}>
      {props.data.price} руб
    </p>
    <button type="button" onClick={() => {
          fetch(`https://exam.сделай.site/cart/${props.data.id}`, {method: "POST", headers: {"Authorization": `Bearer ${localStorage.token}`}}).then(response => response.json())
          .then(result => {
            console.log(result)
            if (result.error) {
              navigate("/auth")
            }
          })
          .catch(error => console.log('error', error));
    }} className="btn btn-primary w-50">
      Купить
    </button>
    {localStorage.token === "Dcs0AKSZTxlrHUcv5MK7u2yIXvPLpGdXgdRflZ6NZEtHwRIE3PYjO8W4mLxS5c6epvxYzhRgpjKWz6EH" && <button type="button" onClick={() => {
          fetch(`https://exam.сделай.site/product/${props.data.id}`, {method: "DELETE", headers: {"Authorization": `Bearer ${localStorage.token}`}})
          .then(result => {
            console.log(result)
              window.location.reload()
            })
          .catch(error => console.log('error', error));
    }} className="btn btn-danger w-25 mx-2">
      Удалить
    </button>}
  </div>
}

export default Product