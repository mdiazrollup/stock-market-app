import React from "react";
import Aux from '../../../hoc/Aux/Aux';
import classes from "./StocksPriceTable.module.css";

const stocksPriceTable = props => {
    const stockInfo = props.selectedStock;
    const recommentations = (stockInfo && stockInfo.recommentations) ? stockInfo.recommentations : [];
    const tableHeaderClass = [classes.FlexTable, classes.Header];
    const tableRowClass = [classes.FlexTable, classes.Row];
    const flexRowFirstClass = [classes.FlexRow, classes.First];

    const tablesRows = recommentations.map((rating, index) => {
        return <div className={tableRowClass.join(' ')} key={index} role="rowgroup">
            <div className={flexRowFirstClass.join(' ')} role="cell">{rating.date}</div>
            <div className={classes.FlexRow} role="cell">{rating.price}</div>
            <div className={classes.FlexRow} role="cell">{rating.recommended}</div>
        </div>;
    });

    return (
        <Aux>
            {stockInfo && 
                <section className={classes.StockPriceTable}>
                    <h3>Stock Prices</h3>

                    <div className={classes.TableContainer} role="table" aria-label="Recommendations">
                        <div className={tableHeaderClass.join(' ')} role="rowgroup">
                            <div className={flexRowFirstClass.join(' ')} role="columnheader">Date</div>
                            <div className={classes.FlexRow} role="columnheader">Price ($)</div>
                            <div className={classes.FlexRow} role="columnheader">Recommendation</div>
                        </div>
                        {tablesRows}
                    </div>
                </section>
            }
        </Aux>
    );
};

export default stocksPriceTable;