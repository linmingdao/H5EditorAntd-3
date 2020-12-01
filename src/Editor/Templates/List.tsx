import React, { useContext } from "react";
import { Empty } from "antd";
import { EditorContext } from "../index";

const List: React.FC = (props) => {
  const { children } = props;
  const { emptyImageType } = useContext(EditorContext);
  return (
    <div className="list uniform-scrollbar">
      {children && (children as any[]).length ? (
        children
      ) : (
        <Empty
          style={{ width: "100%" }}
          image={emptyImageType}
          description="无该类目数据~"
        />
      )}
    </div>
  );
};

List.displayName = "List";

export default List;
