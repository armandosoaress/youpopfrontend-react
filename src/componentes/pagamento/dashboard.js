import '../dashboard/style/style.css'
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";


function Dashboardlayout() {

    if (localStorage.getItem('user_permition') >= 3) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Usuario sem permição!',
        })
        setTimeout(function () {
            window.location.href = "/";
        }, 1000)

    }


    const [data, setData] = useState([]);
    const [userlog, setUserlog] = useState([]);
    const [pagamento, setpagamento] = useState([]);


    const header = new Headers();
    header.append('Authorization', 'Bearer ' + localStorage.getItem('token'));
    header.append('Content-Type', 'application/json');

    //get pra os options de cadastros de user acima delses
    function criaroptions(motoboy) {
        if (motoboy) {
            fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/listoptions", {
                method: 'get',
                headers: header,
            })
                .then((response) => response.json())
                .then((responseJson) => (
                    addoptionsmotoboy(responseJson)
                ));
            return
        }

        fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/listoptions", {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                addoptions(responseJson)
            ));
    }
    var supervisoresoptions, recrutadoresoptions, coordenadoresoptions, chooptions, motoboyoption = "";

    const addoptions = async (responseJson) => {
        console.log(responseJson);
        Object.values(responseJson.supervisores).map(supervisores => (
            supervisoresoptions += "<option value='" + supervisores.id + "'>" + supervisores.name + "</option>"
        ))
        Object.values(responseJson.recrutadores).map(recrutadores => (
            recrutadoresoptions += "<option value='" + recrutadores.id + "'>" + recrutadores.name + "</option>"

        ))
        Object.values(responseJson.coordenadores).map(coordenadores => (
            coordenadoresoptions += "<option value='" + coordenadores.id + "'>" + coordenadores.name + "</option>"

        ))
        Object.values(responseJson.chos).map(cho => (
            chooptions += "<option value='" + cho.id + "'>" + cho.name + "</option>"

        ))

        Object.values(responseJson.motoboys).map(motoboy => (
            motoboyoption += "<option value='" + motoboy.id + "'>" + motoboy.name + "</option>"

        ))

        critaruser(supervisoresoptions, recrutadoresoptions, coordenadoresoptions, chooptions)

    }

    const addoptionsmotoboy = async (responseJson) => {
        Object.values(responseJson.motoboys).map(motoboy => (
            motoboyoption += "<option value='" + motoboy.id + "'>" + motoboy.name + "  (" + motoboy.email + ")  " + "</option>"

        ))
        criaroptionsmotoboys(motoboyoption)
    }



    //fim


    const getUsers = async () => {

        fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/userlogado", {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                userlogado(responseJson)
            ));

        fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/pagamento", {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                insertuser(responseJson)
            ));

        fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/pagamentoid?id=" + localStorage.getItem('id_cobranca'), {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                pagamentousers(responseJson)
            ));

    }

    const insertuser = async (responseJson) => {
        setData(responseJson.data);
    }
    const userlogado = async (responseJson) => {
        setUserlog(responseJson.user);
    }
    const pagamentousers = async (responseJson) => {
        setpagamento(responseJson);
    }

    const logininvalid = async (responseJson) => {
        if (responseJson == "Error") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'esse e-mail já está em uso!',
            })
        } else {
            getUsers()
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario cadastrado',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }


    useEffect(() => {
        getUsers();
    }, [])


    function create(id_dependent, user) {
        
        let bodyContent = JSON.stringify({
            "name": localStorage.getItem('namecad'),
            "email": localStorage.getItem('mailcad'),
        });
        fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/cadcliente", {
            method: 'post',
            headers: header,
            body: bodyContent,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                localStorage.setItem('customer_id', responseJson.id)
            ))

        switch (user) {
            case "motoboy":
                var data = {
                    "email": localStorage.getItem('mailcad'),
                    "nome": localStorage.getItem('namecad'),
                    "customer_assas": localStorage.getItem('customer_id'),
                    "dependent_supervisor": id_dependent
                };
                fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/storemotoboy", {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: header,
                }).then((response) => response.json())
                    .then((responseJson) => (
                        logininvalid(responseJson.Status)
                    ));
                break;
            case "Supervisor":
                var data = {
                    "email": localStorage.getItem('mailcad'),
                    "nome": localStorage.getItem('namecad'),
                    "dependent_recrutador": id_dependent
                };
                fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/storesupervisor", {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: header,
                }).then((response) => response.json())
                    .then((responseJson) => (
                        logininvalid(responseJson.Status)
                    ));
                break;
            case "Recrutador":
                var data = {
                    "email": localStorage.getItem('mailcad'),
                    "nome": localStorage.getItem('namecad'),
                    "dependent_coordenador": id_dependent
                };
                fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/storerecrutador", {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: header,
                }).then((response) => response.json())
                    .then((responseJson) => (
                        logininvalid(responseJson.Status)
                    ));
                break;
            case "Coordenador":
                var data = {
                    "email": localStorage.getItem('mailcad'),
                    "nome": localStorage.getItem('namecad'),
                    "dependent_pagamento": id_dependent
                };
                fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/storecoordenador", {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: header,
                }).then((response) => response.json())
                    .then((responseJson) => (
                        logininvalid(responseJson.Status)
                    ));
                break;
            case "cho":
                var data = {
                    "email": localStorage.getItem('mailcad'),
                    "nome": localStorage.getItem('namecad'),
                    "dependent_admin": id_dependent
                };
                fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/storecho", {
                    method: 'post',
                    body: JSON.stringify(data),
                    headers: header,
                }).then((response) => response.json())
                    .then((responseJson) => (
                        logininvalid(responseJson.Status)
                    ));
                break;
        }
    }

    function critaruser(supervisoresoptions, recrutadoresoptions, coordenadoresoptions, pagamentooptions) {
        const { value: formValues } = Swal.fire({
            title: 'Cadastrar',
            confirmButtonText: 'Cadastrar',
            html:
                '<input placeholder="Nome" id="name" class="swal2-input">' +
                '<input id="email" placeholder="Email"  type="email" class="swal2-input">' +
                '<p></p>' +
                '<select id="access" style="margin-top:16px; float:left;margin-left:93px;border:1px solid #dcd7d7;padding:14px;cursor:pointer;" ><option value="Cho">Cho</option> <option value="Coordenador">Coordenador</option><option value="Recrutador">Recrutador</option><option value="Supervisor">Supervisor</option><option selected value="motoboy">Motoboy</option></select>',
        }).then((result) => {
            localStorage.setItem('mailcad', document.getElementById("email").value)
            localStorage.setItem('namecad', document.getElementById("name").value)
            if (result.isConfirmed) {
                switch (document.getElementById("access").value) {
                    case "motoboy":
                        Swal.fire({
                            title: 'Complete o cadastro',
                            confirmButtonText: 'Cadastrar',
                            html:
                                '<p>Supervisor</p>' +
                                '<select id="supervisor" style="margin-top:16px;border:1px solid #dcd7d7;padding:14px;cursor:pointer;" >' + supervisoresoptions + '</select>'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                create(document.getElementById("supervisor").value, "motoboy")
                            }
                        })
                        break;
                    case "Supervisor":
                        Swal.fire({
                            title: 'Complete o cadastro',
                            confirmButtonText: 'Cadastrar',
                            html:
                                '<p>Recrutador</p>' +
                                '<select id="recrutador" style="margin-top:16px;border:1px solid #dcd7d7;padding:14px;cursor:pointer;" >' + recrutadoresoptions + '</select>'
                        })
                            .then((result) => {
                                if (result.isConfirmed) {
                                    create(document.getElementById("recrutador").value, "Supervisor")
                                }
                            })
                        break;
                    case "Recrutador":
                        Swal.fire({
                            title: 'Complete o cadastro',
                            confirmButtonText: 'Cadastrar',
                            html:
                                '<p>Coordenador</p>' +
                                '<select id="coordenador" style="margin-top:16px;border:1px solid #dcd7d7;padding:14px;cursor:pointer;" >' + coordenadoresoptions + '</select>'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                create(document.getElementById("coordenador").value, "Recrutador")
                            }
                        })
                        break
                    case "Coordenador":
                        Swal.fire({
                            title: 'Complete o cadastro',
                            confirmButtonText: 'Cadastrar',
                            html:
                                '<p>Cho</p>' +
                                '<select id="cho" style="margin-top:16px;border:1px solid #dcd7d7;padding:14px;cursor:pointer;" >' + chooptions + '</select>'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                create(document.getElementById("cho").value, "Coordenador")
                            }
                        })
                        break;
                    case "Cho":
                        Swal.fire({
                            title: 'Complete o cadastro',
                            confirmButtonText: 'Cadastrar',
                            html:
                                '<p>Admin</p>' +
                                '<select id="admin" style="margin-top:16px;border:1px solid #dcd7d7;padding:14px;cursor:pointer;" ><option value="1">Armando soares</option></select>'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                create(document.getElementById("admin").value, "cho")
                            }
                        })
                        break;
                    default:
                        alert("só crud")
                        break;

                }
            }
        })
    }

    function redirect(id) {
        localStorage.setItem('id_cobranca', (id));
        Swal.fire({
            title: 'Aguarde!',
            html: ' <b>Carregando</b>.',
            timer: 2400,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log('I was closed by the timer')
            }
        })
        getUsers();
    }

    function redirectdependent(id) {
        localStorage.setItem('user_coordenador', (id));
        window.location.href = "/dashboardcoodenador";
    }

    function editar(params) {
        Swal.fire({
            title: 'Selecione uma Opção',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Editar',
            denyButtonText: `Deletar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                redirecteditar(params);
            } else if (result.isDenied) {
                Swal.fire('usuário inativo!', '', 'success')
            }
        })
    }

    function editaruserlogado(params) {
        Swal.fire({
            title: 'Selecione uma Opção',
            showCancelButton: true,
            confirmButtonText: 'Editar perfil',
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                redirecteditar(params);
            }
        })
    }


    function redirecteditar(params) {
        localStorage.setItem("useredit", params);
        window.location.href = "/dashboard/editar";
    }

    var cor, text;
    function defininedcor(params) {
        if (params.status == "PENDING") {
            return ["#ff00009c", "Pendente"];
        } else {
            return ["#61f388db", "Recebido"]
        }
    }


    var cont = 0;
    function nome(params) {
        if (cont == 0) {
            fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/cliente?id=" + params.customer, {
                method: 'get',
                headers: header,
            })
                .then((response) => response.json())
                .then((responseJson) => (
                    localStorage.setItem('6trn', responseJson.name)
                ))
        }
        cont = 1;

    }

    var idmotoboy = 0;
    function criaroptionsmotoboys(params) {
        console.log(params);
        Swal.fire({
            title: 'Selecione o motoboy',
            confirmButtonText: 'Cadastrar fatura',
            showDenyButton: true,
            denyButtonText: `Cadastrar motoboy`,
            denyButtonColor: '#19e951',
            html:
                '<p>Motoboy</p>' +
                '<select id="motoboyselected" style="margin-top:16px;border:1px solid #dcd7d7;padding:14px;cursor:pointer;" >' + params + '</select>'
        }).then((result) => {
            if (result.isConfirmed) {
                idmotoboy = document.getElementById("motoboyselected").value;
                Swal.fire({
                    title: 'Selecione o motoboy',
                    confirmButtonText: 'Complete',
                    denyButtonText: `Cadastrar fatura`,
                    html:
                        '<p>Valor</p>' +
                        '<input  min="5" type="number" style="padding:14px;" placeholder="0" id="valorfatura" ></input>' +
                        '<p>Venciemento</p>' +
                        '<input type="date" style="padding:14px;margin-top:3px" id="venciementofatura" ></input>'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (document.getElementById("valorfatura").value <= 6) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Não é permitido valores menores que 6.00 R$',
                            })
                        }

                        const date1 = new Date();
                        const date2 = new Date(document.getElementById("venciementofatura").value);

                        if (date1.getTime() < date2.getTime()) {
                            customer(idmotoboy)
                            let bodyContent = JSON.stringify({
                                "customer": localStorage.getItem('customer_id'),
                                "billingType": "UNDEFINED",
                                "dueDate": document.getElementById("venciementofatura").value,
                                "value": document.getElementById("valorfatura").value,
                                "description": "Youpop",
                                "externalReference": idmotoboy
                            });
                            fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/pagamento", {
                                method: 'post',
                                headers: header,
                                body: bodyContent,
                            })
                                .then((response) => response.json())
                                .then((responseJson) => (
                                    console.log(responseJson),
                                    validacadcobranca(responseJson.status)
                                ))
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Data invalida!',
                            })
                        }

                    }
                })

            } else if (result.isDenied) {
                criaroptions();
            }
        })
        function validacadcobranca(params) {
            if (params == "PENDING") {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Fatura cadastrada',
                    showConfirmButton: false,
                    timer: 1500
                })
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
    }


    function customer(id) {
        fetch("http://localhost/youpop-plano-eusouinevitavel/backend/api/custumermy?id=" + id, {
            method: 'get',
            headers: header,
        }).then((response) => response.json())
            .then((responseJson) => (
                localStorage.setItem('customer_id', responseJson.customer)
            ))
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

                        <button onClick={() => criaroptions()} class="h-10 w-12 dark:text-gray-500 rounded-md flex items-center justify-center">
                            <img width='30px' src='https://th.bing.com/th/id/R.faa36eaf4de2722e6b03486c908fc037?rik=rfAqQaqLXfe72g&pid=ImgRaw&r=0'></img>
                        </button>
                    </div>
                </div>
                <div className="flex-grow overflow-hidden h-full flex flex-col">

                    <div className="flex-grow flex overflow-x-hidden">
                        <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
                            <div className="text-xs text-gray-400 tracking-wider">pagamento</div>
                            <div className="relative mt-2">
                                <input type="text" className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" />
                                <svg viewBox="0 0 24 24" className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <div className="space-y-4 mt-3">
                                {
                                    Object.values(data).map(data => (
                                        cor = defininedcor(data)[0],
                                        text = defininedcor(data)[1],
                                        nome(data),
                                        <>
                                            <button onClick={() => redirect(data.id)} className=" p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow" style={{ backgroundColor: cor }}>
                                                <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                                                    <img src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
                                                    {text}
                                                </div>
                                                <div className="flex items-center w-full">
                                                    <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-yellow-100 text-yellow-600 rounded-md"> {localStorage.getItem('6trn')}</div>
                                                </div>
                                            </button>
                                        </>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
                            <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
                                <div className="flex w-full items-center">
                                    <div onClick={() => editaruserlogado(localStorage.getItem('id_user_log'))} className="flex items-center text-3xl text-gray-900 dark:text-white">
                                        <img src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1582611188&width=512" className="w-12 mr-4 rounded-full" alt="profile" />
                                        {userlog.name}
                                    </div>
                                    <div className="ml-auto sm:flex hidden items-center justify-end">
                                        {/* <div className="text-right">
                                            <div className="text-xs text-gray-400 dark:text-gray-400">março</div>
                                            <div className="text-gray-900 text-lg dark:text-white">R$ 2.456,794.00</div>
                                        </div> */}
                                        <button className="w-8 h-8 ml-4 text-gray-400 shadow dark:text-gray-400 rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                                            <svg viewBox="0 0 24 24" className="w-4" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <circle cx="12" cy="12" r="1"></circle>
                                                <circle cx="19" cy="12" r="1"></circle>
                                                <circle cx="5" cy="12" r="1"></circle>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                                    <a href="#" className="px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5">Pagamentos</a>
                                    <a onClick={() => criaroptions(true)} className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5">Criar link de pagamento</a>
                                    {/* <a href="#" className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Menu 2</a>
                                    <a href="#" className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Menu 3</a>
                                    <a href="#" className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Menu 4</a> */}
                                </div>
                            </div>
                            <div className="sm:p-7 p-4">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-400">
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Fatura</th>
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Valor</th>
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">Data de criação</th>
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Data de pagamento</th>
                                            {/* <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Supervisor</th> */}
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-100">

                                        {
                                            <>
                                                <tr className='usersdados' >
                                                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                        <div className="flex items-center">
                                                            <a href={pagamento.bankSlipUrl}>  <button className="buttonpagamento button1pagamento">Vizualizar fatura</button></a>
                                                        </div>
                                                    </td>
                                                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                        <div className="flex items-center">
                                                            {pagamento.value}
                                                        </div>
                                                    </td>
                                                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden"> {pagamento.dateCreated}</td>
                                                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500"> {pagamento.clientPaymentDate}</td>
                                                    <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                        <div className="flex items-center">
                                                            {/* <div className="sm:flex hidden flex-col">
                                                                24.12.2022
                                                                <div className="text-gray-400 text-xs">11:16 AM</div>
                                                            </div> */}
                                                            <button onClick={() => editar(pagamento.id)} className="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
                                                                <svg viewBox="0 0 24 24" className="w-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                                    <circle cx="12" cy="12" r="1"></circle>
                                                                    <circle cx="19" cy="12" r="1"></circle>
                                                                    <circle cx="5" cy="12" r="1"></circle>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>

                                            </>

                                        }

                                    </tbody>
                                </table>
                                <div className="flex w-full mt-5 space-x-2 justify-end">
                                    <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                                        <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="15 18 9 12 15 6"></polyline>
                                        </svg>
                                    </button>
                                    <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none  bg-gray-100 dark:bg-gray-800 dark:text-white">1</button>
                                    {/* <button className="inline-flex items-center h-8 w-8 justify-center text-gray-500 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">2</button> */}
                                    <button className="inline-flex items-center h-8 w-8 justify-center text-gray-400 rounded-md shadow border border-gray-200 dark:border-gray-800 leading-none">
                                        <svg className="w-4" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Dashboardlayout;
