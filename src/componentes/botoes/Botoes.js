import '../../App.css';
import Botao_editar from '../../componentes/botoes/crud_botoes/Botao_editar';
import Botao_deletar from '../../componentes/botoes/crud_botoes/Botao_deletar'

function Botoes() {
    return (

        <div>
            <li><Botao_editar /></li>
            <li><Botao_deletar /></li>
        </div>

    );
}
export default Botoes;
