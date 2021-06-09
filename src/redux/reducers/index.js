import { combineReducers } from 'redux';

import AuthReducer from './AuthReducer';
import ReportReducer from './ReportReducer';
import ProductOrder from "./ProductOrder"

export default combineReducers({ AuthReducer, ReportReducer ,ProductOrder});
