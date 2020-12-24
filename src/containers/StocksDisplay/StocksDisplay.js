import React, { useEffect}  from "react";
import Aux from '../../hoc/Aux/Aux';
import StocksSelector from '../../components/Stocks/StocksSelector/StocksSelector';
import StocksPriceTable from '../../components/Stocks/StocksPriceTable/StocksPriceTable';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/actions';
import { useInterval } from "../../hooks/use-interval";
import {intervalTimer} from '../../share/constants';
import StocksPosts from '../../components/Stocks/StocksPosts/StocksPosts';

const StocksDisplay = props => {
    const {onGetStocks, onStockSelected} = props;
    const socialPosts = (props.selectedStock) ? props.selectedStock.posts : [];

    // Get initial list of stocks
	useEffect(() => {
		onGetStocks();
    }, [onGetStocks]);

    // Update prices of selected stock polling the service
    useInterval(() => {
        if(props.selectedStock) {
            onStockSelected(props.selectedStock.symbol, props.selectedStock.numPosts);
        }
    }, intervalTimer);

    const onFormCompleted = (formValues) => {
        onStockSelected(formValues.symbol, formValues.numPosts);
    }

    return (
        <Aux>
            <StocksSelector stocks={props.stocks} 
            onFormCompleted={onFormCompleted} selectedStock={props.selectedStock}></StocksSelector>
            <StocksPriceTable selectedStock={props.selectedStock}></StocksPriceTable>
            <StocksPosts posts={socialPosts} show={props.selectedStock !== null}></StocksPosts>
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
        onStockSelected: (stockSymbol, numPosts) => dispatch(
            {type: actionTypes.GET_STOCK_DATA, stockSymbol: stockSymbol, numPosts: numPosts})
    }
};

export default connect(mapStateToProps, mapDispatchtoProps)(StocksDisplay);