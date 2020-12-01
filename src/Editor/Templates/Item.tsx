import { nanoid } from "nanoid";
import React, { useContext } from "react";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { EditorContext } from "../index";

interface Config {
  id: string;
  label: string;
  type: string;
}

interface ItemProps {
  config: Config;
}

const Item: React.FC<ItemProps> = (props) => {
  const { config } = props;
  const { label } = config;
  const { handleDrop } = useContext(EditorContext);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "TemplateItem", config },
    end: (
      item: { type: string; config: any } | undefined,
      monitor: DragSourceMonitor
    ) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        handleDrop &&
          handleDrop({
            ...JSON.parse(
              JSON.stringify({
                ...item.config,
                props: { ...item.config.props, name: nanoid() },
              })
            ),
          });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="item" style={{ opacity: isDragging ? 0.3 : 1 }}>
      <div ref={drag} className="item-content">
        <div className="preview"></div>
        <div className="name">{label}</div>
      </div>
    </div>
  );
};

Item.displayName = "Item";

export default Item;
