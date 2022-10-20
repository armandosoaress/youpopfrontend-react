import '../../App.css';
import BotaoEditar from '../../componentes/botoes/crud_botoes/BotaoEditar';
import BotaoDeletar from '../../componentes/botoes/crud_botoes/BotaoDeletar'

function Botoes() {
    return (

        <div>
            <li><BotaoEditar /></li>
            <li><BotaoDeletar /></li>
        </div>

    );
}
export default Botoes;
