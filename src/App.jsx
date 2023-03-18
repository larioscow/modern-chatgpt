import { useState } from 'react';
import styles from './App.module.css';
import UserMsg from './components/user-msg';
import BotMsg from './components/bot-msg';

function App() {
	const [input, setInput] = useState('');
	const [chatLog, setChatLog] = useState([
		{ response: 'Hello, I am a bot. How can I help you today?' },
	]);

	async function handleSubmit(e) {
		e.preventDefault();
		setChatLog([...chatLog, { message: input }]);
		setInput('');
	}
	const handleKeyDown = e => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};
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
					{chatLog.map(msg => {
						if (Object.keys(msg)[0] === 'message') {
							return <UserMsg msg={msg.message} key={Math.random()}></UserMsg>;
						}
						if (Object.keys(msg)[0] === 'response') {
							return (
								<BotMsg response={msg.response} key={Math.random()}></BotMsg>
							);
						} else {
							return null;
						}
					})}
				</div>
				<div className={styles['input-zone']}>
					<form onSubmit={handleSubmit}>
						<div className={styles['input-bar']}>
							<textarea
								rows={1}
								cols={20}
								onKeyDown={handleKeyDown}
								value={input}
								onChange={e => setInput(e.target.value)}
							></textarea>
							<button type='submit'>
								<img src='./src/assets/send.svg' alt='send' />
							</button>
						</div>
					</form>
				</div>
			</section>
		</>
	);
}
export default App;
