import React, { useContext } from "react";
import { Button, notification } from "antd";
import { BuildingGroup } from "../types";
import { EditorContext } from "../index";
import { checkStageName } from "../helper";

const Toolbar: React.FC = () => {
  const {
    formSettings,
    stageItemList,
    uniformTmplGroupList,
    handleClear,
  } = useContext(EditorContext);

  function handleUpdateComponents(
    updateComponents: (composes: any, formSettings: any) => void
  ) {
    const msg = checkStageName(stageItemList);
    if (!msg) {
      updateComponents && updateComponents(stageItemList, formSettings);
    } else {
      notification.error({ message: "Tips", description: msg });
    }
  }

  function renderCustomButtons(): React.ReactNode[] {
    let btns: React.ReactNode[] = [];
    uniformTmplGroupList.forEach((item, index) => {
      let groupItem = item as BuildingGroup;
      if (index !== 0) {
        btns.push(
          <Button
            key={item.title}
            type="link"
            onClick={() => handleUpdateComponents(groupItem.updateComponents)}
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
        清空面板
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
