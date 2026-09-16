import Link from 'next/link';
import styles from './Logo.module.css';

export default function Logo() {
  return (
    <Link href="/" aria-label="Fisheye Home page" className={styles.logoLink}>
      <span className={styles.logo}>
        Fish
        <svg
          className={styles.cameraIcon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="2" y="6" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 6l1.5-2h5L16 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="2" />
        </svg>
        ye
      </span>
    </Link>
  );
}