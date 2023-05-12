import React from 'react';
import styles from './PageTitle.module.scss';
import interfacePurpleSmall from '../../assets/stars/interfacePurpleSmall.svg';

const PageTitle = ({ title }) => {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      <div>
        <img src={interfacePurpleSmall} alt="purpleStar" />
      </div>
    </div>
  );
};

export default PageTitle;
