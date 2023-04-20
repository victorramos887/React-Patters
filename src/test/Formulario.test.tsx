import React from 'react';
import Form from '../components/Form';
import { fireEvent, render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import CadastroNome from '../routes/POST/CadastroNome';
import fetchMock from 'jest-fetch-mock';
//
[];
beforeEach(() => {
    fetch.resetMocks();
  });

describe('Quando o formulário for renderizado', () =>{

    test('Verificar se o componente com nome = nome existe', () =>{
        render(
            <RecoilRoot>
                <Form/>
            </RecoilRoot>
        )
        const input = screen.getByLabelText('Nome')
        expect(input).toBeInTheDocument()

    })

    test('Verificar se o botão existe', () =>{
        render(
            <RecoilRoot>
                <Form/>
            </RecoilRoot>
        )
        const botao = screen.getByRole('button')
        expect(botao).toBeInTheDocument()
    })

    it('O botão deve estar desabilitado caso o input esteja vazio', () => {
        render(
            <RecoilRoot>
                <Form/>
            </RecoilRoot>
        )
        const botao = screen.getByRole('button')
        // const textField = screen.getAllByPlaceholderText("Nome")

        expect(botao).toBeDisabled()
    })

    it('O botão deve habilitar caso seja input estaja ativo', () =>{
        render(
            <RecoilRoot>
                <Form/>
            </RecoilRoot>
        )

        const botao = screen.getByRole('button')
        const input = screen.getByLabelText("Nome")

        expect(botao).toBeDisabled()

        fireEvent.change(input, {
            target: {
                value: 'Victor Ramos',
            }
        })
        expect(botao).not.toBeDisabled()
    })
})


describe('Testando o envio para o banco', () =>{

    beforeAll(() => {
        fetchMock.enableMocks();
    })

    beforeEach(() => {
        fetchMock.resetMocks();
    })

    const urlBase = 'http://127.0.0.1:5000'

    it('Cadastrar nome', async ()=>{
        const nome = "Victor"
        fetch.mockResponseOnce(JSON.stringify(({"nome":nome})))

        const cadastrar = await CadastroNome({
            "nome":"Nome",
        })

        expect(cadastrar).toEqual({"nome":nome})
        expect(fetch).toHaveBeenCalledTimes(1);

    })

    it('Ao clicar no botão deve enviar uma informação para o banco', async () => {
        const formulario = render(<RecoilRoot><Form/></RecoilRoot>)

        const input = formulario.getByLabelText("Nome")
        const botao = formulario.getByRole('button')

        fireEvent.change(input, {
            target: {
                value: 'Victor Ramos',
            }
        })
        fetchMock.mockResponseOnce(JSON.stringify({ status: true, nome: 'Victor Ramos' }));
        fireEvent.click(botao);
        console.log('Fetch foi chamado');

        await new Promise((resolve) => setTimeout(resolve, 100)); // Adiciona um atraso de 1 segundo

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('http://127.0.0.1:5000/api/v1/rota_testando/nome', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: 'Victor Ramos' }),
        });

    })
})