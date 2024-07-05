import React from "react";
import logo from "../image/logo.jpg"
import { Link } from "react-router-dom";
const Header = () => {
    return <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-">
      <div className="container-fluid">
        <Link className="navbar-brand" to={"/"}>
          <img src={logo} className="w-25 rounded-3" alt="logo" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to={"/"}>
                Каталог
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/register"}>
                Регистрация
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/auth"}>
                Вход в систему
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/cart"}>
                Корзина
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/orders"}>
                Оформленные заказы
              </Link>
            </li>
            
            {localStorage.token && <li className="nav-item nav-link text-danger" style={{"cursor": "pointer"}} onClick={() => {
              localStorage.clear()
            }}>
              Выход
            </li>}
          </ul>
        </div>
      </div>
    </nav>
  </header>
  
}

export default Header