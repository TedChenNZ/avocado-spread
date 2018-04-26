import React, { Component } from 'react';
import styles from './styles.css';
import Time from './Time.js';
import { IconButton } from 'react-toolbox/lib/button';

const getClassForPriority = notification => {
  switch (notification.severity) {
    case 1:
      return styles.lowSeverity;
    case 2:
      return styles.mediumSeverity;
    case 3: 
      return styles.highSeverity;
    default:
      return styles.lowSeverity;
  }
}

class Notification extends Component {
  handleLocationClick = () => {
    this.props.handleNotificationClick(this.props.notification);

  }
  render() {
    if (!this.props.notification) {
      return null;
    }
    const notification = this.props.notification;
    console.log(notification);
    return (
      <div className={styles.card}>
        <div className={`${styles.severity} ${getClassForPriority(notification)}`}>
        </div>
          <div className={styles.cardContent}>      
            <div className={styles.contentSection}>
              <div className={styles.notificationTitle}>
                {notification.title}                
              </div>
              <Time notification={notification}/>
            </div>
            <div className={styles.contentSection}>  
              <div className={styles.textContent}>
                  {notification.subtitle && (
                    <span className={styles.subtitle}>
                      {notification.subtitle}
                    </span>
                  )}
                  {notification.content}
                </div>
                <div className={styles.actions}>
                  {
                    notification.properties && notification.properties.lat &&
                    <IconButton
                      icon={'location_on'}
                      onClick={this.handleLocationClick}
                    />
                  }

                  {
                    notification.properties && notification.properties.url && 
                    <IconButton
                      icon={'forward'}
                      onClick={this.handleLocationClick}
                    />
                  }

                </div>
            </div>

          </div>
        
      </div>

    );
  }
}

export default Notification;
