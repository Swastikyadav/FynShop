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
  filterByArea,
  filterByCategory,
  filterByStatus,
  clearFilter,
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
  const [areaFilter, setAreaFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
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
      <p>Filters</p>
      <Select
        placeholder="Filter by area"
        options={areaDropdownOptions}
        value={areaFilter}
        onChange={e => {
          setAreaFilter(e);
          setCategoryFilter("");
          setStatusFilter("");
          dispatch(filterByArea(e));
        }}
      />
      <Select
        placeholder="Filter by category"
        options={categoryDropdownOptions}
        value={categoryFilter}
        onChange={e => {
          setCategoryFilter(e);
          setAreaFilter("");
          setStatusFilter("");
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
          setCategoryFilter("");
          setAreaFilter("");
          setStatusFilter(e);
          dispatch(filterByStatus(e));
        }}
      />

      <Button onClick={() => {
        setAreaFilter("");
        setCategoryFilter("");
        dispatch(clearFilter());
      }}>Clear Filter</Button>

      <Button onClick={() => setIsModalOpen(true)}>+Add Shop</Button>
      {
        shopData.map((shop, idx) => {
          return (<React.Fragment key={shop.id}>
            <p>{shop.name}</p>
            <small>
              {moment(new Date(shop.openingDate)).format("YYYY MMM Do")} - {moment(new Date(shop.closingDate)).format("YYYY MMM Do")}
            </small>
            <br />
            <small onClick={() => dispatch(deleteShop(shop.id))}>Delete</small>
            <br />
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
        {console.log(isAlphabetOnly(newShopInfo.name), )}
        {!isAlphabetOnly(newShopInfo.name) && <small style={{color: "red"}}>Only alphabets are allowed</small>}
        {isError && !newShopInfo.name && <small style={{color: "red"}}>Shop name is required</small>}

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
        {isError && !newShopInfo.area && <small style={{color: "red"}}>Area is required</small>}

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
        {isError && !newShopInfo.category && <small style={{color: "red"}}>Category is required</small>}

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
        {isError && (!newShopInfo.openingDate || !newShopInfo.closingDate) && <small style={{color: "red"}}>Date range is required</small>}

        <Button onClick={() => {
          if (!newShopInfo.name || !newShopInfo.area || !newShopInfo.category || !newShopInfo.openingDate || !newShopInfo.closingDate || !isAlphabetOnly(newShopInfo.name)) {
            setIsError(true);
            return;
          }

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
