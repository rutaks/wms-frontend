import { useState } from 'react';

/**
 * Provides state handling of location picking
 */
export const useSetLocations = () => {
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [sector, setSector] = useState();
  const [cell, setCell] = useState();
  const [village, setVillage] = useState();

  /**
   * Clears all fields except the new province set in params
   * @param prvc Province selected
   */
  const selectProvince = (prvc) => {
    setDistrict(null);
    setSector(null);
    setCell(null);
    setVillage(null);
    setProvince(prvc);
  };

  /**
   * Clears all fields except the new district and its parent
   * @param dstrct District selected
   */
  const selectDistrict = (dstrct) => {
    setSector(null);
    setCell(null);
    setVillage(null);
    setDistrict(dstrct);
  };

  /**
   * Clears all fields except the new sector and its parents
   * @param sectr Sector selected
   */
  const selectSector = (sectr) => {
    setCell(null);
    setVillage(null);
    setSector(sectr);
  };

  /**
   * Clears all fields except the new cell and its parents
   * @param cll Cell selected
   */
  const selectCell = (cll) => {
    setVillage(null);
    setCell(cll);
  };

  /**
   * Replaces previous village with new village parsed in params
   * @param vllg Village selected
   */
  const selectVillage = (vllg) => {
    setVillage(vllg);
  };

  const setAllLocations = (prvc, dstrct, sctr, cll, vllg) => {
    setProvince(prvc);
    setDistrict(dstrct);
    setSector(sctr);
    setCell(cll);
    setVillage(vllg);
  };

  const mapLocationHierarchy = () => {
    if (province && district && cell && village) {
      return {
        name: province,
        type: 'PROVINCE',
        child: {
          name: district,
          type: 'DISTRICT',
          child: {
            name: sector,
            type: 'SECTOR',
            child: {
              name: cell,
              type: 'CELL',
              child: {
                name: village,
                type: 'VILLAGE'
              }
            }
          }
        }
      };
    } else {
      throw new Error('All locations are not specified');
    }
  };

  return {
    province,
    selectProvince,
    district,
    selectDistrict,
    sector,
    selectSector,
    cell,
    selectCell,
    village,
    selectVillage,
    mapLocationHierarchy,
    setAllLocations
  };
};
