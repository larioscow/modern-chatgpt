import BotAvatar from './bot-avatar';
import styles from './bot-msg.module.css';

const BotMsg = ({ response }) => {
	return (
		<div className={styles['msg-area']}>
			<div className={styles['msg-container']}>
				<div className={styles['bot-picture']}>
					<BotAvatar></BotAvatar>
				</div>
				<div className={styles.response}>
					<p>{response}</p>
				</div>
			</div>
		</div>
	);
};

export default BotMsg;
