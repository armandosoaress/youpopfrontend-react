import React, { Component } from "react";  
import Swal from "sweetalert2";  

function service(url,body,endpoint) {
  fetch('http://localhost/api/api/'+url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((result) => {
        if (endpoint == 'login') {
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
    }
      function erro() {
        Swal.fire({  
          title: 'error',  
          type: 'error',  
          text: 'Login incorreto.',  
      });   

      }
}
export default service 
