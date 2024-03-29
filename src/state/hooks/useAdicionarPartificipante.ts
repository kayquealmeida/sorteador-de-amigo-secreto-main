import { useSetRecoilState, useRecoilValue } from "recoil"
import { errorState, listaParticipantesState } from "../atom"

export const useAdicionarParticipante = () => {
  const setLista = useSetRecoilState(listaParticipantesState);
  const lista = useRecoilValue(listaParticipantesState);
  const setErro = useSetRecoilState(errorState);
  return (nomeDoParticipante: string) => {
    if(lista.includes(nomeDoParticipante)) {
      setErro('Nomes duplicados não são permitidos!');
      setTimeout(() => {
        setErro('');
      }, 5000)
      return
    }
    return setLista(listaAtual => [...listaAtual, nomeDoParticipante]);
  }
};