import Swal from "sweetalert2";

function service(url, body) {
  fetch('http://localhost/youpop-plano-eusouinevitavel/backend/api' + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((response) => response.json())
    .then((responseJson) => (
      valida(responseJson.Status,responseJson)
    ));


  function valida(params,usernivel) {
    switch (params) {
      case "Success": success(usernivel.User.niveis_acesso_id,usernivel.User.id,usernivel.Token,usernivel.User.firstaccess)
        break;
      default: erro()
    }
  }

  function success(r,c,t,f) {
    if (f==0) {
      localStorage.setItem('useredit', c);
      window.location = "/dashboard/editar";
      return
    }

    localStorage.setItem('token', t);
    localStorage.setItem('id_user_log', c);
    Swal.fire({
      title: 'Success',
      type: 'success',
      text: 'Login correto.',
    });
    localStorage.setItem('eusouinevitavel', true);
    localStorage.setItem('user_cho', 2);
    
    if (r==1) {
      localStorage.setItem('user_permition', "1");
      window.location = "/dashboard";
    }
    if (r==2) {
      localStorage.setItem('user_permition', "2");
      localStorage.setItem('user_cho', c);
      window.location = "/dashboardcoodenador";
    }
    if (r==3) {
      localStorage.setItem('user_permition', "3");
      localStorage.setItem('user_coordenador', c);
      window.location = "/dashboardrecrutador";

    }
    if (r==4) {
      localStorage.setItem('user_permition', "4");
      localStorage.setItem('user_recrutador', c);
      window.location = "/dashboardsupervisor";
    }
    if (r==5) {
      localStorage.setItem('user_permition', "5");
      localStorage.setItem('user_supervisor', c);
      window.location = "/dashboardmotoboy";
    }

  }
  function erro() {
    Swal.fire({
      title: 'error',
      type: 'error',
      text: 'Login incorreto.',
    });
    localStorage.setItem('eusouinevitavel', false);
  }
}
export default service 
