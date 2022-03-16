import {useState, useEffect} from "react";
import styled from "@emotion/styled";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";
import Spiner from "./components/Spiner";
import ImagenCripto from "./img/imagen-criptos.png";

const Contenedor = styled.div`
	max-width: 900px;
	margin: 0 auto;
	width: 90%;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Imagen = styled.img`
	max-width: 400px;
	width: 80%;
	margin: 100px auto 0 auto;
	display: block;
`;

const Heading = styled.h1`
	font-family: "Lato", sans-serif;
	color: #fff;
	text-align: center;
	font-weight: 700;
	margin-top: 80px;
	margin-bottom: 50px;
	font-size: 34px;

	&::after {
		content: "";
		width: 100px;
		height: 6px;
		background-color: #66a2fe;
		display: block;
		margin: 10px auto 0 auto;
	}
`;

function App() {

	const [monedas, setMonedas] = useState({})
	const [cotizacion, setCotizacion] = useState({})
	const [cargando, setCargando] = useState(false)


	// Consultar API para hacer la cotizacion entre las dos monedas
	const cotizarCripto = async () => {
		setCargando(true)
		setCotizacion({})
		const {moneda, criptomonedas} = monedas
		const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomonedas}&tsyms=${moneda}`
		const respuesta = await fetch(url)
		const resultado = await respuesta.json()
		// Consultar API de Forma dinamica ya que varian las KEY segun la moneda que se vaya  a cotizar
		setCotizacion(resultado.DISPLAY[criptomonedas][moneda])
		setCargando(false)
	}


	useEffect(() => {
		if (Object.keys(monedas).length > 0) {
			cotizarCripto()
		}
	},[monedas])

	return (
		<Contenedor>
			<Imagen src={ImagenCripto} alt="Imagenes de Criptomonedas" />
			<div>
				<Heading>Cotiza Criptomonedas al Instante</Heading>
				<Formulario setMonedas={setMonedas} />

				{cargando && <Spiner />}

				{cotizacion.PRICE && <Resultado cotizacion={cotizacion} />}
			</div>
		</Contenedor>
	);
}

export default App;
