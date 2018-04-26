import React, { Component } from 'react';
import styles from './common.css';
import Panel from './panel/Panel';
import MapPanel from './map/MapPanel';
import Notification from './notification/Notification';
import OmniBar from './omnibar/OmniBar';
import { toJS } from 'mobx';
import { inject, observer } from 'mobx-react';
import styles from './styles.css';

@inject('store')
@observer
class Main extends Component {
  render() {
    let notifications = [];
    if (this.props.store && this.props.store.notifications) {
      notifications = toJS(this.props.store.notifications);
    }
    const store = this.props.store;
    return (
        <div className={styles.main}>
            <MapPanel />
            <Panel>
                <OmniBar />
                <div className={styles.notificationContainer}>
                    <div className={`${styles.notificationWrapper} ${!store.displayNotifications ? styles.hideNotifications : ''}`}>
                        {
                            notifications.map((notification =>
                                    <Notification notification={notification} key={notification.id} />
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
