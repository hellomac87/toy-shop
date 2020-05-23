import React, { useState } from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckboxView = ({ list, handleFilters }) => {
  const [checked, setChecked] = useState([]);
  const handleToggle = (value) => {
    // 누른 것의 index 를 구하고
    const currentIndex = checked.indexOf(value);
    // 전체 checked 된 state 에서 현재 누른 checkbox가 이미 있다면
    const newChecked = [...checked];
    if (currentIndex === -1) {
      // 없다면 state 에 넣어준다.
      newChecked.push(value);
    } else {
      // 빼주고
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    handleFilters(newChecked);
  };
  const renderCheckBoxLists = () =>
    list &&
    list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          checked={checked.indexOf(value._id) === -1 ? false : true}
        />
        <span>{value.name}</span>
      </React.Fragment>
    ));
  return (
    <Collapse defaultActiveKey={["0"]}>
      <Panel header="Continent" key="1">
        {renderCheckBoxLists()}
      </Panel>
    </Collapse>
  );
};

export default CheckboxView;
