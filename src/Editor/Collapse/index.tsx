import React from "react";
import { Icon } from "antd";

interface CollapseProps {
  collapse: boolean;
  onClick: () => void;
}

const Collapse: React.FC<CollapseProps> = (props) => {
  const { onClick, collapse } = props;
  return (
    <div className="colla-outline">
      <span className="colla" onClick={onClick}>
        {collapse ? (
          <Icon type="double-right" style={{ fontSize: 15 }} />
        ) : (
          <Icon type="double-left" style={{ fontSize: 15 }} />
        )}
      </span>
    </div>
  );
};

Collapse.displayName = "Collapse";

export default Collapse;
