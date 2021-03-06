import React, { Component } from 'react';
import Panel from './panel/Panel';
import MapPanel from './map/MapPanel';
import Banner from './banner/Banner';
import Notification from './notification/Notification';
import OmniBar from './omnibar/OmniBar';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import styles from './styles.css';

@inject('store')
@observer
class Main extends Component {
  handleNotificationClick = (notification) => {
    const props = notification;
    this.props.store.map.panTo([props.lat, props.lng]);
  }
  handleMarkAsRead = (notification) => {
      this.props.store.markAsRead(notification);
  }

  render() {
    let notifications = [];
    if (this.props.store && this.props.store.notifications) {
      notifications = toJS(this.props.store.notifications);
    }
    const store = this.props.store;
    return (
        <div className={styles.main}>
            <MapPanel />
            <Banner />
            <Panel>
                <OmniBar />
                <div className={styles.notificationContainer}>
                    <div className={`${styles.notificationWrapper} ${!store.displayNotifications ? styles.hideNotifications : ''}`}>
                        {
                            notifications.map((notification =>
                  <Notification notification={notification} key={notification.id} handleNotificationClick={this.handleNotificationClick} handleMarkAsRead={this.handleMarkAsRead}/>
                            ))
                        }
                    </div>
                </div>
            </Panel>
        </div>
    );
  }
}

export default Main;
