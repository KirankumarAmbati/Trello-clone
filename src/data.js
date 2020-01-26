let i = 0;

// export let lists = [{ "id": "0", "title": "A", "cards": [{ "id": "card-1580062087109", "cardTitle": "1", "cardDescription": "" }, { "id": "card-1580062092015", "cardTitle": "3", "cardDescription": "" }] }, { "id": "1", "title": "B", "cards": [{ "id": "card-1580062096265", "cardTitle": "4", "cardDescription": "" }, { "id": "card-1580062103574", "cardTitle": "5", "cardDescription": "" }] }];

export let lists = []

export function addListToBoardApi(title) {

    let newList = {
        id: (i++).toString(),
        title,
        cards: []
    }

    lists.push(newList);

    return new Promise((res, rej) => {
        setTimeout(() => res(newList.id), 1000)
    });
}

export function addCardToListApi(listId, cardTitle, cardDescription) {

    let reqList = lists[listId]
    let { cards } = reqList

    let newCard = {
        id: 'card-' + Date.now(),
        cardTitle,
        cardDescription
    }

    cards.push(newCard)

    return new Promise((res, rej) => {
        setTimeout(() => res(newCard.id), 1000)
    });
}

export function initialLoadApi() {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(lists)
        }, 1000);
    })
}