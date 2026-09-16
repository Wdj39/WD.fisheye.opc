'use client';

import { useState } from 'react';
import styles from './ContactModal.module.css';

export default function ContactModal({ photographerName }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    console.log('Prénom:', firstName);
    console.log('Nom:', lastName);
    console.log('Email:', email);
    console.log('Message:', message);

    closeModal();
  };

  return (
    <>
      <button className={styles.contactButton} onClick={openModal}>
        Contactez-moi
      </button>

      {isOpen && (
        <div className={styles.overlay}>
          <div
            className={styles.modal}
            role="dialog"
            aria-labelledby="contact-modal-title"
          >
            <div className={styles.modalHeader}>
              <h2 id="contact-modal-title" className={styles.modalTitle}>
                Contactez-moi<br />{photographerName}
              </h2>
              <button
                className={styles.closeButton}
                onClick={closeModal}
                aria-label="Close Contact form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.field}>
                <label htmlFor="firstName">Prénom</label>
                <input type="text" id="firstName" name="firstName" />
              </div>

              <div className={styles.field}>
                <label htmlFor="lastName">Nom</label>
                <input type="text" id="lastName" name="lastName" />
              </div>

              <div className={styles.field}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" />
              </div>

              <div className={styles.field}>
                <label htmlFor="message">Votre message</label>
                <textarea id="message" name="message" rows="5" />
              </div>

              <button type="submit" className={styles.submitButton}>
                Envoyer
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}