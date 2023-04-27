import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { RecoilRoot } from "recoil";
import { useListaDeParticipantes } from "../state/hooks/useListaDeParticipantes";
import Sorteio from "./Sorteio";
import { listaParticipantesState } from "../state/atom";
import { useResultadoDoSorteio } from "../state/hooks/useResultadoDoSorteio";

jest.mock('../state/hooks/useListaDeParticipantes', () => {
  return {
    useListaDeParticipantes: jest.fn()
  }
})

jest.mock('../state/hooks/useResultadoDoSorteio', () => {
  return {
    useResultadoDoSorteio: jest.fn()
  }
})

describe('na pagina sorteio', () => {

  const participantes = [
    'Ana',
    'Patricia',
    'Catarina'
  ]

  const resultado = new Map([
    ['Ana', 'Patricia'],
    ['Catarina', 'Ana'],
    ['Patricia', 'Catarina']
  ])

  beforeEach(() => {
    (useListaDeParticipantes as jest.Mock).mockReturnValue(participantes);
    (useResultadoDoSorteio as jest.Mock).mockReturnValue(resultado);
  })

  test('todos os participantes podem exibir o seu amigo secreto', () => {
    render(<RecoilRoot>
      <Sorteio />
    </RecoilRoot>)

    const opcoes = screen.queryAllByRole('option');
    expect(opcoes).toHaveLength(participantes.length + 1); //Porque Já vem uma option com opção
  })

  test('o amigo secredo é exibido quando solicitado', () => {
    render(<RecoilRoot>
      <Sorteio />
    </RecoilRoot>)

const select = screen.getByPlaceholderText("Selecione o seu nome");
fireEvent.change(select, 
{
  target: {
    value: participantes[0]
  } 
})

const botao = screen.getByRole('button');
fireEvent.click(botao);

const amigoSecreto = screen.getByRole('alert');

expect(amigoSecreto).toBeInTheDocument();
  })


})