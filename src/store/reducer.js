import * as actionTypes from './actions';
import {updateObject} from '../share/utility';
import {getStocksData, getStockDataBySymbol} from '../services/stockService';

const initialState = {
    stocks: [],
    currentStock: null
};

const getStocks = (state, action) => {
	const updatedStocks = [...getStocksData()];
	const updatedState = {
		stocks: updatedStocks
	};
	return updateObject(state, updatedState);
}

const getStockData = (state, action) => {
	const stockSymbol = action.stockSymbol;
	if (!stockSymbol) {
		return updateObject(state, {currentStock: null});
	}
	const currentStock = getStockDataBySymbol(stockSymbol, action.numPosts);
	return updateObject(state, {currentStock: currentStock});
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
		case actionTypes.GET_STOCKS:
			return getStocks(state, action);
		case actionTypes.GET_STOCK_DATA:
			return getStockData(state, action);
		default:
			return state;
	}
};

export default reducer;