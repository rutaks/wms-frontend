import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { defaultMapCenter, defaultMapOptions } from '../Maps/CustomMap/CustomMap';

const MapView = forwardRef(({ defaultCoordinates = [] }, ref) => {
  const mapRef = React.useRef();
  const [marker, setMarker] = useState([]);
  const [selected, setSelected] = useState(null);

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);
  const onMapClick = React.useCallback((e) => {}, []);

  useImperativeHandle(ref, () => ({
    panToCoordinates(coordinates) {
      panTo(coordinates);
    }
  }));

  useEffect(() => {
    if (defaultCoordinates) {
      setMarker(defaultCoordinates);
    }
  }, [defaultCoordinates]);

  const panTo = React.useCallback(({ lat, lng }) => {
    setMarker({ lat: lat, lng: lng });
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
    // eslint-disable-next-line
  }, []);

  return (
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
  );
});

export default MapView;
