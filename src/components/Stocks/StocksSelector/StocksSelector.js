import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import StocksForm from "../StocksForm/StocksForm";
import StockInfo from "../StockInfo/StockInfo";

const stocksSelector = props => {
    const isSelectedStock = props.selectedStock != null;
    const stockInfo = (isSelectedStock) ? <StockInfo selectedStock={props.selectedStock}></StockInfo> : null;

    return (
        <Aux>
            <StocksForm stocks={props.stocks} onFormCompleted={props.onFormCompleted} ></StocksForm>
            { stockInfo}
        </Aux>
    );
};

export default stocksSelector;