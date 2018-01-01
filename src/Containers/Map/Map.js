import React, {Component} from 'react';

import {branch} from 'baobab-react/higher-order';
import {addLocation} from '../../Baobab/actions';

import GoogleMapsLoader from 'google-maps';

import styles from './styles.css';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      marker: undefined,
      markerData: [],
      locationName: undefined,
      infoWindowOpen: false
    }
  }

  saveMarker() {
    const namedMarker = Object.assign({}, this.state.markerData[0], {name: this.state.locationName});
    this.props.dispatch(
      addLocation,
      namedMarker
    );
  }

  clearMarker() {
    this.state.marker && this.state.marker.setMap(null);
    this.setState({marker: undefined, markerData: [], locationName: undefined});
  }

  componentDidMount() {
    GoogleMapsLoader.KEY = 'AIzaSyAfbJWinFTCqp353FFt0tjygBFh57-FmXY';

    const startPoint = {
      lat: 49.2827,
      lng: 123.1207
    };

    GoogleMapsLoader.load(google => {
      const map = new google.maps.Map(document.getElementById('map'), {
        center: startPoint,
        zoom: 4
      });

      const infoWindow = new google.maps.InfoWindow({
        content: document.getElementById('form')
      });

      google.maps.event.addListener(map, 'click', event => {
        if(this.state.marker) return;

        const newMarker = new google.maps.Marker({
          map: map,
          position: event.latLng
        });

        this.setState({
          marker: newMarker
        });

        google.maps.event.addListener(newMarker, 'click', () => {
          const form = document.createElement('form');
          form.appendChild(document.createElement('input'));
          form.setAttribute('id', 'form');

          infoWindow.open(map, newMarker);
          this.setState({infoWindowOpen: true})
        });

        const markerInfo = {
          lat: newMarker.getPosition().lat(),
          lng: newMarker.getPosition().lng()
        };

        this.setState({markerData: [markerInfo]});
      });
    });
  }

  render() {
    const infoWindowOpen = this.state.infoWindowOpen;

    return (
      <div className={styles.mapContainer}>
        <aside>
          <div className="asideText">
            <h2>Select a Location</h2>

            <p>Create a location marker by clicking anywhere on the map.</p>

            <p>Add a name to the location marker by clicking on the pin and entering the location name in the text input.</p>

            <p>When you're ready, click 'Save' to find out the time at your chosen location.</p>
          </div>

          <div className={styles.buttonContainer}>
            <button onClick={() => this.saveMarker()}>Save Marker</button>

            <button onClick={() => this.clearMarker()}>Clear Marker</button>
          </div>
        </aside>

        <div id="map" className={styles.map}></div>

        <form
          id="form"
          style={infoWindowOpen ? {display: 'inline'} : {display: 'none'}}
        >
          <input
            id="placeInput"
            type="text"
            value={this.state.location}
            onChange={(e) => this.setState({locationName: e.target.value})}
          />
        </form>

      </div>
    )
  }
}

export default branch({
  locations: ['locations']
}, Map);
