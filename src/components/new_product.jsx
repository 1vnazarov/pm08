import React, { useRef } from "react"
const NewProduct = () => {
  const form = useRef()
    return (
        <main style={{ minHeight: "70vh" }}>
  <h2 className="text-center text-white bg-primary m-2">Добавление товара</h2>
  <div className="p-3">
    <form noValidate
      className="w-50 m-auto border border-primary p-3"
      style={{ minWidth: 300 }} ref={form}
      onSubmit={(e) => {
        e.preventDefault()
        if (!form.current.checkValidity()) {
          e.stopPropagation()
          form.current.classList.add('was-validated')
          return
      }
        fetch("https://exam.сделай.site/product", {
          method: "POST",
          headers: { ["Content-Type"]: "application/json", "Authorization": `Bearer ${localStorage.token}` },
          body: JSON.stringify(Object.fromEntries(new FormData(form.current)))
      })
          .then(response => response.json())
          .then(result => {
              console.log(result)
          })
          .catch(error => console.log('error', error));
      }}
    >
      <div className="mb-3">
        <label htmlFor="product" className="form-label">
          Введите наименование товара:
        </label>
        <input type="text" className="form-control" id="product" name="name" pattern="(.|\s)*\S(.|\s)*" required />
        <div className="form-text">Обязательное поле</div>
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Цена товара:
        </label>
        <input type="text" className="form-control" id="price" pattern="(.|\s)*\S(.|\s)*" name="price" required/>
        <div className="form-text">Обязательное поле</div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Описание товара:
        </label>
        <textarea className="form-control" id="description" name="description" defaultValue={""} pattern="(.|\s)*\S(.|\s)*" required />
        <div className="form-text">Обязательное поле.</div>
      </div>
      <input
        type="submit"
        className="btn btn-primary form-control"
        defaultValue="Отправить"
      />
    </form>
  </div>
</main>

    )
}

export default NewProduct