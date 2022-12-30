import '../dashboard/style/style.css'
import '../dashboard/style/form.css'
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";

function Dashboardeditarlayout() {

    var iduser = localStorage.getItem("useredit");


    const [data, setData] = useState([]);


    const header = new Headers();
    header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json');


    const getUsers = async () => {

        fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/user?id=" + iduser, {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                insertuser(responseJson)
            ));



    }

    const insertuser = async (responseJson) => {
        setData(responseJson);
    }



    useEffect(() => {
        getUsers();
    }, [])

    const cadastrarUsuario = (e) => {
        e.preventDefault()
        return service(
            '/edtiuser',
            {
                "id": iduser,
                "nome": document.getElementById("name").value,
                "senha": document.getElementById("password").value,
                "endereco": document.getElementById("endereco").value,
                "cidade": document.getElementById("cidade").value,
                "estado": document.getElementById("estado").value,
                "telefone": document.getElementById("telefone").value,
                "banco": document.getElementById("banco").value,
                "conta": document.getElementById("conta").value,
                "agencia": document.getElementById("agencia").value,
                "pix": document.getElementById("pix").value,
                "tipopix": document.getElementById("tipopix").value,
            }
        );
    }

    function service(url, body) {
        fetch('http://localhost/youpop-plano-eusouinevitavel/backend/api' + url, {
            method: 'put',
            headers: header,
            body: JSON.stringify(body)
        }).then((response) => response.json())
            .then((responseJson) => (
                sucess(responseJson)
            ));
    }

    function sucess(params) {
        if (params.Status == "sucess") {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario atualizado com sucesso',
                showConfirmButton: false,
                timer: 1500
            })

            setTimeout(function() {
                Swal.fire({
                    icon: 'success',
                    title: 'Oops...',
                    text: 'voltar para o dashboard!',
                    confirmButtonText: 'Sim!',
                    showCancelButton: true,
                    cancelButtonText: 'Continuar editando!',
                    cancelButtonColor: '#37fe71',
                  }).then((result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      Swal.fire('redirecionando!', '', 'success')
                      if ( localStorage.getItem('user_permition')==2) {
                        window.location = "/dashboardcoodenador";
                      }
                      else if( localStorage.getItem('user_permition')==3) {
                        window.location = "/dashboardrecrutador";
                      }
                      else if ( localStorage.getItem('user_permition')==4) {
                        window.location = "/dashboardsupervisor";
                      }
                      else if ( localStorage.getItem('user_permition')==5) {
                        window.location = "/dashboardmotoboy";
                      }else{
                        window.location = "/";
                      }
                    }
                  })
              }, 2000)
 
        } else {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'erro',
                showConfirmButton: false,
                timer: 1500
            })
        }
        
    }

    return (
        <>
            <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
                <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
                    <div className="h-16 text-blue-500 flex items-center justify-center">
                        <img src='https://pps.whatsapp.net/v/t61.24694-24/312270294_104944702459502_591627292149478553_n.jpg?ccb=11-4&oh=01_AdRkdhlj8qc0m-O0b47edWcY2uF4advHNGuIj1sQ1clagg&oe=63BC43AF'></img>
                    </div>
                    <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
                        <button className="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center bg-blue-100 text-blue-500">
                            <svg viewBox="0 0 24 24" className="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="flex-grow overflow-hidden h-full flex flex-col">

                    <div className="flex-grow flex overflow-x-hidden">
                        <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
                            <div className="space-y-4 mt-3">

                                <button className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
                                    <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                                        <img src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
                                        {data.name}
                                    </div>
                                    <div className="flex items-center w-full">
                                        <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-yellow-100 text-yellow-600 rounded-md">  {data.funcao}</div>
                                    </div>
                                </button>

                            </div>
                        </div>
                        <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
                            <div className='voert'>
                                <form onSubmit={cadastrarUsuario}>
                                    <label for="fname">Nome</label>
                                    <input required type="text" id="name" name="nome" placeholder="Nome" defaultValue={data.name}></input>

                                    <label for="lname">Senha</label>
                                    <input required type="password" id="password" name="password" placeholder="Senha" defaultValue="password"></input>

                                    <label for="lname">Telefone</label>
                                    <input required type="text" id="telefone" name="telefone" placeholder="Telefone" defaultValue={data.telefone}></input>

                                    <label for="lname">Cidade</label>
                                    <input required type="text" id="cidade" name="cidade" placeholder="cidade" defaultValue={data.cidade}></input>

                                    <label for="lname">Endereco</label>
                                    <input required type="text" id="endereco" name="endereco" placeholder="Endereco" defaultValue={data.endereco}></input>

                                    <label for="lname">Estado</label>
                                    <input required type="text" id="estado" name="estado" placeholder="Estado" defaultValue={data.estado}></input>


                                    <label for="lname">Banco</label>
                                    <input required type="text" id="banco" name="banco" placeholder="Banco" defaultValue={data.banco}></input>

                                    <label for="lname">Conta</label>
                                    <input required type="text" id="conta" name="conta" placeholder="Conta" defaultValue={data.conta}></input>

                                    <label for="lname">Agencia</label>
                                    <input required type="text" id="agencia" name="agencia" placeholder="Agencia" defaultValue={data.agencia}></input>

                                    <label for="lname">Tipo de chave pix</label>
                                    <br></br>

                             
                                    <select required name="tipochave" id="tipopix">
                                        <option value="EMAIL">Email</option>
                                        <option value="CONPJ">CNPJ</option>
                                        <option value="TELEFONE">TELEFONE</option>
                                        <option value="CPF">CPF</option>
                                    </select>
                                    <p></p>

                                    <label for="lname">Chave pix</label>
                                    <input required type="text" id="pix" name="pix" placeholder="chave pix" defaultValue={data.pix_chave}></input>

                                    <input type="submit" value="Salvar"></input>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Dashboardeditarlayout;
