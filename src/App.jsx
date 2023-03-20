import { useState, useEffect } from 'react';
import styles from './App.module.css';
import UserMsg from './components/user-msg';
import BotMsg from './components/bot-msg';

function App() {
	useEffect(() => {
		getEngines();
	}, []);

	const [input, setInput] = useState('');
	const [models, setModels] = useState([]);
	const [currentModel, setCurrentModel] = useState('ada');
	const [chatLog, setChatLog] = useState([]);

	async function handleSubmit(e) {
		e.preventDefault();

		const chatLogNew = [...chatLog, { message: input }];
		setInput('');
		setChatLog(chatLogNew);

		const messages = chatLogNew
			.map(message => message.message || message.response)
			.join('\n');

		const response = await fetch('http://localhost:3000/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				message: messages,
				currentModel,
			}),
		});

		const data = await response.json();
		setChatLog([...chatLogNew, { response: data.message }]);
	}
	const handleKeyDown = e => {
		if (e.keyCode === 13 && !e.shiftKey) {
			e.preventDefault();
			handleSubmit(e);
		}
	};
	const clearChat = () => {
		setChatLog([]);
	};
	function getEngines() {
		fetch('http://localhost:3000/models')
			.then(res => res.json())
			.then(data => setModels(data.models));
	}
	return (
		<>
			<nav className={styles['chat-menu']}>
				<button className={styles['new-button']} onClick={clearChat}>
					<img src='src/assets/plus.svg' alt='' />
					New Chat
				</button>
				<div className={styles['model-select']}>
					<select
						onChange={e => {
							setCurrentModel(e.target.value);
						}}
					>
						{models.map((model, i) => {
							return (
								<option key={model.id} value={model.id}>
									{model.id}
								</option>
							);
						})}
					</select>
				</div>
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
					<div className={styles.space}></div>
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
