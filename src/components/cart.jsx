import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function Cart() {
  const [cartItems, setCartItems] = useState([])
  const [trueCartItems, setTrueCartItems] = useState([])
  const [total, setTotal] = useState(0)
const navigate = useNavigate()
  const update = () => {
    if (!localStorage.token) {
      navigate("/auth")
      return
    }
    fetch("https://exam.сделай.site/cart", {headers: {"Authorization": `Bearer ${localStorage.token}`}}).then(response => response.json())
    .then(result => {
      console.log(result)
      if (result.error) {
        navigate("/auth")
      }
      setTrueCartItems(result)
      const counts = result.reduce((acc, product) => {
        acc[product.product_id] = (acc[product.product_id] || 0) + 1
        return acc
        }, {})
        result = result.map(product => ({
          ...product,
          quantity: counts[product.product_id]
          }))
      setCartItems(result)
        setTotal(result.reduce((acc, product) => {
          console.log(acc, product)
          acc += product.price
          return acc
        }, 0))
  })
    .catch(error => console.log('error', error));
  }

  useEffect(() => {
    update()
  }, [])

  return (
    <main style={{ minHeight: '70vh' }}>
      <h2 className="text-center text-white bg-primary m-2">Корзина</h2>
      <table className="table my-3 mx-auto w-75 table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">№ п/п</th>
            <th scope="col">Наименование</th>
            <th scope="col">Описание</th>
            <th scope="col">Количество</th>
            <th scope="col">Стоимость</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.filter((val, index, array) => array.map(item => item.product_id).indexOf(val.product_id) === index).map((item, index) => (
            <tr key={item.id}>
              <th scope="row">{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.quantity}</td>
              <td>{item.quantity * item.price}</td>
              <td>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={async () => {
                    await fetch(`https://exam.сделай.site/cart/${item.product_id}`, {method: "POST", headers: {"Authorization": `Bearer ${localStorage.token}`}})
                    update()
                  }}
                >
                  +
                </button>
              </td>
              <td>
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={async () => {
                    await fetch(`https://exam.сделай.site/cart/${item.id}`, {method: "DELETE", headers: {"Authorization": `Bearer ${localStorage.token}`}})
                    update()
                    if (item.quantity == 0) delete cartItems[cartItems.indexOf(item)]
                  }}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fw-bold text-end w-75 m-auto">Итого: {total} руб</p>
      <button type="button" className="btn btn-primary mx-5" onClick={() => {
            fetch("https://exam.сделай.site/order", {method:"POST", headers: {"Content-Type": "application/json", "Authorization": `Bearer ${localStorage.token}`}}).then(response => response.json())
            .then(result => {
              console.log(result)
            })
      }}>Оформить заказ</button>
    </main>
  )
}

export default Cart