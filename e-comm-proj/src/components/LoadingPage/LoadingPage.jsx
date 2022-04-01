import React from 'react'
import styled from 'styled-components'
const Container = styled.div`
    background-color: #ecf19ebb;
    display: flex;
    justify-content: center;
    align-content: center;
    min-height: 100vh;
`
const Text = styled.h1`
    /* text-align: center; */
    margin:auto;
`
const LoadingPage = () => {
    return (
        <Container>
            <Text>
                Loading data...
            </Text>
        </Container>
    )
}

export default LoadingPage