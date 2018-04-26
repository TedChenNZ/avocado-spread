import React, { Component } from 'react';
import styles from './styles.css';
import L from 'leaflet';
import { inject, observer } from 'mobx-react';

let config = {};
config.params = {
    center: [-36.7236902, 174.7054304],
    zoomControl: false,
    zoom: 15,
    maxZoom: 25,
    minZoom: 11,
    scrollwheel: false,
    legends: true,
    infoControl: false,
    attributionControl: true
};
config.tileLayer = {
    uri: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    params: {
        minZoom: 11,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
        id: '',
        accessToken: ''
    }
};

@inject('store')
@observer
class MapPanel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            map: null,
            tileLayer: null,
            geojsonLayer: null,
            geojson: null,
            subwayLinesFilter: '*',
            numEntrances: null
        };
        this._mapNode = null;
        /*this.updateMap = this.updateMap.bind(this);
        this.onEachFeature = this.onEachFeature.bind(this);
        this.pointToLayer = this.pointToLayer.bind(this);
        this.filterFeatures = this.filterFeatures.bind(this);
        this.filterGeoJSONLayer = this.filterGeoJSONLayer.bind(this);*/
    }

  componentDidMount() {
    // code to run just after the component "mounts" / DOM elements are created
    // we could make an AJAX request for the GeoJSON data here if it wasn't stored locally
    //this.getData();
    // create the Leaflet map object
    if (!this.state.map) {
        this.init(this._mapNode);
    }
  }

    init(id) {
        if (this.state.map) return;
        // this function creates the Leaflet map object and is called after the Map component mounts
        let map = L.map(id, config.params);
        L.control.zoom({ position: "bottomleft"}).addTo(map);
        L.control.scale({ position: "bottomleft"}).addTo(map);

        // a TileLayer is used as the "basemap"
        const tileLayer = L.tileLayer(config.tileLayer.uri, config.tileLayer.params).addTo(map);

        // set our state to include the tile layer
        this.setState({ map, tileLayer });

        this.props.store.map = map;
        this.props.store.tileLayer = tileLayer;
    }


    render() {
        return (
            <div className={styles.mapPanel}>
                <div ref={(node) => this._mapNode = node} className={styles.mapContainer} />
            </div>
        );
  }
}

export default MapPanel;
