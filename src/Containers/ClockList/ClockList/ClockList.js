import React from 'react';

import styles from './styles.css';

import Clock from '../ClockPanel';

const ClockList = ({locationData}) => (
  <div className={styles.clockList}>
    {
      locationData.length ?
        locationData.map(location => (
          <Clock data={location} />
        )) :
        <h3 className={styles.placeholder}>No Saved Locations</h3>
    }
  </div>
);

export default ClockList;
