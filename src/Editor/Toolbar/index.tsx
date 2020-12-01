import React, { useContext } from "react";
import { Button } from "antd";
import { BuildingTemplateGroup } from "../types";
import { EditorContext } from "../index";

const Toolbar: React.FC = () => {
  const {
    // handleUndo,
    // handleRedo,
    // handleReset,
    formSettings,
    stageItemList,
    uniformTmplGroupList,
    handleClear,
  } = useContext(EditorContext);

  function renderCustomButtons(): React.ReactNode[] {
    let btns: React.ReactNode[] = [];
    uniformTmplGroupList.forEach((item, index) => {
      let groupItem = item as BuildingTemplateGroup;
      if (index !== 0) {
        btns.push(
          <Button
            key={item.title}
            type="link"
            onClick={() =>
              groupItem.updateComponents &&
              groupItem.updateComponents(stageItemList, formSettings)
            }
          >
            {`保存成${item.title}`}
          </Button>
        );
      }
    });
    return btns;
  }

  return (
    <div className="toolbar">
      {/* <Button type="link" onClick={() => handleUndo && handleUndo()}>
        撤 销
      </Button>
      <Button type="link" onClick={() => handleRedo && handleRedo()}>
        恢 复
      </Button> */}
      <Button type="link" onClick={() => handleClear && handleClear()}>
        清 空
      </Button>
      {/* <Button type="link" onClick={() => handleReset && handleReset()}>
        重 置
      </Button> */}
      <div style={{ width: 2, height: 20, backgroundColor: "#dedede" }}></div>
      {renderCustomButtons()}
    </div>
  );
};

Toolbar.displayName = "Toolbar";

export default Toolbar;
