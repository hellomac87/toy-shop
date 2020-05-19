import React, { useState } from "react";
import { Collapse, Radio } from "antd";

const { Panel } = Collapse;

function RadioBox({ list, handleFilters }) {
  const [value, setValue] = useState(0);

  const renderRadioBox = () =>
    list &&
    list.map((value) => (
      <Radio key={value._id} value={value._id}>
        {value.name}
      </Radio>
    ));

  const handleChange = (e) => {
    setValue(e.target.value);
    handleFilters(e.target.value);
  };
  return (
    <Collapse defaultActiveKey={["1"]}>
      <Panel header="Continent" key="1">
        <Radio.Group onChange={handleChange} value={value}>
          {renderRadioBox()}
        </Radio.Group>
      </Panel>
    </Collapse>
  );
}

export default RadioBox;
