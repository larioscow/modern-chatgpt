// import { useState } from 'react';
import styles from './App.module.css';
import UserMsg from './components/user-msg';
import pfp from './assets/user-circle.svg';
import BotMsg from './components/bot-msg';

const msg =
	'Hello, do a task for me. I want you to go to the store and buy me some milk.';
const response = "Sorry I cann't do that. Im just a bot.";

function App() {
	return (
		<>
			<nav className={styles['chat-menu']} tabIndex='1'>
				<button className={styles['new-button']} tabIndex='2'>
					<img src='src/assets/plus.svg' alt='' />
					New Chat
				</button>
			</nav>
			<section className={styles.chatbox}>
				<div className={styles['chat-log']}>
					<UserMsg msg={msg} pfp={pfp}></UserMsg>
					<BotMsg response={response}></BotMsg>
				</div>
				<div className={styles['input-zone']}>
					<div className={styles['input-bar']}>
						<textarea rows='1'></textarea>
						<img src='./src/assets/send.svg' alt='' />
					</div>
				</div>
			</section>
		</>
	);
}

export default App;
