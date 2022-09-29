import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSelector, useDispatch } from 'react-redux';
import { setPage, setTab } from '../redux/slices/filters';

export const Category = () => {
  const dispatch = useDispatch();
  const { tab } = useSelector((state) => state.filters);

  return (
    <Tabs
      value={tab}
      onChange={(e, val) => {
        dispatch(setTab(val));
        dispatch(setPage(1));
      }}
      style={{ marginBottom: 15 }}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example">
      <Tab value={0} label="Новые" />
      <Tab value={1} label="Популярные" />
    </Tabs>
  );
};
