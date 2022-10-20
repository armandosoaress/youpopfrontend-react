import '../../../App.css';

const BotaoAdd = ({ Text, onClick, Type = "button" }) => {
  return (
     <button type={Type} onClick={onClick} className=" botaocadastrar">Adicionar</button>
  );
}

export default BotaoAdd;
