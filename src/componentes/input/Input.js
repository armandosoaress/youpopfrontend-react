import '../../App.css';
import Botao_add from '../botoes/crud_botoes/Botao_add'


function Input() {
    return (
       <div className="cadastro"> 
         <input type="text"></input>
         <Botao_add/>
        </div>
    );
      
}
export default Input;
