const initState = []
const itemListReducer = (state=initState, action)=>{
    if (typeof(action.payload) !== "undefined"){
    let newState = [...state]
    newState = action.payload
    return newState
  }
  else{
    return state
  }

}

export default itemListReducer;
