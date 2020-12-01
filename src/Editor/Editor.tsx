import React, { useContext } from "react";
import classnames from "classnames";
import Toolbar from "./Toolbar";
import Templates from "./Templates";
import Stage from "./Stage";
import Collapse from "./Collapse";
import Attributes from "./Attributes";
import { EditorContext } from "./index";

interface EditorProps {
  className?: string;
  style?: React.CSSProperties;
}

const Editor: React.FC<EditorProps> = ({ className, style }) => {
  const classes = classnames("antd-form-editor", className);
  const { collapse, setCollapse } = useContext(EditorContext);

  return (
    <div className={classes} style={style}>
      {/* 工具栏 */}
      <Toolbar />
      <div className="content">
        {/* 模板列表 */}
        <Templates />
        {/* 布局编辑器 */}
        <Stage />
        {/* 展开、收起属性编辑器 */}
        <Collapse collapse={collapse} onClick={() => setCollapse(!collapse)} />
        {/* 组件属性编辑器 */}
        <Attributes collapse={collapse} />
      </div>
    </div>
  );
};

Editor.displayName = "Editor";

export default Editor;
