import PhotographerCard from '../PhotographerCard/PhotographerCard';
import styles from './PhotographerList.module.css';

export default function PhotographerList({ photographers }) {
  return (
    <ul className={styles.list}>
      {photographers.map((photographer) => (
        <li key={photographer.id} className={styles.item}>
          <PhotographerCard photographer={photographer} />
        </li>
      ))}
    </ul>
  );
}