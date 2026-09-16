'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Lightbox from '../Lightbox/Lightbox';
import { likeMedia } from '../../lib/actions';
import styles from './MediaGallery.module.css';

export default function MediaGallery({ initialMedias, photographerId, price }) {
  const [medias, setMedias] = useState(initialMedias);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const handleLike = async (mediaId, currentLikes) => {
    const newLikes = await likeMedia(mediaId, currentLikes, photographerId);
    setMedias((prevMedias) =>
      prevMedias.map((media) =>
        media.id === mediaId ? { ...media, likes: newLikes } : media
      )
    );
  };

  const sortedMedias = useMemo(() => {
    const mediasCopy = [...medias];
    switch (sortBy) {
      case 'popularity':
        return mediasCopy.sort((a, b) => b.likes - a.likes);
      case 'date':
        return mediasCopy.sort((a, b) => new Date(b.date) - new Date(a.date));
      case 'title':
        return mediasCopy.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return mediasCopy;
    }
  }, [medias, sortBy]);

  const totalLikes = medias.reduce((sum, m) => sum + m.likes, 0);

  return (
    <>
      <div className={styles.sortBar}>
        <label htmlFor="sort-select">Trier par</label>
        <select
          id="sort-select"
          className={styles.sortSelect}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="popularity">Popularité</option>
          <option value="date">Date</option>
          <option value="title">Titre</option>
        </select>
      </div>

      <ul className={styles.mediaList}>
        {sortedMedias.map((media) => {
          const displayIndex = sortedMedias.findIndex((m) => m.id === media.id);
          return (
            <li key={media.id} className={styles.mediaItem}>
              <button
                className={styles.mediaButton}
                onClick={() => openLightbox(displayIndex)}
                aria-label={media.title}
              >
                <div className={styles.mediaThumbWrapper}>
                  {media.image ? (
                    <Image
                      src={`/${media.image}`}
                      alt={media.title}
                      fill
                      sizes="300px"
                      className={styles.mediaThumb}
                    />
                  ) : (
                    <video src={`/${media.video}`} className={styles.mediaThumb} />
                  )}
                </div>
              </button>
              <p className={styles.mediaCaption}>
                {media.title}
                <button
                  className={styles.likeButton}
                  onClick={() => handleLike(media.id, media.likes)}
                  aria-label={`${media.likes} likes`}
                >
                  {media.likes} ❤
                </button>
              </p>
            </li>
          );
        })}
      </ul>

      {lightboxIndex !== null && (
        <Lightbox
          medias={sortedMedias}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      )}

      <div className={styles.stickyBar}>
        <span>{totalLikes} ❤</span>
        <span>{price}€/jour</span>
      </div>
    </>
  );
}