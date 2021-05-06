import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './components/Carousel.js';
import styles from './main.m.css';
ReactDOM.render(
	<>
		<div className={styles.container}>
			<Carousel />
		</div>
	</>,
	document.getElementById('app'),
);
