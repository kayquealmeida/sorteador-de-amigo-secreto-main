import { useState } from "react";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio";
import './Sorteio.css';
import Card from "../components/Card";

const Sorteio = () => {

  const participantes = useListaDeParticipantes();
  const [participanteDaVez, setParticipanteDaVez] = useState('');
  const [amigoSecreto, setAmigoSecreto] = useState('');
  const resultado = useResultadoDoSorteio();
  const sortear = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    if(resultado.has(participanteDaVez)){
      setAmigoSecreto(resultado.get(participanteDaVez)!);
    }
  }


  return ( <Card>
      <section className="sorteio"> 
        <form onSubmit={sortear}>
          <select 
            required
            name="participanteDaVez" 
            id="participanteDaVez" 
            placeholder="Selecione o seu nome"
            value={participanteDaVez}
            onChange={evento => setParticipanteDaVez(evento.target.value)}
          >
            <option>Selecione seu nome</option>
            {
            participantes.map(participante => 
            <option key={participante}>{participante}</option>)
            }
          </select>
          <button  className="botao-sortear">Sortear</button>
        </form>
        {amigoSecreto && <p className="resultado" role="alert">{amigoSecreto}</p>}
        <footer className="sorteio">
            <img src="/imagens/aviao.png" className="aviao" alt="Um desenho de um avião de papel" />
        </footer>
      </section>
    </Card>)
}

export default Sorteio;