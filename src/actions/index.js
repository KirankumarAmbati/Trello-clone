import { addCardToListApi, addListToBoardApi, initialLoadApi } from '../data'

function addListToBoard(listId, title) {
    return {
        type: 'ADD_LIST_TO_BOARD',
        listId,
        title
    }
}

function asyncAddListToBoard(title) {
    return (dispatch) => {
        addListToBoardApi(title).then((listId) => {
            dispatch(addListToBoard(listId, title))
        })
    }
}

function addCardToList(listId, cardId, cardTitle, cardDescription) {
    return {
        type: 'ADD_CARD_TO_LIST',
        listId,
        cardId,
        cardTitle,
        cardDescription
    }
}


function asyncAddCardToList(listId, cardTitle, cardDescription) {
    return (dispatch) => {
        addCardToListApi(listId, cardTitle, cardDescription).then((cardId) => {
            dispatch(addCardToList(listId, cardId, cardTitle, cardDescription))
        })
    }
}

function initialLoad(lists) {
    return {
        type: 'INITIAL_LOAD',
        lists
    }
}

function handleInitialLoad() {
    return (dispatch) => {
        initialLoadApi().then((lists) => {
            dispatch(initialLoad(lists))
        })
    }
}

export {
    asyncAddCardToList,
    asyncAddListToBoard,
    handleInitialLoad
}