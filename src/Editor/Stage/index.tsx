import React, { useContext, useCallback } from "react";
import classnames from "classnames";
import { Empty } from "antd";
import { useDrop } from "react-dnd";
import update from "immutability-helper";
import { EditorContext } from "../index";
import SortableItem from "./SortableItem";

const Stage: React.FC = () => {
  const {
    stageBgColor,
    stageActiveColor,
    stageDropColor,
    stageItemList,
    emptyImageType,
    handleSort,
    handleSelect,
  } = useContext(EditorContext);

  const isNotEmpty = stageItemList && stageItemList.length;
  const classes = classnames("stage", "uniform-scrollbar", {
    "empty-list": !isNotEmpty,
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "TemplateItem",
    drop: () => ({ name: "LayoutEditor" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  // 高亮提示 开始拖拽 以及 可以完成拖拽放置
  const isActive = canDrop && isOver;
  let backgroundColor = stageBgColor ? stageBgColor : "#f3f2f2a3";
  const $collaOutline: any = document.querySelector(".colla-outline");
  if ($collaOutline) {
    $collaOutline.style["backgroundColor"] = backgroundColor;
  }
  if (isActive) {
    backgroundColor = stageActiveColor ? stageActiveColor : "#1890ff2b";
    if ($collaOutline) {
      $collaOutline.style["backgroundColor"] = backgroundColor;
    }
  } else if (canDrop) {
    backgroundColor = stageDropColor ? stageDropColor : "#1890ff1c";
    if ($collaOutline) {
      $collaOutline.style["backgroundColor"] = backgroundColor;
    }
  }

  // 排序
  const moveFormItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = stageItemList[dragIndex];
      if (handleSort)
        handleSort(
          update(stageItemList, {
            $splice: [
              [dragIndex, 1],
              [hoverIndex, 0, dragItem],
            ],
          })
        );
    },
    [stageItemList, handleSort]
  );

  return (
    <div ref={drop} className={classes} style={{ backgroundColor }}>
      {isNotEmpty ? (
        stageItemList.map((item, index) => (
          <SortableItem
            key={item.id}
            index={index}
            itemData={item}
            moveFormItem={moveFormItem}
            onClick={() => handleSelect && handleSelect(index)}
          />
        ))
      ) : (
          <Empty
            image={emptyImageType}
            description="赶快拖拽组件来组合你的表单页面吧~"
          />
        )}
    </div>
  );
};

Stage.displayName = "Stage";

export default Stage;
