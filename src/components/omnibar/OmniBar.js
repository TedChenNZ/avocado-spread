import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styles from './styles.css';
import { Button } from 'react-toolbox';
import { IconButton } from 'react-toolbox/lib/button';
import { SORT_BY } from '../../stores/store';
@inject('store')
@observer
class OmniBar extends Component {

  handleClearAll = () => {
    this.props.store.clearAll();
  }

  handleToggleDisplayNotifications = () => {
    this.props.store.toggleDisplayNotifications();
  }

  handleSort = () => {
    const store = this.props.store;
    let sortBy = SORT_BY.SEVERITY;
    if (store.sortBy === SORT_BY.SEVERITY) {
      sortBy = SORT_BY.TIME;
    }
    store.setSortBy(sortBy);
  }

  render() {
    const displayNotifications = this.props.store.displayNotifications;
    return (
      <div className={styles.omnibar}>
        <div className={styles.left}>
          <div className={`${styles.item} ${this.props.store.sortBy === SORT_BY.SEVERITY && styles.sideways}`}>
            <IconButton
              icon={'sort'}
              onClick={this.handleSort}
            />
          </div>
          {
            (!this.props.store.displayNotifications || !this.props.store.notifications.length) ?
              <Button  className={styles.title} disabled>
                notifications
              </Button>
            :
              <Button onClick={this.handleClearAll} className={styles.title}>
                Clear All
              </Button>
            
          }
        </div>
        <div className={styles.right}>
          <div className={`${styles.item} ${displayNotifications && styles.upsideDown}`}>
            <IconButton
              icon={'keyboard_arrow_up'}
              onClick={this.handleToggleDisplayNotifications}
            />
          </div>

          {/* <IconButton icon={(
            <i className="material-icons">keyboard_arrow_up</i>
          )} /> */}
            
        </div>
      </div>
    );
  }
}

export default OmniBar;
