export default function reducer(state = [], action ) {
    console.log('ReducE');
    
    switch (action.type) {
        case 'ADD_LIST_TO_BOARD':
            return [
                ...state,
                {
                    id: action.listId,
                    title: action.title,
                    cards: []
                }
            ]
        case 'ADD_CARD_TO_LIST':

            let newState = [...state]

            let reqList = newState[action.listId]
            let { cards } = reqList

            let newCard = {
                id: action.cardId,
                cardTitle: action.cardTitle,
                cardDescription: action.cardDescription
            }
            cards.push(newCard)

            return newState        
        case 'INITIAL_LOAD':
            return [
                ...state,
                ...action.lists
            ]
        default:
            return state;
    }
}