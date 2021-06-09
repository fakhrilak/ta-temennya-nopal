import { REPORT_PENDING, REPORT_SUCCESS, REPORT_FAIL } from '../constants';

import { APIPOS, setAPIPOS } from '../../utils/axios';
import Cookies from 'js-cookie';

export const getRevenueAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: REPORT_PENDING });

    setAPIPOS(`Bearer ${Cookies.get('token')}`);

    const getRevenueResponse = await APIPOS.get(
      `api/v1/transactions/revenue?from=${data.startDate}&to=${data.endDate}&order=createdAt:DESC`
    );

    const getExpenditureResponse = await APIPOS.get(
      `api/v1/transactions/expenditure?from=${data.startDate}&to=${data.endDate}&order=createdAt:DESC`
    );

    const revenue = [...getRevenueResponse.data.data.productOrder];
    const sumRevenue = getRevenueResponse.data.sumRevenue;

    const restockStockRooms = getExpenditureResponse.data.data.restockStockRoom;
    const productOrderShippings = getExpenditureResponse.data.data.productOrderShipping;
    const expenditure = [
      ...restockStockRooms.map((restck) => ({
        id: `RESTOCKSTOCKROOM-${restck.id}`,
        name: restck.name,
        price: restck.price,
        type: 'RESTOCKSTOCKROOM',
        createdAt: restck.createdAt,
      })),
      ...productOrderShippings.map((shipping) => ({
        id: shipping.id,
        name: shipping.name,
        price: shipping.price,
        type: 'PRODUCTORDERSHIPPING',
        createdAt: shipping.createdAt,
      })),
    ];
    const expenditureRestockStockRoom = parseInt(
      getExpenditureResponse.data.sumRestockStockRoom ?? 0
    );
    const expenditureProductOrderShipping = parseInt(
      getExpenditureResponse.data.sumProductOrderShipping ?? 0
    );
    const sumExpenditure = expenditureRestockStockRoom + expenditureProductOrderShipping;

    dispatch({
      type: REPORT_SUCCESS,
      payload: {
        revenue,
        sumRevenue,
        expenditure,
        sumExpenditure,
      },
    });
  } catch (e) {
    console.log(e);
    console.log(e.response);

    dispatch({
      type: REPORT_FAIL,
      payload: e.response,
    });
  }
};

export const exportUsersXL = async () => {
  try {
    console.log('Hai from export users');
    let ewe = await APIPOS.get(
      `/api/v1/exports/excel/users?accessToken=${Cookies.get('token')}`
    );
    console.log(ewe.data);
  } catch (e) {
    console.log(e);
    console.log(e.response);
  }
};
