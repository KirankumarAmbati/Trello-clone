import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 5px;
  margin-bottom: 15px;
  min-height: 60px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};

`;

export default class Card extends React.Component {
    render() {
        const {card, showModal, index} = this.props;

        return (
            <Draggable draggableId={card.id} index={index}>
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    ><p onClick={() => showModal(card.cardTitle, card.cardDescription)}>{card.cardTitle}</p></Container>
                )}
            </Draggable>
        )
    }
}