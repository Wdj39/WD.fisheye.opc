'use client';

import { useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

export default function Lightbox({ medias, currentIndex, onClose, onNavigate }) {
  const currentMedia = medias[currentIndex];

  const goToPrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? medias.length - 1 : currentIndex - 1;
    onNavigate(newIndex);
  }, [currentIndex, medias.length, onNavigate]);

  const goToNext = useCallback(() => {
    const newIndex = currentIndex === medias.length - 1 ? 0 : currentIndex + 1;
    onNavigate(newIndex);
  }, [currentIndex, medias.length, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevious, goToNext, onClose]);

  return (
    <div className={styles.overlay}>
      <div
        className={styles.lightbox}
        role="dialog"
        aria-label="image closeup view"
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close dialog"
        >
          ×
        </button>

        <button
          className={styles.prevButton}
          onClick={goToPrevious}
          aria-label="Previous image"
        >
          ‹
        </button>

        <div className={styles.mediaContainer}>
          <div className={styles.mediaWrapper}>
            {currentMedia.image ? (
              <Image
                src={`/${currentMedia.image}`}
                alt={currentMedia.title}
                fill
                sizes="(max-width: 1000px) 90vw, 1000px"
                className={styles.media}
              />
            ) : (
              <video
                src={`/${currentMedia.video}`}
                className={styles.media}
                controls
                autoPlay
              />
            )}
          </div>
          <p className={styles.caption}>{currentMedia.title}</p>
        </div>

        <button
          className={styles.nextButton}
          onClick={goToNext}
          aria-label="Next image"
        >
          ›
        </button>
      </div>
    </div>
  );
}