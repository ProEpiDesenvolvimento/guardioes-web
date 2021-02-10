import React from 'react'
import { FaInstagram, FaFacebook } from 'react-icons/fa'
import {
	Container,
	Title,
	Text,
	Info,
	Option,
	SocialMedia,
	SocialMediaText,
} from './styles'

export default function Contato(){
	return (
		<Container>
			<Title>ProEpi</Title>
			<Info>
				<Text>
					A ProEpi, Associação Brasileira de Profissionais de Epidemiologia de Campo, é uma organização não governamental sem fins lucrativos fundada em 2014.
				</Text>
			</Info>

			<Title>Fale com a ProEpi</Title>
			<Info>
				<Option>Email: </Option>
				<Text>contato@proepi.org.br</Text>
			</Info>

			<Info>
				<Option>Endereço: </Option>
				<Text>SRTVS QD 701, bloco “O”, edifício Multiempresarial, sala 891 – Asa Sul – Brasília</Text>
			</Info>

			<Info>
				<Option>CEP: </Option>
				<Text>70.340-000</Text>
			</Info>

			<Info>
				<Title>ProEpi nas Redes Sociais</Title>

				<SocialMedia onClick={() => window.open('https://facebook.com/AssociacaoProEpi')}>	
					<FaFacebook size={30}/>
					<SocialMediaText> /AssociacaoProEpi</SocialMediaText>
				</SocialMedia>	
			
				<SocialMedia onClick={() => window.open('http://instagram.com/redeproepi')}> 
					<FaInstagram size={30} />
					<SocialMediaText> @proepi</SocialMediaText>
				</SocialMedia>
			</Info>
		</Container>
	)
}