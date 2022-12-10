import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const HeaderComp = styled.header`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 1px solid gray;
`;

function Header({ setIsModalOpen }) {
  return (
    <HeaderComp>
      <h1>
        <span style={{color: "blue"}}>FYN</span>
        <span style={{color: "green"}}>SHOP</span>
      </h1>

      <Button
        icon={<PlusOutlined />}
        type="primary"
        onClick={() => setIsModalOpen(true)}
      >
        Add New Shop
      </Button>
    </HeaderComp>
  );
}

export default Header;