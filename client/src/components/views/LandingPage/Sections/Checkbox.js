import React from "react";
import { Collapse, Checkbox } from "antd";

const { Panel } = Collapse;

const CheckboxView = ({ list }) => {
  const renderCheckBoxLists = () =>
    list &&
    list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox onChange>
          <span>{value.name}</span>
        </Checkbox>
      </React.Fragment>
    ));
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="Continent" key="1">
        {renderCheckBoxLists()}
      </Panel>
    </Collapse>
  );
};

export default CheckboxView;
