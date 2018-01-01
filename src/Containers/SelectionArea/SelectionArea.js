import React, {Component} from 'react';

import styles from './styles.css';

import Map from '../Map';

class SelectionArea extends Component {
  render() {
    return (
      <section className={styles.selectionArea}>
        <Map />
      </section>
    )
  }
}

export default SelectionArea;
