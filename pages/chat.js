import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import PaginaInicial from '.';
import {useRouter} from 'next/router'
import {ButtonSendSticker} from './ButtonSendSticker'

// relação com o banco de dados e o Backend no Supabase
// Como fazer AJAX: https://medium.com/@omariosouto/entendendo-como-fazer-ajax-com-a-fetchapi-977ff20da3c6
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlyZHZ2cGlpbXVxeHRieGdsYmh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkzNTk5MzMsImV4cCI6MTk2NDkzNTkzM30.QCjJ9AyoCxYNQtr1QaD542UmCE6-tAceyQ4nlM8Df_w'
const SUPABASE_URL = 'https://yrdvvpiimuqxtbxglbht.supabase.co'
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

function onListenerDeMensagensEmTempoReal(adicionaMensagem) {
    return supabaseClient
    .from('mensagens')
    .on('INSERT', (respotaAutomatica) => {
        adicionaMensagem(respotaAutomatica.new)
    })
    .subscribe();
}

export default function ChatPage() {
    /*
    USUARIO
    - Digitar no campo de texto
    - Aperta enter pra enviar
    - Adicionar o texto na listagem
    
    DESENVOLVEDOR
    - [x] Criar o campo
    - [x] usar o onChancge e o use State (usar um if para lançar a variavel)
    - [x] lista de mensagem

    */
    const roteamento = useRouter ()
    const usuario = roteamento.query.username
    console.log('roteamento.query', roteamento.query)
    const [mensagem, setMensagem] = React.useState('')
    const [listaDeMensagem, setlistaDeMensagem] = React.useState([])
        //{
        //    id: 1,
        //    de:'eltonmar',
        //    texto: ':sticker: https://www.alura.com.br/imersao-react-4/assets/figurinhas/Figurinha_3.png',
        //}

    React.useEffect(() => {
        supabaseClient
        .from('mensagens')
        .select('*')
        .order('id', {ascending: false})
        .then(({data}) => {
            console.log('Dados da consulta', data)
            setlistaDeMensagem(data)
        });

        onListenerDeMensagensEmTempoReal((novaMensagem) =>{
            cuidaDaMensagem(novaMensagem)
        })
    }, []);
    
    function cuidaDaMensagem(novaMensagem) {
        
        const mensagem = {
            de: usuario,
            // id: listaDeMensagem.length + 1,
            texto: novaMensagem,
        }
        //Chamada de um backend

        supabaseClient
            .from('mensagens')
            .insert([
                // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
                mensagem
            ])
//            .then(({data}) => {
//               
//                setlistaDeMensagem([
//                   data[0],
//                    ...listaDeMensagem,
//                ]) 
//            })
        setMensagem('')
    }
    return (
        <Box
            styleSheet={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: appConfig.theme.colors.primary['000'],
                backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/talking-head-at-the-office-tv-series.jpg)',
                backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                color: appConfig.theme.colors.neutrals['000']
            }}
        >
            <Box
                styleSheet={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                    borderRadius: '5px',
                    backgroundColor: appConfig.theme.colors.neutrals[700],
                    height: '100%',
                    maxWidth: '95%',
                    maxHeight: '95vh',
                    padding: '32px',
                }}
            >
                <Header />
                <Box
                    styleSheet={{
                        position: 'relative',
                        display: 'flex',
                        flex: 1,
                        height: '80%',
                        backgroundColor: appConfig.theme.colors.neutrals[600],
                        flexDirection: 'column',
                        borderRadius: '5px',
                        padding: '16px',
                    }}
                >

                    {/* Ta mudando ? {mensagem} */}

                    <MessageList mensagens={listaDeMensagem} />
                    {/* {listaDeMensagens.map((mensagemAtual) => {
                        return (
                            <li key={mensagemAtual.id}>
                                {mensagemAtual.de}: {mensagemAtual.texto}
                            </li>
                        )
                    })} */}

                    <Box
                        as="form"
                        styleSheet={{
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <TextField
                            value={mensagem}
                            onChange={(event) => {
                                const valor = event.target.value
                                setMensagem(valor)

                            }}

                            onKeyPress={(event) => {
                                if (event.key === 'Enter') {
                                    event.preventDefault()
                                    cuidaDaMensagem(mensagem)
                                }
                            }}

                            placeholder="Insira sua mensagem aqui..."
                            type="textarea"
                            styleSheet={{
                                width: '100%',
                                border: '0',
                                resize: 'none',
                                borderRadius: '5px',
                                padding: '6px 8px',
                                backgroundColor: appConfig.theme.colors.neutrals[800],
                                marginRight: '12px',
                                color: appConfig.theme.colors.neutrals[200],
                            }}
                        />
                        <Button
                            label='Enviar'
                            type='submit'
                            value={mensagem}
                            onChange={() => {
                                useState(mensagem)

                            }}
                            onClick={
                                (evento) => {

                                    evento.preventDefault()
                                    cuidaDaMensagem(mensagem)
                                }}

                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        />
                        <ButtonSendSticker 
                        onStickerClick = {(sticker) =>{
                            console.log('Salva o Sticker no banco')
                            cuidaDaMensagem(':sticker:' + sticker)
                        }}
                               
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

function Header() {
    return (
        <>
            <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text variant='heading5'>
                    Chat
                </Text>
                <Button
                    variant='tertiary'
                    colorVariant='neutral'
                    label='Logout'
                    href="/"
                />
            </Box>
        </>
    )
}

function MessageList(props) {
    console.log(props)    
    return (
        <Box
            tag="ul"
            styleSheet={{
                overflow: 'scroll',
                display: 'flex',
                flexDirection: 'column-reverse',
                flex: 1,
                color: appConfig.theme.colors.neutrals["000"],
                marginBottom: '16px',
            }}
        >
            {props.mensagens.map((mensagem) => {
                return (
                    <Text
                        key={mensagem.id}
                        tag="li"
                        styleSheet={{
                            borderRadius: '5px',
                            padding: '6px',
                            marginBottom: '12px',
                            hover: {
                                backgroundColor: appConfig.theme.colors.neutrals['000'],
                            }
                        }}
                    >
                        <Box
                            styleSheet={{
                                marginBottom: '2px',
                            }}
                        >
                            <Image
                                styleSheet={{
                                    width: '10px',
                                    height: '10px',
                                    borderRadius: '50%',
                                    display: 'inline',
                                    marginRight: '8px',
                                }}
                                src={`https://github.com/${mensagem.de}.png`}
                            />

                            <text tag ='strong'>

                            {mensagem.de}
                            </text>

                            <Text
                                styleSheet={{
                                    fontSize: '10px',
                                    marginLeft: '8px',
                                    color: appConfig.theme.colors.neutrals[300],
                                }}
                            >
                                {(new Date().toLocaleDateString())}
                            </Text>
                        </Box>
                        {/*if mensagem possui sticker:
                           mostra a imagem 
                        else
                           mensagem.texto
                        Condicional : {mensagem.texto.startsWith(':sticker:')}*/}

                        {mensagem.texto.startsWith(':sticker:')
                        ?(
                            <Image src={mensagem.texto.replace(':sticker:', '')}/>
                        )
                    : (
                        mensagem.texto
                    )}
                    </Text>
                );
            })}
        </Box>
    )
}