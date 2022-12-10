import React, { useState } from 'react';
import { Select, Button } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectShopList,
  filterByArea,
  filterByCategory,
  filterByStatus,
  clearFilter,
} from '../features/shopList/shopListSlice';

const FiltersComp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  min-height: 80px;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
`;

function Filters() {
  const dispatch = useDispatch();
  const {
    shopList: {
      areaDropdownOptions,
      categoryDropdownOptions
    }
  } = useSelector(selectShopList);

  const [areaFilter, setAreaFilter] = useState(undefined);
  const [categoryFilter, setCategoryFilter] = useState(undefined);
  const [statusFilter, setStatusFilter] = useState(undefined);

  return (
    <FiltersComp>
      <p>Filters:</p>
      <Select
        placeholder="Filter by area"
        options={areaDropdownOptions}
        value={areaFilter}
        onChange={e => {
          setAreaFilter(e);
          setCategoryFilter(undefined);
          setStatusFilter(undefined);
          dispatch(filterByArea(e));
        }}
      />
      <Select
        placeholder="Filter by category"
        options={categoryDropdownOptions}
        value={categoryFilter}
        onChange={e => {
          setCategoryFilter(e);
          setAreaFilter(undefined);
          setStatusFilter(undefined);
          dispatch(filterByCategory(e));
        }}
      />

      <Select
        placeholder="Filter by open/close status"
        options={[
          {
            value: "open",
            label: "Open",
          },
          {
            value: "close",
            label: "Close",
          }
        ]}
        value={statusFilter}
        onChange={e => {
          setCategoryFilter(undefined);
          setAreaFilter(undefined);
          setStatusFilter(e);
          dispatch(filterByStatus(e));
        }}
      />

      <Button onClick={() => {
        setAreaFilter(undefined);
        setCategoryFilter(undefined);
        setStatusFilter(undefined);
        dispatch(clearFilter());
      }}>Clear Filter</Button>
    </FiltersComp>
  );
}

export default Filters;