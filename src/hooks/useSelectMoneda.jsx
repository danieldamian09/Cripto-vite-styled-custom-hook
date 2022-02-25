import {useState} from "react";
import styled from "@emotion/styled";

const Label = styled.label`
	color: #fff;
	display: block;
	font-family: "Lato", sans-serif;
	font-size: 24px;
	font-weight: 700;
	margin: 15px 0;
`;

const Select = styled.select`
	width: 100%;
	padding: 14px;
	border-radius: 10px;
`;

const useSelectMoneda = (label, opciones) => {
	const [state, setState] = useState("");

	const Selectmonedas = () => (
		<>
			<Label>{label}</Label>
			<Select value={state} onChange={ e => setState(e.target.value)}>
				<option value="">Seleccione</option>
				{opciones.map((opcion) => (
					<option key={opcion.id} value={opcion.id}>
						{opcion.nombre}
					</option>
				))}
			</Select>
		</>
	);

	return [Selectmonedas];
};

export default useSelectMoneda;
