import '../../App.css';
import Botoes from '../botoes/Botoes';

function Tabela() {
    return (
        <table className="customers">
            <tr>
                <th>Nome</th>
                <th>Telefones</th>
                <th>Ações</th>
            </tr>
            <tr>
                <td>Armando soares</td>
                <td><br></br>  88999722046
                    <br></br>  8897465352
                    <br></br>  8897465352</td>
                <Botoes />
            </tr>

        </table>
    );
}
export default Tabela;
