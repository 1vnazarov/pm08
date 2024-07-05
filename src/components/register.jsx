import React, { useRef } from "react"
import { useNavigate } from "react-router"
const Register = () => {
    const navigate = useNavigate()
    const form = useRef()
    const blocks = useRef()
    const conf_pwd = useRef()
    const sign = (e) => {
        e.preventDefault()
        if (!form.current.checkValidity()) {
            e.stopPropagation()
            console.log(new FormData(form.current))
            form.current.classList.add('was-validated')
            return
        }
        const data = new FormData(form.current)
        if (data.get("password") !== data.get("password_confirmation")) {
            blocks.current.textContent = "Пароли не совпадают"
            blocks.current.style.display = "block"
            conf_pwd.current.classList.add("is-invalid")
            conf_pwd.current.classList.remove("is-valid")
            return
        }
        conf_pwd.current.classList.add("is-valid")
        conf_pwd.current.classList.remove("is-invalid")
        blocks.current.style.display = "none"
        fetch("https://exam.сделай.site/signup", {
            method: "POST",
            headers: { ["Content-Type"]: "application/json" },
            body: JSON.stringify({ "full_name": data.get("name"), "email": data.get("email"), "password": data.get("password") })
        })
            .then(response => response.json())
            .then(result => {
                console.log(result)
                localStorage.token = result?.data.user_token
                if (localStorage.token) navigate("/auth")
            })
            .catch(error => console.log('error', error));
    }


return <main style={{ minHeight: "70vh" }}>
    <h2 className="text-center text-white bg-primary m-2">Регистрация</h2>
    <div className="p-3">
        <form className="w-50 m-auto p-5 was-validated" style={{ minWidth: 300 }} noValidate onSubmit={sign} ref={form}>
            <div className="mb-3">
                <label htmlFor="validationTextarea" className="form-check-label">Введите фамилию, имя, отчество:</label>
                <input name="name" type="name" pattern='^[а-яА-ЯёЁa]+ [а-яА-ЯёЁa]+ ?[а-яА-ЯёЁa]+$' className="form-control" id="validationTextarea" aria-describedby="emailHelp" required  />
                <div className="invalid-feedback">
                    Введите ФИО
                </div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Почта</label>
                <input name='email' type="email" className="form-control" id="validationTextarea" aria-describedby="emailHelp" required  />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Пароль</label>
                <input name="password" type="password" pattern='^[A-Za-z\d]{8,}$' className="form-control" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Повторите пароль</label>
                <input name="password_confirmation" type="password" className="form-control is-invalid" ref={conf_pwd} required />
            </div>
      <div className="alert text-danger w-100 m-auto" style={{ "display": "none" }} role="alert" ref={blocks}></div>
            <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
        </form>
  
    </div>
</main>
}
export default Register