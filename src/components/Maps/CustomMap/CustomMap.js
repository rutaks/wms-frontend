import React, { useState, Fragment, useEffect, useImperativeHandle, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import styles from './styles';
import MapSearchField from '../MapSearchField/MapSearchField';

export const defaultMapCenter = {
  lat: -1.94496,
  lng: 30.06204
};

export const defaultMapOptions = {
  styles: styles,
  disableDefaultUI: true,
  zoomControl: true
};

/**
 * Functional component representing the `Google map` view
 * where a location can be viewed and picked.
 * User can pick a location, coordinates will be returned after picking or panning location
 * @author Awesomity Lab
 * @since 31.05.2020
 */
const CustomMap = forwardRef(
  (
    {
      locationName,
      setLocationName = () => {},
      setLocationCoordinates = () => {},
      locationNameFieldRef = {},
      locationCoordinatesFieldRef = {}
    },
    ref
  ) => {
    const [marker, setMarker] = useState(null);
    const [selected, setSelected] = useState(null);
    const [isMapVisible, setMapVisibility] = useState(false);
    const mapRef = React.useRef();

    const onMapLoad = React.useCallback((map) => {
      mapRef.current = map;
    }, []);

    useImperativeHandle(ref, () => ({
      panToCoordinates(coordinates) {
        panTo(coordinates);
      }
    }));

    const panTo = React.useCallback(({ lat, lng }) => {
      setLocationCoordinates({ lat: lat, lng: lng });
      setMarker({ lat: lat, lng: lng });
      mapRef.current.panTo({ lat, lng });
      mapRef.current.setZoom(14);
      // eslint-disable-next-line
    }, []);

    const toggleMapVisibility = () => {
      setMapVisibility(!isMapVisible);
    };

    const onMapClick = React.useCallback((e) => {
      // setLocationName('');
      setLocationCoordinates({
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      });
      setMarker({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      // eslint-disable-next-line
    }, []);

    useEffect(() => {
      locationCoordinatesFieldRef.current = setMarker;
    }, [setMarker, locationCoordinatesFieldRef]);

    return (
      <Fragment>
        <MapSearchField
          locationName={locationName}
          setLocationName={setLocationName}
          toggleMapVisibility={toggleMapVisibility}
          isMapActive={isMapVisible}
          panTo={panTo}
          locationNameFieldRef={locationNameFieldRef}
        />
        {isMapVisible && (
          <GoogleMap
            mapContainerStyle={{ height: '45vh' }}
            zoom={12}
            center={defaultMapCenter}
            options={defaultMapOptions}
            onLoad={onMapLoad}
            onClick={onMapClick}
          >
            {marker != null && (
              <Marker
                key={`${marker.lat}-${marker.lng}`}
                position={{ lat: marker.lat, lng: marker.lng }}
                onClick={() => {
                  setSelected(marker);
                }}
                icon={{
                  url: `${window.location.origin}/img/white_icon_svg.svg`,
                  origin: new window.google.maps.Point(0, 0),
                  anchor: new window.google.maps.Point(15, 15),
                  scaledSize: new window.google.maps.Size(30, 30)
                }}
              />
            )}

            {selected ? (
              <InfoWindow
                position={{ lat: selected.lat, lng: selected.lng }}
                onCloseClick={() => {
                  setSelected(null);
                }}
              >
                <div>
                  <p>Selected task area</p>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        )}
      </Fragment>
    );
  }
);

CustomMap.propTypes = {
  /** Callback function to send location name to parent component on location selection */
  setLocationName: PropTypes.func,
  /** Callback function to send location coordinates to parent component on location selection */
  setLocationCoordinates: PropTypes.func,
  /** Ref obj to assign to parent compoment accessibility to setLocationName useState*/
  locationNameFieldRef: PropTypes.object,
  /** Ref obj to assign to parent compoment accessibility to setLocationCoordinates useState*/
  locationCoordinatesFieldRef: PropTypes.object,
  /** Location name prop from in put field */
  locationName: PropTypes.string,
  /** Location coordinates prop from in put field */
  externalLocationCoordinates: PropTypes.object
};

export default CustomMap;
