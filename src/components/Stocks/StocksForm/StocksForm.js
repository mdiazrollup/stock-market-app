import React, {useEffect, useState } from "react";
import classes from "./StocksForm.module.css";
import {updateObject} from '../../../share/utility';

const StocksSelector = props => {
    let selectControl = null;
    const stocks = props.stocks || [];
    const selectOptions = stocks.map(stock => <option value={stock.symbol} key={stock.symbol}>{stock.symbol} - {stock.name}</option>);
    const [stocksForm, setStocksForm] = useState(
        {
            stockSymbol: {
                value: '',
                valid: false,
                touched: false
            },
            numPosts: {
                value: '',
                valid: false,
                touched: false
            }
        }
    );

    const [formIsValid, setFormIsValid] = useState(false);
    
    useEffect(()=>{
        selectControl.focus();
    }, [selectControl]);

    const onNumPostsChanged = (value) => {
        const updatedFormElement = updateObject(stocksForm.numPosts, {
			value: value,
			valid: value !== '' && !isNaN(value),
			touched: true
		});
		const updatedStockForm = updateObject(stocksForm,{
			numPosts: updatedFormElement
        });
        
        let formIsValid = true;
		for (let inputIdentifier in updatedStockForm) {
			formIsValid = updatedStockForm[inputIdentifier].valid && formIsValid;
		}

        setStocksForm(updatedStockForm);
        setFormIsValid(formIsValid);
    }

    const onStockSelected = (value) => {
        const updatedFormElement = updateObject(stocksForm.stockSymbol, {
			value: value,
			valid: value !== '',
			touched: true
		});
		const updatedStockForm = updateObject(stocksForm,{
			stockSymbol: updatedFormElement
        });

        let formIsValid = true;
		for (let inputIdentifier in updatedStockForm) {
			formIsValid = updatedStockForm[inputIdentifier].valid && formIsValid;
		}

        setStocksForm(updatedStockForm);
        setFormIsValid(formIsValid);
    }

    const onFormSubmitHandler = (e) => {
        e.preventDefault();
        if(formIsValid) {
            props.onFormCompleted({symbol: stocksForm.stockSymbol.value, numPosts: stocksForm.numPosts.value});
        }
        selectControl.focus();
    }

    const isInvalidField = (fieldKey) => {
        return !stocksForm[fieldKey].valid && stocksForm[fieldKey].touched;
    }

    const showErrorBox = () => {
        let formIsTouched = true;
		for (let inputIdentifier in stocksForm) {
			formIsTouched = stocksForm[inputIdentifier].touched && formIsTouched;
		}
        return !formIsValid && formIsTouched
    }

    return(
        <form className={classes.Stockform} onSubmit={onFormSubmitHandler}>
            <fieldset className={isInvalidField('stockSymbol') ? classes.Invalid : ''}>
                <label htmlFor="stockSymbol">Stock Symbol: </label>
                <select 
                value={stocksForm.stockSymbol.value}
                ref={(select) => { selectControl = select; }}
                aria-required="true"
                name="stockSymbol" 
                id="stockSymbol" placeholder="Please select a stock" onChange={(event) => onStockSelected(event.target.value)}>
                    <option value="">Please select a stock</option>
                    {selectOptions}
                </select>
            </fieldset>
            <fieldset className={isInvalidField('numPosts') ? classes.Invalid : ''}>
                <label htmlFor="numPosts">Number of Posts:</label>
                <input 
                aria-required="true"
                type="number" 
                name="numPosts" 
                id="numPosts" 
                value={stocksForm.numPosts.value} placeholder="Enter number of posts"
                onChange={(event) => onNumPostsChanged(event.target.value)}></input>
            </fieldset>
            <button type="submit">Search</button>
            {showErrorBox() &&
                <div aria-hidden="true" className={classes.ErrorBox}>
                    Please fix the errors on your form to search for a stock recommendation
                </div> 
            }
        </form>
    );
};
export default StocksSelector;