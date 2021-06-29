const initialState = {
    orderDetail:[],
    loading: false,
    error: null,
    ResorderDetails:[],
    product:[]
  };
  const ReportReducer = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
      case "ADD ORDER DETAIL":   
        return {
          ...state,
          orderDetail: payload
        };
      case "RES ORDERS":
        return {
          ...state,
          ResorderDetails:payload
        }
      case "SET PRODUCT":
        console.log(payload,"di redux")
        return{
          ...state,
          product:payload
        }
      case "ADD QTY":
        return{
          ...state,
        }
      case "REMOVE QTY":
        return{
          ...state,
        }
      default:
        return state;
    }
  };
  
  export default ReportReducer;