import React from 'react';
import StocksDisplay from '../../containers/StocksDisplay/StocksDisplay';
import Aux from '../../hoc/Aux/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';

const layout = (props) => (
    <Aux>
        <Toolbar>Header</Toolbar>
        <main className={classes.Content}>
            <StocksDisplay></StocksDisplay>
        </main>
    </Aux>
);

export default layout;