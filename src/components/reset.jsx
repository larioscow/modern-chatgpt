import refresh from '../assets/refresh.svg';
import styles from './reset.module.css';
const Reset = () => {
	return (
		<button className={styles.button}>
			Regenerate response <img src={refresh} />
		</button>
	);
};
export default Reset;
