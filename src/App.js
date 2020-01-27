import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import '@atlaskit/css-reset'

import './App.css';
import Modal from './Modal';
import { handleInitialLoad, asyncAddCardToList, asyncAddListToBoard } from './actions'
import List from './components/List';


const Container = styled.div`
  display:flex
`

const Brand = styled.div`
  font-size: 38px;
  font-family: cursive;
`

class App extends React.Component {
  state = {
    show: false,
    addCard: false,
    addList: false,
    cardTitle: '',
    cardDescription: '',
    listTitle: '',
    addListError: false,
    addCardError: false
  };

  showModal = (cardTitle, cardDescription) => {
    this.setState({
      show: true,
      cardTitle,
      cardDescription
    });
  };

  hideModal = () => {
    this.setState({
      show: false,
      addCard: false,
      addList: false
    });
  };

  handleAddCard = (listId) => {
    this.setState({
      listId,
      addCard: true
    })
  }

  componentDidMount() {
    this.props.handleInitialLoad()
  }

  onDragEnd = result => {
    const { source, destination, type } = result;
    let { lists } = this.props;

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if (type === 'list') {
      let resElement = lists.splice(result.source.index, 1);

      lists.splice(result.destination.index, 0, resElement[0]);

    } else {
      let resElement = lists[result.source.droppableId].cards.splice(result.source.index, 1);

      lists[result.destination.droppableId].cards.splice(result.destination.index, 0, resElement[0]);
    }
  }

  render() {
    let { show, cardTitle, cardDescription, addCard, listId, addList, listTitle, addListError, addCardError } = this.state;
    const { lists, asyncAddCardToList, asyncAddListToBoard } = this.props;

    return (
      <div className="App">
        <div className="App-header">
          <Brand>Crello</Brand>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="list">
              {(provided) => (
                <Container
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {
                    lists && lists.map((list, index) => (
                      <List key={list.id} list={list} listIndex={index} showModal={this.showModal} handleAddCard={this.handleAddCard} />
                    ))
                  }
                  {provided.placeholder}
                  <button
                    style={{
                      backgroundColor: '#EC5E0C',
                      color: 'white',
                      border: '0',
                      height: '66px',
                      cursor: 'pointer',
                      width: '10%'
                    }}
                    onClick={() => this.setState({ addList: true })}
                  >
                    Add List
                  </button>
                </Container>
              )}
            </Droppable>
          </DragDropContext>

          <Modal show={show} handleClose={this.hideModal}>
            <h3 style={{ color: 'red' }}>{cardTitle}</h3>
            <p style={{ color: 'black' }}>{cardDescription}</p>
          </Modal>
          <Modal show={addCard} handleClose={this.hideModal}>
            <input
              type="text"
              placeholder="Title"
              value={cardTitle}
              onChange={(e) => this.setState({ cardTitle: e.target.value })}
              style={{
                border: '2px solid #EC5E0C',
                padding: '10px'
              }}
            />
            <input
              type="text"
              placeholder="Description"
              value={cardDescription}
              onChange={(e) => this.setState({ cardDescription: e.target.value })}
              style={{
                border: '2px solid #EC5E0C',
                padding: '10px',
                marginLeft: '5px'
              }}
            />
            <button
              onClick={() => {
                if (cardTitle === '') {
                  this.setState({ addCardError: true });
                } else {
                  this.setState({ addCardError: false, listId: '', cardTitle: '', cardDescription: '' });
                  asyncAddCardToList(listId, cardTitle, cardDescription);
                  this.hideModal();
                }
              }}
              style={{
                marginLeft: '5px',
                padding: '10px',
                border: '2px solid #EC5E0C',
                backgroundColor: '#EC5E0C',
                color: 'white'
              }}
            >
              Add Card
            </button>
            {addCardError && <p style={{ color: 'red' }}>* Please enter title to proceed</p>}
          </Modal>
          <Modal show={addList} handleClose={this.hideModal}>
            <input
              type="text"
              style={{ border: '2px solid #EC5E0C', padding: '10px' }}
              value={listTitle}
              onChange={(e) => this.setState({ listTitle: e.target.value })}
              placeholder="Title"
            />
            <button
              onClick={() => {
                if (listTitle === '') {
                  this.setState({ addListError: true });
                }
                else {
                  this.setState({ addListError: false, listTitle: '' });
                  asyncAddListToBoard(listTitle);
                  this.hideModal();
                }
              }}
              style={{
                marginLeft: '5px',
                padding: '10px',
                border: '2px solid #EC5E0C',
                backgroundColor: '#EC5E0C',
                color: 'white'
              }}
            >
              Add List
            </button>
            {addListError && <p style={{ color: 'red' }}>* Please enter title to proceed</p>}
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    lists: state
  }
}

export default connect(mapStateToProps, { handleInitialLoad, asyncAddCardToList, asyncAddListToBoard })(App);
