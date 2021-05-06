import React, { useEffect, useState } from 'react';
import styles from './Carousel.m.css';
import { SlideData } from './Slide';
import Video from '../assets/video.mp4';

export default function user() {
	const [sizeXY, setSizeXY] = useState(window.innerWidth);
	const [x, setX] = useState(0);
	const [x1, setX1] = useState(0);
	const [x2, setX2] = useState(0);
	const [trackWidth, setTrackWidth] = useState(0);
	const [checkedSlide, setCheckedSlide] = useState(0);
	const [thisSlide, setThisSlide] = useState(0);
	const items = Array.from(
		document.querySelectorAll(`.${styles.slider__item}`),
	);

	useEffect(() => {
		document.getElementById('track').addEventListener('resize', updateWidth);
		const width = document.getElementById('track').clientWidth;
		setTrackWidth(width);
		updateWidth();

		() => window.removeEventListener('resize', updateWidth);
		window.addEventListener('resize', updateWidth);
	}, [sizeXY]);
	const updateWidth = () => {
		setSizeXY(window.innerWidth);
		const width = document.getElementById('track').clientWidth;
		setTrackWidth(width);
	};
	const goLeft = () => {
		setX(x - 100);

		if (x <= (items.length - 1) * -100) {
			setX(0);
		}
	};
	const goRight = () => {
		setX(x + 100);

		if (x >= 0) {
			setX((items.length - 1) * -100);
		}
	};

	const goToSelected = (e) => {
		setX(e.target.value * -100);
		setCheckedSlide(e.target.value);
	};

	const handleTouchStart = (e) => {
		setThisSlide(x);
		setThisSlide(x);
		console.log(thisSlide);
		const firstTouch = (e.touches[0].clientX * 100) / trackWidth;
		setX1(firstTouch);
	};
	const handleTouchMove = (e) => {
		if (e.cancelable) e.preventDefault();

		const client = (e.touches[0].clientX * 100) / trackWidth;
		setX(thisSlide + (client - x1));

		if (x > 0) {
			setX((items.length - 1) * -100);
		}
		if (x <= (items.length - 1) * -100) {
			setX(0);
		}
	};
	const handleTouchEnd = (e) => {
		if (e.cancelable) e.preventDefault();
		if (x > 0) {
			setX((items.length - 1) * -100);
		}
		if (x <= (items.length - 1) * -100) {
			setX(0);
		}
		setX(Math.round(x / 100) * 100);
	};

	return (
		<>
			<div className={styles.slider__wrapper} id="track">
				<div className={styles.slider__track}>
					{SlideData.map((slide) => {
						return (
							<>
								<div
									className={styles.slider__item}
									style={{ transform: `translateX(${x}%)` }}
									onTouchStart={handleTouchStart}
									onTouchMove={handleTouchMove}
									onTouchEnd={handleTouchEnd}
									ref={updateWidth}
								>
									<img
										id="sliderImg"
										src={slide.image}
										alt="Ph"
										className={styles.slider__img}
										width={trackWidth + 'px'}
									/>
								</div>
							</>
						);
					})}
					<div
						className={styles.slider__item}
						style={{ transform: `translateX(${x}%)` }}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						ref={updateWidth}
					>
						<div className={styles.slider__player}>
							<video
								style={{ margin: '0 auto' }}
								width="59.3%"
								controls
								className={styles.video__player}
							>
								<source src={Video} />
							</video>
						</div>
					</div>
					<div
						className={styles.slider__item}
						style={{ transform: `translateX(${x}%)` }}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						ref={updateWidth}
					>
						<div className={styles.slider__card_item}>
							<div className={styles.slider__card}>
								<div className={styles.card__header}>
									<h3>Header</h3>
								</div>
								<div className={styles.card__body}>
									<h3>Body</h3>
								</div>
								<div className={styles.card__footer}>
									<h3>Footer</h3>
								</div>
							</div>
						</div>
					</div>
					<button
						className={styles.slider__button_Prev}
						onClick={goRight}
					></button>
					<button
						className={styles.slider__button_Next}
						onClick={goLeft}
					></button>
				</div>
				<div className={styles.nav}>
					<ul className={styles.track__selector}>
						{items.map((slide, index) => {
							return (
								<>
									<li
										className={styles.track__selector__item}
										placeholder={index}
										htmlFor={index}
									>
										<input
											className={styles.radio__input}
											type="radio"
											id={index}
											value={index}
											checked={Math.abs(x / -100) === index}
											onChange={goToSelected}
										></input>
									</li>
								</>
							);
						})}
					</ul>
				</div>
			</div>
		</>
	);
}
