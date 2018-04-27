import React, { Component } from 'react';
import styles from './styles.css';
import Time from './Time.js';
import { IconButton } from 'react-toolbox/lib/button';
import twitterIcon from './icons/ic-twitter-hk.png';
import documentIcon from './icons/ic-document-hk.png';
import maintenanceIcon from './icons/ic-dvir-hk.png';
import geofenceIcon from './icons/ic-geofence-hk.png';
import roadsideIcon from './icons/ic-roadside-hk.png';
import deleteIcon from './icons/ic-delete-hk.png';
import violationIcon from './icons/ic-violation-hk.png';

const getClassForPriority = notification => {
  switch (notification.severity) {
    case '1':
      return styles.lowSeverity;
    case '2':
      return styles.mediumSeverity;
    case '3': 
      return styles.highSeverity;
    default:
      return styles.lowSeverity;
  }
}

const getLogoForType = notification => {
  switch (notification.type) {
    case "TWITTER":
      return twitterIcon;
    case "ENFORCEMENT":
      return roadsideIcon;
    case "GEOFENCE":
      return geofenceIcon;
    case "TRAFFIC":
      return violationIcon;
    case "OVERSPEED":
      return violationIcon;
    default:
      return documentIcon;
  }
}

class Notification extends Component {
  handleLocationClick = () => {
    this.props.handleNotificationClick(this.props.notification);
  }

  handleMarkAsRead = () => {
    this.props.handleMarkAsRead(this.props.notification);
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
           <div className={styles.notificationLogo}>
             <img  src={(getLogoForType(notification))}
              alt="icon"/>
          </div>
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
                      className={styles.icon}
                      icon={'location_on'}
                      onClick={this.handleLocationClick}
                    />
                  }

                  {
                    notification.url &&
                    <a href = {notification.url}>
                  <IconButton
                    className={styles.icon}
                      icon={'forward'}
                    />
                    </a>
                  }

                </div>
            </div>
          </div>

        <div className={styles.read} onClick={this.handleMarkAsRead}>
          <IconButton
            icon={'delete'}
          />
        </div>
      </div>

    );
  }
}

export default Notification;
