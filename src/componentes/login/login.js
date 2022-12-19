import '../../../src/App.css';
import '../login/css/style.css'
import '../login/css/layout.css'
import { useState } from 'react'
import service from "../../componentes/api/service/services";


function Loginlayout() {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const cadastrarUsuario = (e) => {
    e.preventDefault()
    if (name && password) {
      return service(
        '/login',
        { "email": name, 
        "password": password }
      );
    } else {
      alert('Preencha os dois campos')
    }
  }
  return (
    <div class="d-lg-flex half">
      <div id="fi" class="bg order-1 order-md-2"></div>
      <div class="contents order-2 order-md-1">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-7">
              <h3>Login</h3>
              <p class="mb-4">Faça login para continuar</p>
              <form onSubmit={cadastrarUsuario}>
                <div class="form-group first">
                  <label for="username">Usuario</label>
                  <input type="text" className="form-control" placeholder="Digite Seu usuário" id="username"
                    onChange={(e) => setName(e.target.value)} />
                </div>
                <div class="form-group last mb-3">
                  <label for="password">Senha</label>
                  <input type="password" placeholder="Digite sua senha" class="form-control" id="password"
                    onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div class="d-flex mb-5 align-items-center">
                  {/* <label class="control control--checkbox mb-0"><span class="caption">L me</span>
                  <input type="checkbox" checked="checked"/>
                  <div class="control__indicator"></div>
                </label> */}
                  {/* <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span> */}
                </div>
                <input type="submit" value="Log In" class="btn btn-block btn-primary" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
export default Loginlayout;
