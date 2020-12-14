import "./index.css";
import React, { useState } from "react";
import { nanoid } from "nanoid";
import { Empty } from "antd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import Editor from "./Editor";
import { defaultFormSettings, ComponentType } from "./constants";
import {
  FormSettingsProps,
  H5EditorProps,
  H5EditorContext,
  StageItem,
} from "./types";
import { getUniformTmplGroupList } from "./helper";
export { renderFormByRegister } from "./Deserialize";

export const EditorContext = React.createContext<H5EditorContext>({
  bricks: {
    components: {},
  },
  buildings: [],
  formSettings: { ...defaultFormSettings },
  uniformTmplGroupList: [],
  stageItemList: [],
  collapse: false,
  setCollapse: () => false,
  selectedStageItemIndex: -1,
  emptyImageType: Empty.PRESENTED_IMAGE_SIMPLE,
});

const H5Editor: React.FC<H5EditorProps> = (props) => {
  const {
    showTmplMenu,
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    tmplPanelWidth,
    attrPanelWidth,
    attLabelWrapperCol,
    enableBuildingsFormSettings,
    bricks,
    buildings,
    ...restProps
  } = props;

  const [formSettings, setFormSettings] = useState<FormSettingsProps>({
    ...defaultFormSettings,
  });
  const [stageItemList, setStageItemList] = useState<StageItem[]>([]);
  const [collapse, setCollapse] = useState<boolean>(false);
  const [selectedStageItemIndex, setSelectedStageItemIndex] = useState<number>(
    -1
  );

  function updateStageItemList(list: StageItem[], needMerge: boolean = false) {
    setStageItemList((preList) => {
      const newList = needMerge ? [...preList, ...list] : list;
      return newList;
    });
  }

  function updateStageFormSettings(settings: any, needMerge: boolean = true) {
    const newSettings = needMerge ? { ...formSettings, ...settings } : settings;
    setFormSettings(newSettings);
  }

  const passedContext: H5EditorContext = {
    bricks,
    buildings,
    showTmplMenu,
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    tmplPanelWidth,
    attrPanelWidth,
    attLabelWrapperCol,
    enableBuildingsFormSettings,
    emptyImageType: Empty.PRESENTED_IMAGE_SIMPLE,
    formSettings,
    uniformTmplGroupList: getUniformTmplGroupList(bricks, buildings),
    stageItemList,
    collapse,
    selectedStageItemIndex,
    setCollapse,
    handleAttrPropsChange(
      selectedIndex: number,
      changedValues: any,
      allValues: any
    ) {
      updateStageItemList(
        stageItemList.map((item, index) => {
          if (index === selectedIndex) {
            return {
              ...item,
              props: {
                ...item.props,
                ...allValues,
              },
            };
          } else {
            return item;
          }
        })
      );
    },
    handleFormSettingsChange(changedValues: any) {
      updateStageFormSettings(changedValues);
    },
    handleSelect(selectedIndex: number) {
      setSelectedStageItemIndex(selectedIndex);
      setCollapse(selectedIndex >= 0);
    },
    handleSort(stageItemList) {
      setSelectedStageItemIndex(-1);
      updateStageItemList(stageItemList);
    },
    handleDrop(item) {
      if (item.type === ComponentType.Bricks) {
        updateStageItemList([{ ...item, id: nanoid() }], true);
      } else {
        if (enableBuildingsFormSettings && item.formSettings)
          updateStageFormSettings(item.formSettings);

        updateStageItemList(
          item.composes.map((item: any) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Bricks,
            props: {
              ...item.props,
              name: nanoid(),
            },
          })),
          true
        );
      }
    },
    handleClear() {
      updateStageItemList([]);
    },
    handleRemove(id) {
      setSelectedStageItemIndex(-1);
      updateStageItemList(stageItemList.filter((item) => item.id !== id));
    },
  };

  return (
    <EditorContext.Provider value={passedContext}>
      <DndProvider backend={HTML5Backend}>
        <Editor {...restProps} />
      </DndProvider>
    </EditorContext.Provider>
  );
};

H5Editor.displayName = "H5Editor";

export default H5Editor;
