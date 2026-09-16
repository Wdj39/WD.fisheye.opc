import Link from 'next/link';
import Image from 'next/image';
import styles from './PhotographerCard.module.css';

export default function PhotographerCard({ photographer }) {
  const { name, city, country, tagline, price, portrait } = photographer;

  return (
    <Link href={`/photographer/${photographer.id}`} className={styles.card}>
      <div className={styles.portraitWrapper}>
        <Image
          src={`/${portrait}`}
          alt=""
          fill
          sizes="150px"
          className={styles.portrait}
        />
      </div>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.location}>{city}, {country}</p>
      <p className={styles.tagline}>{tagline}</p>
      <p className={styles.price}>{price}€/jour</p>
    </Link>
  );
}