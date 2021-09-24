import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import '@reach/combobox/styles.css';
import './MapSearchField.css';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { AutoComplete, Button, Col, Row } from 'antd';

/**
 * Functional component representing the `search map` input field
 * where a location can be search by location name
 * @author Awesomity Lab
 * @since 31.05.2020
 */
const MapSearchField = ({
  locationName,
  panTo,
  isMapActive = false,
  toggleMapVisibility,
  setLocationName,
  locationNameFieldRef = {}
}) => {
  const {
    ready,
    suggestions: { data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
      componentRestrictions: { country: ['rw'] }
    }
  });

  useEffect(() => {
    locationNameFieldRef.current = setLocationName;
  }, [setLocationName, locationNameFieldRef]);

  const handleInput = (value) => {
    setLocationName(value);
    setValue(value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    setLocationName(address);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {}
  };

  return (
    <Fragment>
      <Row>
        <Col span={24}>
          <center>
            <AutoComplete
              value={locationName}
              size="large"
              style={{ width: '90%' }}
              onSearch={handleInput}
              disabled={!ready}
              onBlur={() => {
                setValue('');
              }}
              onSelect={(option) => handleSelect(option)}
              placeholder="Be precise as possible. or pick from the map"
            >
              {data &&
                data.map(({ place_id, description }) => (
                  <AutoComplete.Option key={place_id} value={description}>
                    {description}
                  </AutoComplete.Option>
                ))}
            </AutoComplete>
            <Button style={{ width: '10%' }} type="link" onClick={toggleMapVisibility}>
              {!isMapActive ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
            </Button>
          </center>
        </Col>
      </Row>
    </Fragment>
  );
};

MapSearchField.propTypes = {
  /** Callback function to pan searched coordinated to map on search completion */
  panTo: PropTypes.func,
  /** Boolean to check if map view is active to change auto-complete list view position */
  isMapActive: PropTypes.bool,
  /** Callback function to show and hide map view */
  toggleMapVisibility: PropTypes.func,
  /** Callback function to send location name to component parent on change*/
  setLocationName: PropTypes.func,
  /** Ref obj to assign to parent compoment accessibility to setLocationName useState*/
  locationNameFieldRef: PropTypes.object,
  /** Location name prop from in put field */
  locationName: PropTypes.string
};

export default MapSearchField;
