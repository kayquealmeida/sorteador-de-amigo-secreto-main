import { realizarSorteio } from "./realizarSorteio";

describe('dado um sorteio de amigo secreto', () => {
  test('que cada participante não sortei o próprio nome',  () => {
    const participantes = [
      'Ana', 
      'Catarina',
      'Patricia',
      'João',
      'Kayque',
    ]

    const sorteio = realizarSorteio(participantes);
    participantes.map(participante => {
      const amigoSecreto = sorteio.get(participante);
      expect(amigoSecreto).not.toEqual(participante);
    })
  });
});