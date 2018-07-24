const INITIAL_STATE = { value: JSON.parse(localStorage.getItem('shoppingCart')) };

const shoppingCartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_SHOPPING_CART':
        localStorage.setItem('shoppingCart', JSON.stringify(state.value));
        return {
          ...state,
          value: state.value + action.payload
        };
      default:
        return state;
    }
};

export default shoppingCartReducer;