import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectShopList,
} from './shopListSlice';

export function ShopList() {
  const { shopList } = useSelector(selectShopList);
  const dispatch = useDispatch();

  return (
    <div>
      {console.log(shopList, "list++")}
      {
        shopList.map((shop, idx) => {
          return (<React.Fragment key={idx}>
            <p>{shop.name}</p>
          </React.Fragment>)
        })
      }
    </div>
  );
}
