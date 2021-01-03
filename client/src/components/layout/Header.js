import React from 'react';
import styled from 'styled-components';


const Header = ()  => {
    return <MainContainer>
        <h1>Customer Orders</h1>
    </MainContainer>
};

export default Header;

//main container
const MainContainer = styled.header`
    background: url(../../img/dv8.jpg)no-repeat center;
    height: 15rem;
    h1 {
        transform: translate(-50%, -50%);
        font-weight: 900;
        position: absolute;
        top: 25%;
        left: 50%;
    }
`;
