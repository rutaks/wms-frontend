import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

/**
 * Functional component representing a Google Search
 * Text Field
 * @author Awesomity Lab
 * @since 31.05.2020
 */
export default function InputSearchField({
  value,
  setValue,
  listItems,
  clearSuggestions,
  ready,
  handleInput
}) {
  const handleSelect = async (value) => {
    setValue(value);
    clearSuggestions();
  };
  return (
    <Fragment>
      <input
        type="text"
        className="form-control input_normal"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Be precise as possible. or pick from the map"
      />
      <div className={'autocomplete-items'}>
        {listItems &&
          listItems.map(({ id }) => (
            <div key={id} onClick={() => handleSelect(id)}>
              {'fdsafas'}
            </div>
          ))}
      </div>
    </Fragment>
  );
}

InputSearchField.propTypes = {
  /** String representing the value used in the text field */
  value: PropTypes.object,
  /** Function used to location suggestion search value */
  setValue: PropTypes.func,
  /** Array string used to display the location search suggestions
   * from the value enterred in textfield */
  listItems: PropTypes.array,
  /** Function to clear location suggestions received */
  clearSuggestions: PropTypes.func,
  /** Bool representing if Google Map API is ready for use or not */
  ready: PropTypes.bool,
  /** Function used to change the value used in the text field */
  handleInput: PropTypes.func
};
