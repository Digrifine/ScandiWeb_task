import React, { useEffect, useState } from "react";
import styles from "./Carousel.m.css";
import { SlideData } from "./Slide";
import Video from "../assets/video.mp4";
import icon from "../assets/c-reg.svg";
import icon2 from "../assets/c-solid.svg";

export default function user() {
	const [sizeXY, setSizeXY] = useState(window.innerWidth);
	const [tDur, setTDur] = useState(0.6);
	const [x, setX] = useState(-100);
	const [firstTouch, setFirstTouch] = useState(0);
	const [trackWidth, setTrackWidth] = useState(0);
	const [thisSlide, setThisSlide] = useState(0);
	const items = Array.from(
		document.querySelectorAll(`.${styles.slider__item}`),
	);

	useEffect(() => {
		document.getElementById("track").addEventListener("resize", updateWidth);
		const width = document.getElementById("track").clientWidth;
		setTrackWidth(width);
		updateWidth();

		() => window.removeEventListener("resize", updateWidth);
		window.addEventListener("resize", updateWidth);
	}, [sizeXY]);

	const updateWidth = () => {
		setSizeXY(window.innerWidth);
		const width = document.getElementById("track").clientWidth;
		setTrackWidth(width);
	};

	const goLeft = () => {
		setTDur(0.6);
		setX(x - 100);
		setTimeout(() => {
			if (x <= items.length * -100) {
				setTDur(0);
				setX(-100);
				setTDur(0.6);
			}
		}, 600);
	};

	const goRight = () => {
		setTDur(0.6);
		setX(x + 100);
		setTimeout(() => {
			if (x >= -100) {
				setTDur(0);
				setX(items.length * -100);
				setTDur(0.6);
			}
		}, 600);
	};

	const goToSelected = (e) => {
		setX(e.target.value * -100);
	};

	const handleTouchStart = (e) => {
		setThisSlide(x);
		setTDur(0);
		const firstTouch = (e.touches[0].clientX * 100) / trackWidth;
		setFirstTouch(firstTouch);
	};

	const handleTouchMove = (e) => {
		if (e.cancelable) e.preventDefault();

		const client = (e.touches[0].clientX * 100) / trackWidth;
		const xDeff = client - firstTouch;
		if (xDeff % 2) {
			setX(thisSlide + xDeff);
		}
	};

	const handleTouchEnd = (e) => {
		if (e.cancelable) e.preventDefault();

		setTDur(0.6);
		setX(Math.round(x / 100) * 100);
		if (x >= -50) {
			setTimeout(() => {
				setTDur(0);
				setX(items.length * -100);
				setTDur(0.6);
			}, 600);
		}

		if (x <= items.length * -100 - 50) {
			setTimeout(() => {
				setTDur(0);
				setX(-100);
				setTDur(0.6);
			}, 600);
		}
	};

	return (
		<>
			<div className={styles.slider__wrapper} id="track">
				<div className={styles.slider__track}>
					<div
						className={styles.slider__first__item}
						style={{
							transform: `translateX(${x}%)`,
							transitionDuration: `${tDur}s`,
						}}
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
					{SlideData.map((slide) => {
						return (
							<>
								<div
									className={styles.slider__item}
									style={{
										transform: `translateX(${x}%)`,
										transitionDuration: `${tDur}s`,
									}}
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
										width={trackWidth + "px"}
									/>
								</div>
							</>
						);
					})}
					<div
						className={styles.slider__item}
						style={{
							transform: `translateX(${x}%)`,
							transitionDuration: `${tDur}s`,
						}}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						ref={updateWidth}
					>
						<div className={styles.slider__player}>
							<video
								style={{ margin: "0 auto" }}
								width="59.3%"
								controls="controls"
								className={styles.video__player}
							>
								<source src={Video} />
							</video>
						</div>
					</div>
					<div
						className={styles.slider__item}
						style={{
							transform: `translateX(${x}%)`,
							transitionDuration: `${tDur}s`,
						}}
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
					<div
						className={styles.slider__last__item}
						style={{
							transform: `translateX(${x}%)`,
							transitionDuration: `${tDur}s`,
						}}
						onTouchStart={handleTouchStart}
						onTouchMove={handleTouchMove}
						onTouchEnd={handleTouchEnd}
						ref={updateWidth}
					>
						<img
							id="sliderImg"
							src={SlideData[0].image}
							alt="Ph"
							className={styles.slider__img}
							width={trackWidth + "px"}
						/>
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
										<label htmlFor={index + 1} className={styles.radio__label}>
											<img
												src={index + 1 === Math.abs(x / -100) ? icon : icon2}
											/>
										</label>
										<input
											className={styles.radio__input}
											type="radio"
											id={index + 1}
											value={index + 1}
											checked={Math.abs(x / -100) === index + 1}
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
