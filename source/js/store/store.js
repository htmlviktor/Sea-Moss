const initialState = {
    products: [{title: 'Some'}]
}


const ActionType = {
    ADD_PRODUCT_TO_CART: 'ADD_PRODUCT_TO_CART'
}


const ActionCreators = {
    addProduct: (payload) => ({ type: ActionType.ADD_PRODUCT_TO_CART, payload })
}



const reducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionType.ADD_PRODUCT_TO_CART:
            return {
                ...state, products: [...state.products, payload]
            }
        default:
            return state;
    }
}


export { reducer, ActionCreators };