import React from 'react'
import styled from "@emotion/styled"

const Label = styled.label`
  color: #fff;
`

const useSelectMoneda = (label) => {
  
  const Selectmonedas = () => (
    <>
      <Label>{label}</Label>
    </>
  )

  return [Selectmonedas]
}

export default useSelectMoneda