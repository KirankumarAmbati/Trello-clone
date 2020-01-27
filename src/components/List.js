import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import Card from './Card'

const Container = styled.div`
    background-color: ${props => props.isDraggingOver ? 'lightblue' : 'white'};
    padding: 10px
`;

const OutsideContainer = styled.div`
    background-color: white;
    min-width: 200px;
    color: black;
    margin-right: 1px;
`;

const Title = styled.div`
    background-color: #EC5E0C;
    padding: 20px;
    color: white;
    min-height: 26px
`;

const List = ({ list, listIndex, showModal, handleAddCard }) => {
    return (
        <Draggable draggableId={list.id} index={listIndex}>
            {(provided) => (
                <OutsideContainer {...provided.draggableProps} ref={provided.innerRef}>
                    <Title {...provided.dragHandleProps}>{list.title}</Title>
                    <Droppable droppableId={(listIndex).toString()} type="card">
                        {(provided, snapshot) => (
                            <Container
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                isDraggingOver={snapshot.isDraggingOver}
                            >
                                {
                                    list && list.cards && list.cards.map((card, index) => (
                                        <Card card={card} key={card.id} showModal={showModal} index={index} />
                                    ))
                                }
                                {provided.placeholder}
                            </Container>
                        )}
                    </Droppable>
                        <button
                            style={{
                                cursor: 'pointer',
                                position: 'relative',
                                width: '90%',
                                marginBottom: '10px',
                                border: '2px solid black',
                                padding: '10px 20px',
                                marginTop: '20px',
                                minWidth: '100px'
                            }}
                            onClick={() => handleAddCard(listIndex)}
                        >
                            Add Card
                        </button>
                </OutsideContainer>
            )}
        </Draggable>
    )
}

export default List