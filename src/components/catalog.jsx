import React, { useEffect, useState } from "react";
import Product from "./product";

const Catalog = () => {
    const [products, setProducts] = useState([])
    useEffect( () => {
    fetch("https://exam.сделай.site/products")
  .then(response => response.json())
  .then(result => {
    setProducts(result)
  })
  .catch(error => console.log('error', error));
    }, [])
    return <main style={{ minHeight: "70vh", minWidth: 320 }} className="w-75 m-auto">
    <h2 className="text-center text-white bg-primary m-2">Каталог товаров</h2>
    <div className="d-flex flex-row flex-wrap justify-content-around">
        {products.map((product) => <Product data={product}/>)}
    </div>
  </main>
  
}

export default Catalog