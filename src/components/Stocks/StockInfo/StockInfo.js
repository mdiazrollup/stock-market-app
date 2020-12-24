import React from "react";
import classes from "./StockInfo.module.css";

const stockInfo = props => {
    const stockInfo = props.selectedStock;

    const socialNetworksInfo = (stockInfo && stockInfo.socialNetworksPosts) ? stockInfo.socialNetworksPosts.map(network => (
        <div key={network.name}><span className={classes.Label}>{network.name}: </span> <span className={classes.Content}>{network.posts} post(s)</span></div>
    )) : null;

    return(
        <section className={classes.StockInfo}>
            <div><span className={classes.Label}>Time Windows: </span> <span className={classes.Content}>{stockInfo.timeWindows} day(s)</span></div>
            <h3>Social Network Info</h3>
            {socialNetworksInfo}
        </section>
    );
};

export default stockInfo;