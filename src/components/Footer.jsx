import React from 'react'
import styles from './Footer.module.css';

function Footer() {
  return (
    <div>
      <footer className={`d-flex justify-center align-center p-40 ${styles.footer}`}>
        <p>
          Made by Lily <a href="https://github.com/LilyVolo" className={styles.link}>https://github.com/LilyVolo</a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
