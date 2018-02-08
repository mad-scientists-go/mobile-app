import { AsyncStorage } from 'react-native'
export const ORDER_HISTORY_STORAGE_KEY = 'SmartMartMobile:orders'

export function fetchOrders () {
  return AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
    .then(formatOrderResults)
    .then(results => results.orders)
}

export function getOrder (order) {
  return AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
    .then(formatOrderResults)
    .then(results => results.orders[order])
}

export function logout () {
  AsyncStorage.removeItem(ORDER_HISTORY_STORAGE_KEY)
}

export function login ( user ) {

 return AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY)
  .then(res => {
  //  let usesrJs = JSON.parse(user)
  //  console.log('storageres', user.email)
  //     // if (resJs !== user) {
       return AsyncStorage.removeItem(ORDER_HISTORY_STORAGE_KEY)
        .then(() =>  AsyncStorage.setItem(ORDER_HISTORY_STORAGE_KEY, JSON.stringify(user)))
        .then(() =>  AsyncStorage.getItem(ORDER_HISTORY_STORAGE_KEY))
      // }
     })
}


// export function addCardToDeck (title, qna) {
//   return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
//     .then( data => {
//       decks = JSON.parse(data);
//       decks[title].questions.push(qna);
//       AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
//     })
// }


function formatOrderResults (results) {
  return results === null
    ? setDummyOrders()
    : JSON.parse(results)
}

function setDummyOrders () {
  const dummyOrders =
  {
    card_num: "770",
    createdAt: "2018-02-05T17:33:29.318Z",
    email: "TheGOAT@gmail.com",
    first: "Aaron",
    googleId: null,
    id: 1,
    isAdmin: true,
    last: "Rodgers",
    orders:
    [
      {
        createdAt: 'Today',
        id: 6,
        lineItems:
          [{
            id: 10,
            orderId: 6,
            product:
                {barcode:
                "2093fhasd8fj8f9",
                categoryId: 1,
                id: 1,
                inventory: 7,
                name: "Coke",
                price: 1},
            productId: 1,
            purchasePrice: 1,
            qty:3
      }],
        status: "cart",
        subtotal: 3,
        userId: 2
      },
      {
        createdAt: 'Last Monday',
        id: 5,
        lineItems:
        [{
          id: 10,
          orderId: 6,
          product:
              {barcode:
              "2093fhasd8fj8f9",
              categoryId: 1,
              id: 1,
              inventory: 7,
              name: "Coke",
              price: 1},
          productId: 1,
          purchasePrice: 1,
          qty:3
    }],
      status: "paid",
      subtotal: 3,
      userId: 2
      }
    ],
   password: "d8725c546dc0b456479d1100c7153957887dfa87199323bba56145279b07f3a2",
   salt: "g57qe6PMczswHCNsBT6cdA==",
   subject_id: "a9sd90sif9i09",
   updatedAt: "2018-02-05T17:33:29.318Z"
  }
  AsyncStorage.setItem(ORDER_HISTORY_STORAGE_KEY, JSON.stringify(dummyOrders))

  return dummyOrders
}

