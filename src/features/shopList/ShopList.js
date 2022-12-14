import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Input, Select, Divider, Space, Button, DatePicker } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import styled from 'styled-components';

import {
  addShop,
  updateShop,
  addNewArea,
  addNewCategory,
  selectShopList,
} from './shopListSlice';

import Header from '../../components/Header';
import Filters from '../../components/Filters';
import ShopCard from '../../components/ShopCard';

const ShopCardsContainer = styled.section`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 auto;
`;

const { RangePicker } = DatePicker;

export function ShopList() {
  const { shopList: { shopData, areaDropdownOptions, categoryDropdownOptions } } = useSelector(selectShopList);
  const dispatch = useDispatch();

  const initialShopInfo = {
    name: "",
    area: undefined,
    category: undefined,
    openingDate: "",
    closingDate: "",
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editShopId, setEditShopId] = useState("");
  const [newShopInfo, setNewShopInfo] = useState(initialShopInfo);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const findShop = shopData.find(shop => shop.id === editShopId);

    if (!!findShop) {
      setNewShopInfo(findShop);
    }
  }, [editShopId]);

  const dropDownRender = (menu, selectType) => {
    return (
      <>
        <Space
          style={{
            padding: '0 8px 4px',
          }}
        >
          <Input
            placeholder="Please enter item"
            value={
              selectType === "area"
              ? newArea
              : selectType === "category"
                ? newCategory
                : ""
            }
            onChange={(e) => {
              if (selectType === "area") {
                setNewArea(e.target.value);
              } else if (selectType === "category") {
                setNewCategory(e.target.value);
              }
            }}
          />
          <Button
            type="text"
            icon={<PlusOutlined />}
            onClick={() => {
              if(selectType === "area") {
                dispatch(addNewArea({value: newArea, label: newArea}))
              } else if (selectType === "category") {
                dispatch(addNewCategory({value: newCategory, label: newCategory}))
              }
            }}
          >
            Add item
          </Button>
        </Space>
        <Divider
          style={{
            margin: '8px 0',
          }}
        />
        {menu}
      </>
    );
  }

  const closeModal = () => {
    setIsModalOpen(false);
    setNewShopInfo(initialShopInfo);
    setEditShopId("");
    setIsError(false);
  }

  const isAlphabetOnly = (shopName) => {
    return /^[a-zA-Z ]*$/.test(shopName);
  }

  return (
    <div>
      <Header setIsModalOpen={setIsModalOpen} />

      <Filters />
      
      <ShopCardsContainer>
        {
          shopData.map((shop, idx) => {
            return (
              <ShopCard
                shop={shop}
                setIsModalOpen={setIsModalOpen}
                setEditShopId={setEditShopId}
                key={idx}
              />
            )
          })
        }
      </ShopCardsContainer>

      {isModalOpen && <Modal
        title={editShopId ? "Edit Shop" : "Add New Shop"}
        footer={null}
        open={isModalOpen}
        onCancel={closeModal}
      >
        <Input
          placeholder="Shop Name"
          value={newShopInfo.name}
          onChange={(e) => setNewShopInfo({
            ...newShopInfo,
            name: e.target.value,
          })}
        />
        {console.log(isAlphabetOnly(newShopInfo.name), )}
        {!isAlphabetOnly(newShopInfo.name) && <small style={{color: "red"}}>Only alphabets are allowed</small>}
        {isError && !newShopInfo.name && <small style={{color: "red"}}>Shop name is required</small>}

        <br /><br />

        <div style={{display: "flex", flexWrap: "wrap"}}>
          <span style={{marginRight: "4px"}}>
            <Select
              showSearch
              placeholder="Select or add new area."
              options={areaDropdownOptions}
              value={newShopInfo.area}
              onChange={e => setNewShopInfo({
                ...newShopInfo,
                area: e,
              })}
              dropdownRender={(menu) => dropDownRender(menu, "area")}
            />
            <br />
            {isError && !newShopInfo.area && <small style={{color: "red"}}>Area is required</small>}
          </span>

          <span>
            <Select
              showSearch
              placeholder="Select or add new category."
              options={categoryDropdownOptions}
              value={newShopInfo.category}
              onChange={e => setNewShopInfo({
                ...newShopInfo,
                category: e,
              })}
              dropdownRender={(menu) => dropDownRender(menu, "category")}
            />
            <br />
            {isError && !newShopInfo.category && <small style={{color: "red"}}>Category is required</small>}
          </span>
        </div>

        {
          editShopId && <>
            <p>
              Opening Date: {moment(new Date(newShopInfo.openingDate)).format("YYYY MMM Do")}
            </p>
            <p>
              Closing Date: {moment(new Date(newShopInfo.closingDate)).format("YYYY MMM Do")}
            </p>
          </>
        }
        
        <br />

        {editShopId && <small>Change opening and closing date</small>}
        <RangePicker
          onChange={e => setNewShopInfo({
            ...newShopInfo,
            openingDate: new Date(e[0]["$d"]).getTime(),
            closingDate: new Date(e[1]["$d"]).getTime(),
          })}
        />
        <br />
        {isError && (!newShopInfo.openingDate || !newShopInfo.closingDate) && <small style={{color: "red"}}>Date range is required</small>}

        <br />

        <Button
          type="primary"
          onClick={() => {
            if (!newShopInfo.name || !newShopInfo.area || !newShopInfo.category || !newShopInfo.openingDate || !newShopInfo.closingDate || !isAlphabetOnly(newShopInfo.name)) {
              setIsError(true);
              return;
            }

            editShopId
            ? dispatch(updateShop(newShopInfo))
            : dispatch(addShop({ ...newShopInfo, id: uuidv4() }));

            closeModal();
          }}
        >
          {editShopId ? "Edit Shop" : "Add Shop"}
        </Button>
      </Modal>}
    </div>
  );
}
