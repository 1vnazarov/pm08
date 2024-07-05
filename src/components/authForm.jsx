import React, { useRef } from "react"
import { useNavigate } from "react-router"

const AuthForm = () => {
  const form = useRef()
  const navigate = useNavigate()
  const auth = (e) => {
    e.preventDefault()
    if (!form.current.checkValidity()) {
      e.stopPropagation()
      form.current.classList.add('was-validated')
      return
    }
    const data = new FormData(form.current)
    fetch("https://exam.сделай.site/login", {
      method: "POST",
      headers: { ["Content-Type"]: "application/json" },
      body: JSON.stringify({ "email": data.get("email"), "password": data.get("password") })
    })
      .then(response => response.json())
      .then(result => {
        console.log(result)
        localStorage.token = result?.data.user_token
        if (localStorage.token) navigate("/auth")
      })
      .catch(error => console.log('error', error));
  }


return (
  <main style={{ minHeight: '70vh' }}>
    <h2 className="text-center text-white bg-primary m-2">Аутентификация</h2>
    <div className="p-3">
      <form className="w-50 m-auto p-5 was-validated" style={{ minWidth: 300 }} noValidate onSubmit={auth} ref={form}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Почта</label>
          <input name='email' type="email" className="form-control" id="validationTextarea" aria-describedby="emailHelp" required />
          <div className="form-text">Мы никогда не делимся Вашими e-mail ни с кем. Обязательное поле</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
          <input name="password" type="password" pattern='^[A-Za-z\d]{8,}$' className="form-control" id="validationTextarea" required  />
          <div className="form-text">Обязательное поле</div>
        </div>
        <input type="submit" className="btn btn-primary" value="Войти" />
      </form>
    </div>
  </main>
);
}
export default AuthForm;

