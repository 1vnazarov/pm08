import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Order from './order';

const Orders = (props) => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  useEffect(() => {
    if (!localStorage.token) {
      navigate("/auth")
    }
    fetch("https://exam.сделай.site/order", {headers: {["Authorization"]: `Bearer ${localStorage.token}`}}).then(response => response.json())
    .then(result => {
      console.log(result)
      if (Object.entries(result).length > 0) setOrders(result)
    })
    .catch(error => console.log('error', error));

  }, [])
  return (
    <main style={{ minHeight: '70vh' }}>
      <h2 className="text-center text-white bg-primary m-2">Оформленные заказы</h2>
      <table className="table my-3 mx-auto w-75 table-hover table-responsive">
        <thead>
          <tr>
            <th scope="col">№ п/п</th>
            <th scope="col">Наименование</th>
            <th scope="col">Количество</th>
            <th scope="col">Стоимость</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => <Order data={order}/>)}
        </tbody>
      </table>
    </main>
  );
};

export default Orders;
