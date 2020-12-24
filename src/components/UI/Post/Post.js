import React from "react";
import classes from './Post.module.css';

const post = (props) => {
    const {network, user, description} = props;


    return (
        <div className={classes.Post} role="presentation">
            <p className={classes.Network}>{network}</p>
            <p className={classes.User}>{user}</p>
            <p>{description}</p>
        </div>
    );
};

export default post;