    var teste = false;
const isAuthenticated = (validation) => {

    if (localStorage.getItem('eusouinevitavel')==="false") {
         teste = false;
    } else if (localStorage.getItem('eusouinevitavel')==="true"){
         teste = true;
    }
    return teste
} 
export default isAuthenticated
