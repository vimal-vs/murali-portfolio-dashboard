import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import { useNavigate } from 'react-router-dom';

// Function to render the label with active state
export function LabelForTabs({ children, isActive }) {
  return (
    <div className={`${isActive ? "text-primary-blue" : "text-placeholder-gray"} font-[420] text-[14px] `}>
      {children}
    </div>
  );
}

function TabNavigation({ tab, setActiveKey, tabContents }) {

  const navigate = useNavigate()

  const onChange = (key) => {
    setActiveKey(key);
  };


  return (
    <div className="w-full removeScrollBar">
      <Tabs style={{ fontFamily: "Poppins" }} items={tabContents} onChange={onChange} id='tabs' />
    </div>
  );
}

export default TabNavigation;
