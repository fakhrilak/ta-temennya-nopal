import { REPORT_PENDING, REPORT_SUCCESS, REPORT_FAIL } from '../constants';

const initialState = {
  revenue: [],
  sumRevenue: 0,
  expenditure: [],
  sumExpenditure: 0,
  loading: false,
  error: null,
};

const ReportReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REPORT_PENDING:
      return {
        loading: true,
      };

    case REPORT_SUCCESS:
      return {
        ...state,
        revenue: payload.revenue,
        sumRevenue: payload.sumRevenue,
        expenditure: payload.expenditure,
        sumExpenditure: payload.sumExpenditure,
        loading: false,
      };

    case REPORT_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    default:
      return state;
  }
};

export default ReportReducer;
