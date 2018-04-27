import React, { Component } from 'react';
import styles from './styles.css';
import eroadLogo from './icons/header_logo.png';

class Banner extends Component {
    render() {
      return (
        <div className={styles.banner}>
            <div className={styles.logo} >
                <img className={styles.logoImage} src={eroadLogo} alt="EROAD"/>
            </div>
        </div>
      );
    }
  }
  
  export default Banner;