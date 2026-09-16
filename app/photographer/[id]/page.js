import Link from 'next/link';
import Image from 'next/image';
import { getPhotographer, getAllMediasForPhotographer } from '../../lib/prisma-db';
import styles from './page.module.css';
import ContactModal from '../../components/ContactModal/ContactModal';
import MediaGallery from '../../components/MediaGallery/MediaGallery';
import Logo from '../../components/Logo/Logo';

export default async function PhotographerPage({ params }) {
  const { id } = await params;
  const photographerId = parseInt(id, 10);

  const photographer = await getPhotographer(photographerId);
  const medias = await getAllMediasForPhotographer(photographerId);

  const { name, city, country, tagline, price, portrait } = photographer;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Logo />
      </header>

      <main>
        <section className={styles.infoBar}>
          <div>
            <h1 className={styles.name}>{name}</h1>
            <p className={styles.city}>{city}, {country}</p>
            <p className={styles.tagline}>{tagline}</p>
          </div>
          <ContactModal photographerName={name} />
          <div className={styles.portraitWrapper}>
            <Image
              src={`/${portrait}`}
              alt={name}
              fill
              sizes="100px"
              className={styles.portrait}
            />
          </div>
        </section>

        <section>
          <h2 className={styles.mediaTitle}>Médias</h2>
          <MediaGallery
            initialMedias={medias}
            photographerId={photographerId}
            price={price}
          />
        </section>
      </main>
    </div>
  );
}