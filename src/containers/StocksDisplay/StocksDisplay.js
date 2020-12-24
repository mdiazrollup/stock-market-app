import React, { useEffect}  from "react";
import Aux from '../../hoc/Aux/Aux';
import StocksSelector from '../../components/Stocks/StocksSelector/StocksSelector';
import StocksPriceTable from '../../components/Stocks/StocksPriceTable/StocksPriceTable';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';

const StocksDisplay = props => {
    const {onGetStocks, onStockSelected} = props;

	useEffect(() => {
		onGetStocks();
    }, [onGetStocks]);
    
    const onStockSelectedHandler = (stockSymbol) => {
        onStockSelected(stockSymbol);
    };

    return (
        <Aux>
            <StocksSelector stocks={props.stocks} onStockSelected={onStockSelectedHandler} selectedStock={props.selectedStock}></StocksSelector>
            <StocksPriceTable selectedStock={props.selectedStock}></StocksPriceTable>
        </Aux>
    );
};

const mapStateToProps = state => {
    return {
        stocks: state.stocks,
        selectedStock: state.currentStock
    }
};

const mapDispatchtoProps = dispatch => {
    return {
        onGetStocks: () => dispatch({type: actionTypes.GET_STOCKS}),
        onStockSelected: (stockSymbol) => dispatch({type: actionTypes.GET_STOCK_DATA, stockSymbol: stockSymbol})
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(StocksDisplay);