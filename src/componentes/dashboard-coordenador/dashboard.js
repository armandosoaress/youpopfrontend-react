import '../dashboard/style/style.css'
import React, { useState, useEffect } from 'react';
import Swal from "sweetalert2";





function Dashboardcoordenadorlayout() {

    const [data, setData] = useState([]);
    const [userlog, setUserlog] = useState([]);
    const [coordinator, setCoordinator] = useState([]);

    const header = new Headers();
    header.append('Authorization', 'Bearer 6|lci4x1yEsAgzZfJA4zm4Wb3xDTlY0a1s8nnfZefN');


    const getUsers = async () => {

        fetch("https://armandosoares.com.br/tanayoupop/backend/api/coordenadorusers?id=" + localStorage.getItem('user_coordenador'), {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                insertuser(responseJson)
            ));


        fetch("https://armandosoares.com.br/tanayoupop/backend/api/userlogado", {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                userlogado(responseJson)
            ));

        fetch("https://armandosoares.com.br/tanayoupop/backend/api/chousers?id=2", {
            method: 'get',
            headers: header,
        })
            .then((response) => response.json())
            .then((responseJson) => (
                coordinatorusers(responseJson)
            ));




    }


    const insertuser = async (responseJson) => {
        setData(responseJson.Recrutadores);
    }
    const userlogado = async (responseJson) => {
        setUserlog(responseJson.user);
    }
    const coordinatorusers = async (responseJson) => {
        setCoordinator(responseJson.Coordenadores);
    }


    useEffect(() => {
        getUsers();
    }, [])


    function redirect(id) {
        localStorage.setItem('user_coordenador', (id));

        Swal.fire({
            title: 'Aguarde!',
            html: ' <b>Carregando</b>.',
            timer: 1000,
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
        localStorage.setItem('user_recrutador', (id));
        window.location.href = "/dashboardrecrutador";
    }



    return (
        <>

            <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
                <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
                    <div className="h-16 text-blue-500 flex items-center justify-center">
                        <img src='https://camo.githubusercontent.com/dc4d002f749bc0233100e58222d15795eada2898df7a0adbf1afc99116374145/68747470733a2f2f74616e61796f75706f702e636f6d2e62722f696d6167656e732f4c6f676f253230372e737667'></img>
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
                            <div className="text-xs text-gray-400 tracking-wider">CHO</div>
                            <div className="relative mt-2">
                                <input type="text" className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" />
                                <svg viewBox="0 0 24 24" className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </div>
                            <div className="space-y-4 mt-3">

                                {
                                    Object.values(coordinator).map(Coordenadores => (

                                        <>
                                            <button onClick={() => redirect(Coordenadores.id)} className="bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow">
                                                <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                                                    <img src="https://images.unsplash.com/photo-1541647376583-8934aaf3448a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ" className="w-7 h-7 mr-2 rounded-full" alt="profile" />
                                                    {Coordenadores.name}
                                                </div>
                                                <div className="flex items-center w-full">
                                                    <div className="text-xs py-1 px-2 leading-none dark:bg-gray-900 bg-yellow-100 text-yellow-600 rounded-md">  {Coordenadores.funcao}</div>
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
                                    <div className="flex items-center text-3xl text-gray-900 dark:text-white">
                                        <img src="https://assets.codepen.io/344846/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1582611188&width=512" className="w-12 mr-4 rounded-full" alt="profile" />
                                        {userlog.name}
                                    </div>
                                    <div className="ml-auto sm:flex hidden items-center justify-end">
                                        <div className="text-right">
                                            {/* <div className="text-xs text-gray-400 dark:text-gray-400">março</div>
                                            <div className="text-gray-900 text-lg dark:text-white">R$ 2.456,794.00</div> */}
                                        </div>
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
                                    <a href="#" className="px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5">Coordenadores</a>
                                    <a href="#" className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5">Menu 1</a>
                                    <a href="#" className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Menu 2</a>
                                    <a href="#" className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Menu 3</a>
                                    <a href="#" className="px-3 border-b-2 border-transparent text-gray-600 dark:text-gray-400 pb-1.5 sm:block hidden">Menu 4</a>
                                </div>
                            </div>
                            <div className="sm:p-7 p-4">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-gray-400">
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Função</th>
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Nome</th>
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 hidden md:table-cell">Telefone</th>
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Endereço</th>
                                            <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Ult.Acesso</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-gray-600 dark:text-gray-100">

                                        {
                                            Object.values(data).map(Recrutadores => (

                                                <>
                                                    <tr className='usersdados' onClick={() => redirectdependent(Recrutadores.id)}>
                                                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                            <div className="flex items-center">
                                                                {Recrutadores.funcao}
                                                            </div>
                                                        </td>
                                                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                            <div className="flex items-center">
                                                                {Recrutadores.name}
                                                            </div>
                                                        </td>
                                                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 md:table-cell hidden"> {Recrutadores.telefone}</td>
                                                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 text-red-500"> {Recrutadores.endereco}</td>
                                                        <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
                                                            <div className="flex items-center">
                                                                <div className="sm:flex hidden flex-col">
                                                                    24.12.2022
                                                                    <div className="text-gray-400 text-xs">11:16 AM</div>
                                                                </div>
                                                                <button className="w-8 h-8 inline-flex items-center justify-center text-gray-400 ml-auto">
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
                                            ))
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
export default Dashboardcoordenadorlayout;
