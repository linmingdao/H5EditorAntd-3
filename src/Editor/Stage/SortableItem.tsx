import React, { useContext, useRef } from "react";
import { XYCoord } from "dnd-core";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import { Icon, Form } from "antd";
import { Mode } from "../constants";
import DynamicEngine from "../DynamicEngine";
import classnames from "classnames";
import { EditorContext } from "../index";
import { convertFormSettings } from "../helper";
import { Loader } from "../types";

export interface ISortableItemProps {
  index: number;
  itemData: any;
  moveFormItem: (dragIndex: number, hoverIndex: number) => void;
  onClick?: () => void;
}

interface IDragItem {
  index: number;
  id: string;
  type: string;
}

const SortableItem: React.FC<ISortableItemProps> = (props) => {
  const { index, itemData, moveFormItem, onClick } = props;
  const { formSettings, selectedStageItemIndex, handleRemove } = useContext(
    EditorContext
  );
  const className = classnames("item", {
    selected: selectedStageItemIndex === index,
  });

  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "SortableItem",
    hover(item: IDragItem, monitor: DropTargetMonitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveFormItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });
  const [{ opacity }, drag, preview] = useDrag({
    item: { type: "SortableItem", id: itemData.id, index },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
      opacity: monitor.isDragging() ? 0 : 1,
    }),
  });
  drop(ref);

  function handleRemoveStageItem(e: React.MouseEvent) {
    e.stopPropagation();
    if (handleRemove) handleRemove(itemData.id, index);
  }

  return (
    <div ref={ref}>
      <div
        ref={preview}
        className={className}
        style={{ opacity }}
        onClick={() => onClick && onClick()}
      >
        <div className="operator">
          <div ref={drag} className="drag-handler">
            <Icon type="menu" />
          </div>
          <div className="dividing-line" />
          <div className="remove-btn" onClick={(e) => handleRemoveStageItem(e)}>
            <Icon type="minus-circle" />
          </div>
        </div>
        <div className="component-wrapper">
          <Form {...convertFormSettings(formSettings)}>
            <Form.Item label={itemData.props.label || "标题"}>
              <DynamicEngine
                componentName={itemData.name}
                componentProps={{ ...itemData.props, mode: Mode.Stage }}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export function renderForm(loader: Loader, composes: any[]) {
  return (
    <Form>
      {composes.map((item: any, index: number) => (
        <Form.Item key={index} label={item.props.label || "标题"}>
          <DynamicEngine
            loader={loader}
            componentName={item.name}
            componentProps={{ ...item.props, mode: Mode.Stage }}
          />
        </Form.Item>
      ))}
    </Form>
  );
}

SortableItem.displayName = "SortableItem";

export default SortableItem;
