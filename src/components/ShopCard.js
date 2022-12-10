import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { deleteShop } from '../features/shopList/shopListSlice';

const ShopCardComp = styled.article`
  padding: 8px;
  margin: 10px;
  width: 280px;
  border: 1px solid gray;
  border-radius: 12px;

  & .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .status {
    padding: 5px 8px;
    border-radius: 12px;
    color: #fff;
    font-weight: bold;
    background: ${props => props.getShopStatus() ? "#0f0" : "#f00"}
  }
`;

function ShopCard({ shop, setIsModalOpen, setEditShopId }) {
  const dispatch = useDispatch();

  const getShopStatus = () => {
    const todayDate = moment(new Date());
    const openingDate = moment(new Date(shop.openingDate));
    const closingDate = moment(new Date(shop.closingDate));

    return todayDate.isBetween(openingDate, closingDate);
  }

  return (
    <ShopCardComp getShopStatus={getShopStatus}>
      <div className="card-header">
        <p>{shop.name}</p>
        <span>
          <DeleteOutlined
            style={{color: "red"}}
            onClick={() => dispatch(deleteShop(shop.id))}
          />
          {" "}
          <EditOutlined
            style={{color: "blue"}}
            id={shop.id}
            onClick={() => {
              setEditShopId(shop.id);
              setIsModalOpen(true);
            }}
          />
        </span>
      </div>

      <div>
        <small>{shop.category}</small>
        {" "}
        <small>in</small>
        {" "}
        <small>{shop.area}</small>
      </div>

      <small>
        {moment(new Date(shop.openingDate)).format("YYYY MMM Do")} - {moment(new Date(shop.closingDate)).format("YYYY MMM Do")}
      </small>

      <br />
      <br />
      <span className="status">{getShopStatus() ? "Open" : "Close"}</span>
    </ShopCardComp>
  );
}

export default ShopCard;