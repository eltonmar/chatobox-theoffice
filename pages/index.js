import { Button, Box, Text, TextField, Image } from '@skynexui/components'
import React from 'react';
import {useRouter} from 'next/router'
import appConfig from "../config.json"

function Titulo(props) {

    var Tag = props.tag || 'h1'
    return (
        <>
            <Tag>{(props.children)}</Tag>
            <style jsx>{`
    ${Tag} {
        color:  ${appConfig.theme.colors.neutrals['200']};
        font-size: 24px;
        font-weight: 500;
        
    }
`}</style>

        </>
    )
}
/* Componente React
function HomePage() {
    //JSX
    return (
<div style={{
  "margin": "16px",
  "padding": "16px",
  "color": "green",
  "backgroundColor": {
    "xs": "red",
    "sm": "blue",
    "md": "green",
    "lg": "purple",
    "xl": "black"
  }
}}>
    <GlobalStyle/>
    <Titulo tag = 'h2'>Boas Vindas de volta!</Titulo>
    <h2>Discord - Alura Matrix</h2>
    
</div>
    ) 
  }
  
export default HomePage*/

export default function PaginaInicial() {
    // const username = 'eltonmar';
    const [username, setUsername] = React.useState ('')
    const roteamento = useRouter ()

    
    return ( 
        <>
            <Box
                styleSheet={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: appConfig.theme.colors.primary['000'],
                    backgroundImage: 'url(https://virtualbackgrounds.site/wp-content/uploads/2020/09/talking-head-at-the-office-tv-series.jpg)',
                    backgroundRepeat: 'np-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
                }}
            >
                <Box
                    styleSheet={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: {
                            xs: 'column',
                            sm: 'row',
                        },
                        width: '100%', maxWidth: '700px',
                        borderRadius: '5px', padding: '32px', margin: '16px',
                        boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
                        backgroundColor: appConfig.theme.colors.neutrals['000'],
                    }}
                >
                    {/* Formulário */}
                    <Box
                        as="form"
                        onSubmit = {function (infosDoEvento){
                            infosDoEvento.preventDefault ()
                            console.log('Alguem submeteu o form')
                            roteamento.push (`/chat?username=${username}`)
                            //window.location.href = '/chat'
                        }}
                        styleSheet={{
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
                        }}
                    >
                        <Titulo tag="h2">Bem vindo ! </Titulo>
                        <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[900] }}>
                            {appConfig.name}
                        </Text>
 
                        <TextField
                            fullWidth 
                            value= {username}
                            onChange = {function handler (event) {
                                console.log  ('tocou', event.target.value)
                                //Onde está o Valor ?
                                const valor = event.target.value
                                // Trocar o valor da variável pelo React
                                setUsername(valor)
                            } }
                            textFieldColors={{
                                neutral: {
                                    textColor: appConfig.theme.colors.neutrals[200],
                                    mainColor: appConfig.theme.colors.neutrals[200],
                                    mainColorHighlight: appConfig.theme.colors.primary['000'],
                                    backgroundColor: appConfig.theme.colors.neutrals[800],
                                },
                            }}
                        /> 
                        <Button
                            type='submit'
                            label='Entrar'
                            
                            
                            fullWidth
                            buttonColors={{
                                contrastColor: appConfig.theme.colors.neutrals["000"],
                                mainColor: appConfig.theme.colors.primary[500],
                                mainColorLight: appConfig.theme.colors.primary[400],
                                mainColorStrong: appConfig.theme.colors.primary[600],
                            }}
                        /> 
                    </Box>
                    {/* Formulário */}


                    {/* Photo Area */}
                    <Box
                        styleSheet={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            maxWidth: '200px',
                            padding: '16px',
                            backgroundColor: appConfig.theme.colors.neutrals[800],
                            border: '1px solid',
                            borderColor: appConfig.theme.colors.neutrals[999],
                            borderRadius: '10px',
                            flex: 1,
                            minHeight: '240px',
                        }}
                    >
                        <Image
                            styleSheet={{
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                            src={`https://github.com/${username}.png`}
                        />
                        <Text
                            variant="body4"
                            styleSheet={{
                                color: appConfig.theme.colors.neutrals[200],
                                backgroundColor: appConfig.theme.colors.neutrals[900],
                                padding: '3px 10px',
                                borderRadius: '1000px'
                            }}
                        >
                            {username}
                        </Text>
                    </Box>
                    {/* Photo Area */}
                </Box>
            </Box>
        </>
    );
}