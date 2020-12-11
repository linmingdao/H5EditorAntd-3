import React, { CSSProperties, useContext } from "react";
import { Empty } from "antd";
import FormSettings from "./FormSettings";
import { Mode } from "../constants";
import classnames from "classnames";
import { EditorContext } from "../index";
import DynamicEngine from "../DynamicEngine";

interface IAttributes {
  collapse: boolean;
  className?: string;
  style?: CSSProperties;
}

const Attributes: React.FC<IAttributes> = (props) => {
  const className = classnames("attributes uniform-scrollbar", {
    collapse: !props.collapse,
  });
  const {
    emptyImageType,
    attrPanelWidth,
    formSettings,
    stageItemList,
    selectedStageItemIndex,
    handleAttrPropsChange,
  } = useContext(EditorContext);

  function renderAttr() {
    function onAttrPropsChange(changedValues: any, allValues: any) {
      handleAttrPropsChange &&
        handleAttrPropsChange(selectedStageItemIndex, changedValues, allValues);
    }

    const config = stageItemList[selectedStageItemIndex];
    return config ? (
      <div>
        <DynamicEngine
          key={selectedStageItemIndex}
          componentName={config.name}
          componentProps={{
            ...config.props,
            mode: Mode.Attr,
            onAttrPropsChange,
          }}
        />
      </div>
    ) : (
      <Empty image={emptyImageType} description="还未选中任何控件哟~" />
    );
  }

  return (
    <div
      className={className}
      style={{ width: attrPanelWidth ? attrPanelWidth : 300 }}
    >
      <div className="title">Item 属性设置</div>
      <div className="list">{renderAttr()}</div>
      <div className="title">Form 属性设置</div>
      <div className="list">
        <FormSettings {...formSettings} />
      </div>
    </div>
  );
};

Attributes.displayName = "Attributes";

export default Attributes;
