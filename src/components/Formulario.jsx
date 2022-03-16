import { useEffect, useState } from "react";
import Error from "./Error";
import styled from "@emotion/styled";
import useSelectMoneda from "../hooks/useSelectMoneda";
import {monedas} from "../data/monedas";

const InputSubmit = styled.input`
	background-color: #9497ff;
	border: none;
	width: 100%;
	padding: 10px;
	color: #fff;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color 0.3s ease;
	margin-top: 30px;

	&:hover {
		background-color: #7a7dfe;
		cursor: pointer;
	}
`;

const Formulario = () => {
	const [criptos, setCriptos] = useState([]);
	const [moneda, SelectMonedas] = useSelectMoneda("Elige tu Moneda", monedas);
	const [criptomonedas, SelectCriptomonedas] = useSelectMoneda(
		"Elige tu Criptomoneda",
		criptos
	);
	const [error, setError] = useState(false);

	// llamada a la API
	const consultarAPI = async () => {
		try {
			const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
			const respuesta = await fetch(url);
			const {Data} = await respuesta.json();

			const arrayCriptos = Data.map((criptos) => {
				const objetoCriptos = {
					id: criptos.CoinInfo.Name,
					nombre: criptos.CoinInfo.FullName,
				};

				return objetoCriptos;
			});

			setCriptos(arrayCriptos);
		} catch (error) {
			return error;
		}
	};

	useEffect(() => {
		consultarAPI();
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		if ([moneda, criptomonedas].includes("")) {
			setError(true);

			return;
		}

		setError(false);
	};

	return (
		<>
			{error && <Error>Todos los campos son obligatorios</Error>}
			<form onSubmit={handleSubmit}>
				<SelectMonedas />
				<SelectCriptomonedas />
				<InputSubmit type="submit" value="Cotizar" />
			</form>
		</>
	);
};

export default Formulario;
