import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import { Modal, Input, Select, Divider, Space, Button, DatePicker } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import {
  addShop,
  deleteShop,
  updateShop,
  addNewArea,
  addNewCategory,
  selectShopList,
} from './shopListSlice';

const { RangePicker } = DatePicker;

export function ShopList() {
  const { shopList: { shopData, areaDropdownOptions, categoryDropdownOptions } } = useSelector(selectShopList);
  const dispatch = useDispatch();

  const initialShopInfo = {
    name: "",
    area: "",
    category: "",
    openingDate: "",
    closingDate: "",
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newArea, setNewArea] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [editShopId, setEditShopId] = useState("");
  const [newShopInfo, setNewShopInfo] = useState(initialShopInfo);

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
  }

  return (
    <div>
      <Button onClick={() => setIsModalOpen(true)}>+Add Shop</Button>
      {
        shopData.map((shop, idx) => {
          return (<React.Fragment key={shop.id}>
            <p>{shop.name}</p>
            <small onClick={() => dispatch(deleteShop(shop.id))}>Delete</small>
            <small id={shop.id} onClick={() => {
              setEditShopId(shop.id);
              setIsModalOpen(true);
            }}>Update</small>
          </React.Fragment>)
        })
      }

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
        
        {editShopId && <small>Change opening and closing date</small>}
        <RangePicker
          onChange={e => setNewShopInfo({
            ...newShopInfo,
            openingDate: new Date(e[0]["$d"]).getTime(),
            closingDate: new Date(e[1]["$d"]).getTime(),
          })}
        />

        <Button onClick={() => {
          editShopId
          ? dispatch(updateShop(newShopInfo))
          : dispatch(addShop({ ...newShopInfo, id: uuidv4() }));

          closeModal();
        }}>
          {editShopId ? "Edit Shop" : "Add Shop"}
        </Button>
      </Modal>}
    </div>
  );
}
