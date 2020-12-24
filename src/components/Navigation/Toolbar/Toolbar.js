import React from 'react';
import classes from './Toolbar.module.css';

const toolbar = () => (
	<header className={classes.Toolbar} role="navigation">
		<h1>Stock Market Recommender</h1>
	</header>
);

export default toolbar;