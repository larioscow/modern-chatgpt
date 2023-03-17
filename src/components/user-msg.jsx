import DefaultAvatar from './avatar';
import styles from './user-msg.module.css';

const UserMsg = ({ msg }) => {
	return (
		<div className={styles['msg-area']}>
			<div className={styles['msg-container']}>
				<div className={styles.pfp}>
					<DefaultAvatar></DefaultAvatar>
				</div>
				<div className={styles.msg}>
					<p>{msg}</p>
				</div>
			</div>
		</div>
	);
};

export default UserMsg;
