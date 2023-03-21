import { useState } from 'react';
import styles from './App.module.css';
import UserMsg from './components/user-msg';
import BotMsg from './components/bot-msg';

function App() {
	const [input, setInput] = useState('');
	const [chatLog, setChatLog] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();
		setChatLog([...chatLog, { message: input }]);
		setInput('');
		const response = await fetch('http://localhost:3080/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: chatLog.map(item => item.message || item.response).join(''),
			}),
		});
		const data = await response.json();
		setChatLog([...chatLog, { response: data.message }]);
	}
	const handleKeyDown = e => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};
	return (
		<>
			<nav className={styles['chat-menu']}>
				<button className={styles['new-button']}>
					<img src='src/assets/plus.svg' alt='' />
					New Chat
				</button>
			</nav>
			<section className={styles.chatbox}>
				<div className={styles['chat-log']}>
					{chatLog.map((msg, i) => {
						if (Object.keys(msg)[0] === 'message') {
							return <UserMsg msg={msg.message} key={i}></UserMsg>;
						}
						if (Object.keys(msg)[0] === 'response') {
							return <BotMsg response={msg.response} key={i}></BotMsg>;
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
