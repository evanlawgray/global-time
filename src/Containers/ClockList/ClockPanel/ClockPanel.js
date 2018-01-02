import React from 'react';

import styles from './styles.css';

const Clock = ({data}) => (
  <div className={styles.clockPanel}>
    <div>
      <h4>{data.name}</h4>

      <p>{data.timeZoneId}</p>

      <p>{data.timeZoneName}</p>

      <p>Date: {data.localTime.toLocaleDateString()}</p>

      <p>Time: {data.localTime.toLocaleTimeString()}</p>
    </div>
  </div>
);

export default Clock;


