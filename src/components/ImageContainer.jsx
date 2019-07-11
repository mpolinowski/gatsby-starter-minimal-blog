import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  margin: 6rem auto 0 auto;
  padding:1rem;
  overflow: hidden;
  background-color: rgb(30, 30, 30);
  box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12);
`


function GifContainer(props) {
    return (
        <Card>
              <img
                  src={props.gifUrl}
                  alt={props.alt}
              />
        </Card>
  
    );
  }


export default GifContainer;