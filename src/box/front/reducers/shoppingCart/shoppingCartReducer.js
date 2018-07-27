
let qtdItem = JSON.parse(localStorage.getItem('itemShoppingCart'));

const INITIAL_STATE = { 
  value: JSON.parse(localStorage.getItem('itemShoppingCart')) !== null ? qtdItem.length : 0
};

const shoppingCartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'ADD_SHOPPING_CART':        
        return {
          ...state,
          value: addItemShoppingCart(action.payload)
        };
      case 'RMV_SHOPPING_CART':        
        return {
          ...state,
          value: rmvItemShoppingCart(action.payload)
        };
      default:
        return state;
    }
}; 

const addItemShoppingCart = (item) => {
  //localStorage.removeItem('itemShoppingCart');
  let itens = JSON.parse(localStorage.getItem('itemShoppingCart'));
  
  if(itens === null ){
    localStorage.setItem('itemShoppingCart', JSON.stringify(item));
  }else{
    var getItem = [];

    for(var i = 0; i < itens.length; i++){
      if(item._id !== itens[i]._id){
        getItem.push(itens[i]);
      }
    }
    getItem.push(item);
    localStorage.setItem('itemShoppingCart', JSON.stringify(getItem));    
  } 

  itens = JSON.parse(localStorage.getItem('itemShoppingCart'));
  return itens.length;
}

const rmvItemShoppingCart = (item) => {
  
  let itens = JSON.parse(localStorage.getItem('itemShoppingCart'));
  
  if(itens !== null ){

    for(var i = 0; i < itens.length; i++){
      if(item._id === itens[i]._id){
        itens.splice(i, 1);
      }
    }
    localStorage.setItem('itemShoppingCart', JSON.stringify(itens));    
   
  }

  itens = JSON.parse(localStorage.getItem('itemShoppingCart'));
  window.location.replace("/shopping-cart");
  return itens.length;
}


export default shoppingCartReducer;