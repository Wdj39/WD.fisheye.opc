import Link from 'next/link';
import { getAllPhotographers } from './lib/prisma-db';
import PhotographerList from './components/PhotographerList/PhotographerList';
import styles from './page.module.css';
import Logo from './components/Logo/Logo';

export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />
        <h1 className={styles.title}>Nos photographes</h1>
      </header>
      <main>
        <PhotographerList photographers={photographers} />
      </main>
    </div>
  );
}