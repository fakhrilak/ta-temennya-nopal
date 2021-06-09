const initialState = {
    orderDetail:[],
    loading: false,
    error: null,
  };
  const ReportReducer = (state = initialState, action) => {
    const { type, payload } = action;
    
    switch (type) {
      case "ADD ORDER DETAIL":   
        return {
          ...state,
          orderDetail: payload
        };

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