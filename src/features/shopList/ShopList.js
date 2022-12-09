import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Input, Select, Divider, Space, Button, DatePicker } from 'antd';
import moment from 'moment';

import {
  addShop,
  addNewArea,
  addNewCategory,
  selectShopList,
} from './shopListSlice';

const { RangePicker } = DatePicker;

export function ShopList() {
  const { shopList: { shopData, areaDropdownOptions, categoryDropdownOptions } } = useSelector(selectShopList);
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [newShopInfo, setNewShopInfo] = useState({
    name: "",
    area: "",
    category: "",
    openingDate: "",
    closingDate: "",
  });

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

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>+Add Shop</Button>
      {
        shopData.map((shop, idx) => {
          return (<React.Fragment key={idx}>
            <p>{shop.name}</p>
          </React.Fragment>)
        })
      }

      {isModalOpen && <Modal
        title="Add New Shop"
        footer={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        afterClose={() => setIsModalOpen(false)}
      >
        <Input
          placeholder="Shop Name"
          value={newShopInfo.name}
          onChange={(e) => setNewShopInfo({
            ...newShopInfo,
            name: e.target.value,
          })}
        />

        <Select
          showSearch
          placeholder="Select or add new area."
          options={areaDropdownOptions}
          onChange={e => setNewShopInfo({
            ...newShopInfo,
            area: e,
          })}
          dropdownRender={(menu) => dropDownRender(menu, "area")}
        />

        <Select
          showSearch
          placeholder="Select or add new category."
          options={categoryDropdownOptions}
          onChange={e => setNewShopInfo({
            ...newShopInfo,
            category: e,
          })}
          dropdownRender={(menu) => dropDownRender(menu, "category")}
        />

        <RangePicker onChange={e => setNewShopInfo({
          ...newShopInfo,
          openingDate: moment(e[0]["$d"]),
          closingDate: moment(e[1]["$d"]),
        })} />

        <Button onClick={() => dispatch(addShop(newShopInfo))}>
          Add Shop
        </Button>
      </Modal>}
    </div>
  );
}
