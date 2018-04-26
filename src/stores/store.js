import { observable, action, toJS } from 'mobx';
import { subscribeToNotifications } from '../services/api';
import { compareDesc, parse } from 'date-fns';

export const SORT_BY = {
  SEVERITY: 'severity',
  TIME: 'time',
}

const compareTime = (a, b) => {
  return compareDesc(parse(a.timestamp), parse(b.timestamp));
}

class Store {
  @observable notifications = [];
  @observable displayNotifications = true;
  @observable sortBy = SORT_BY.TIME;
  @observable map;
  @observable tileLayer;
  notificationSocket = null;

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  openNotificationSocket() {
    this.notificationSocket = subscribeToNotifications(
      e => this.appendNotifications(JSON.parse(e.data))
    )
  }

  @action
  markAsRead(notification) {
    const msg = {
      type: "markAsRead",
      id: notification.id,
    }
    this.notificationSocket.send(JSON.stringify(msg));
  }

  @action
  appendNotifications(notifications) {
    if (this.notifications.length) {
      this.notifications = notifications.concat(toJS(this.notifications));
    } else {
      this.notifications = notifications;
    }
  }
  
  @action
  clearAll() {
    this.notifications = [];
  }

  @action
  toggleDisplayNotifications() {
    this.displayNotifications = !this.displayNotifications;
  }

  @action
  setSortBy(sort) {
    this.sortBy = sort;
    this.sort();
  }

  @action
  sort() {
    const getSeverity = (notification) => {
      return notification.severity || 1;
    }
    const sortFunc = (a, b) => {
      switch(this.sortBy) {
        case SORT_BY.SEVERITY:
          let diff = getSeverity(a) - getSeverity(b);
          if (diff === 0) {
            diff = compareTime(a, b);
          }
          return diff;
        default:
          return compareTime(a, b);
      }
    }
    this.notifications = this.notifications.sort(sortFunc);
  }
}

export default Store;
