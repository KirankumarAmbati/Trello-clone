import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

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
    cardDescription: ''
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
    let {lists} = this.props;

    // let newLists = Array.from(lists)

    console.log('Result: ', result, lists);
    if(!destination) {
      return
    }
    
    if(
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return
    }



    if(type === 'list') {
      let resElement = lists.splice(result.source.index, 1);
      
      lists.splice(result.destination.index, 0, resElement[0]);

    } else {
  
      let resElement = lists[result.source.droppableId].cards.splice(result.source.index, 1);
      
      lists[result.destination.droppableId].cards.splice(result.destination.index, 0, resElement[0]);
    }

    console.log('Reslt: ', lists);
    

  }

  render() {
    const { lists, asyncAddCardToList, asyncAddListToBoard } = this.props;

    return (
      <div className="App">
        
        <div className="App-header">
          <Brand>Trello</Brand>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="all-columns" direction="horizontal" type="list">
            {(provided) => (
              <Container
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
              {
                lists && lists.map((list, index) => (
                  <List key={list.id} list={list} listIndex={index} showModal={this.showModal}  handleAddCard={this.handleAddCard} />
                ))
              }
              <button style={{ backgroundColor: '#EC5E0C', color: 'white', border: '0', height: '66px', cursor: 'pointer', width: '10%', marginTop: '0.6%' }} onClick={() => this.setState({ addList: true })}>Add List</button>
              {provided.placeholder}
              </Container>
            )}
            </Droppable>
          </DragDropContext>


          <Modal show={this.state.show} handleClose={this.hideModal}>
            <h3 style={{ color: 'red' }}>{this.state.cardTitle}</h3>
            <p style={{ color: 'black' }}>{this.state.cardDescription}</p>
          </Modal>
          <Modal show={this.state.addCard} handleClose={this.hideModal}>
            <input type="text" onChange={(e) => this.setState({ cardTitle: e.target.value })} value={this.state.cardTitle} placeholder="Title" />
            <input type="text" onChange={(e) => this.setState({ cardDescription: e.target.value })} value={this.state.cardDescription} placeholder="Description" />
            <button onClick={() => {
              asyncAddCardToList(this.state.listId, this.state.cardTitle, this.state.cardDescription);
              this.setState({ listId: '', cardTitle: '', cardDescription: '' })
              this.hideModal();
            }}>Add Card</button>
          </Modal>
          <Modal show={this.state.addList} handleClose={this.hideModal}>
            <input type="text" value={this.state.listTitle} onChange={(e) => this.setState({ listTitle: e.target.value })} placeholder="Title" />
            <button onClick={() => {
              asyncAddListToBoard(this.state.listTitle);
              this.setState({ listTitle: '' })
              this.hideModal();
            }}>Add List</button>
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
