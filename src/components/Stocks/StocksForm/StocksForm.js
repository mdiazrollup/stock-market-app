import React, {useEffect} from "react";
import classes from "./StocksForm.module.css";

const StocksSelector = props => {
    let selectControl = null;
    const stocks = props.stocks || [];
    const selectOptions = stocks.map(stock => <option value={stock.symbol} key={stock.symbol}>{stock.symbol} - {stock.name}</option>);
    
    useEffect(()=>{
        selectControl.focus();
    });

    return(
        <form className={classes.Stockform}>
            <fieldset>
                <label htmlFor="stockSymbol">Stock Symbol: </label>
                <select 
                ref={(select) => { selectControl = select; }}
                aria-required="true"
                name="stockSymbol" 
                id="stockSymbol" placeholder="Please select a stock" onChange={(event) => props.onStockSelected(event.target.value)}>
                    <option value="">Please select a stock</option>
                    {selectOptions}
                </select>
            </fieldset>
        </form>
    );
};
export default StocksSelector;