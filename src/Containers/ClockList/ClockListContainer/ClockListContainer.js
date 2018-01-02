import React, {Component} from 'react';

import {branch} from 'baobab-react/higher-order';
import tree from '../../../Baobab/state';

import styles from './styles.css';

import ClockList from '../ClockList';

class ClockListContainer extends Component {
  render() {
    return (
      <section className={styles.clockListContainer}>
        <ClockList locationData={this.props.locations} />
      </section>
    )
  }
}

export default branch({
  locations: ['locations']
}, ClockListContainer);
