import Swal from "sweetalert2"; 

function service(url,body) {
  fetch('https://armandosoares.com.br/tanayoupop/backend/api'+url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((result) => {
        if (url === '/login') {
          switch (result.status) {
            case 401: erro()
            break;
            case 200: success()
            break;
            default: alert('desconhecido')
         }
        }
      })

      function success() {
        Swal.fire({  
          title: 'Success',  
          type: 'success',  
          text: 'Login correto.',  
      }); 
      localStorage.setItem('eusouinevitavel', true);
      window.location = "/dashboard";
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
