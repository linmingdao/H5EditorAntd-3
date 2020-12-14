import React, { useContext, useState } from "react";
import { EditorContext } from "../index";
import { Menu, Icon } from "antd";
import List from "./List";
import Item from "./Item";

export interface SelectParam {
  key: string;
  keyPath: string[];
  item: any;
  domEvent: Event;
  selectedKeys: string[];
}

const Templates: React.FC = () => {
  const { showTmplMenu, tmplPanelWidth, uniformTmplGroupList } = useContext(
    EditorContext
  );
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);
  const [currentComponents, setCurrentComponents] = useState(
    uniformTmplGroupList && uniformTmplGroupList.length > 0
      ? uniformTmplGroupList[0]["components"]
      : []
  );

  const handleSelect = (item: SelectParam) => {
    const index = Number(item.key);
    setCurrentGroupIndex(index);
    setCurrentComponents(uniformTmplGroupList[index]["components"]);
  };

  return (
    <div
      className="templates"
      style={{ width: tmplPanelWidth ? tmplPanelWidth : 300 }}
    >
      {uniformTmplGroupList && uniformTmplGroupList.length > 0 ? (
        <>
          {showTmplMenu && (
            <Menu
              mode="inline"
              theme="light"
              inlineCollapsed={true}
              onSelect={handleSelect}
              defaultSelectedKeys={["0"]}
            >
              {uniformTmplGroupList.map((item, index) => (
                <Menu.Item key={index}>
                  {item.icon ? item.icon : <Icon type="build" />}
                  <span>{item.title}</span>
                </Menu.Item>
              ))}
            </Menu>
          )}
          <div className="category">
            <div className="title">
              {uniformTmplGroupList[currentGroupIndex]["title"]}
            </div>
            <List>
              {currentComponents.map((item: any) => (
                <Item key={item.id} config={item} />
              ))}
            </List>
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

Templates.displayName = "Templates";

export default Templates;
