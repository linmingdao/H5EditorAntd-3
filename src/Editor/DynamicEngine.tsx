import React, { useMemo, memo, FC, useContext } from "react";
import Loadable from "react-loadable";
import { EditorContext } from "./index";
import { Icon } from "antd";
import { Loader } from "./types";

const tipStyle: React.CSSProperties = {
  display: "inline-block",
  boxSizing: "border-box",
  fontSize: "14px",
  textAlign: "center",
  verticalAlign: "middle",
};

function ErrorTip(msg: string) {
  return (
    <span style={{ ...tipStyle, color: "#f55757" }}>
      <Icon type="warning" />
      <span style={{ paddingLeft: 8 }}>{msg}</span>
    </span>
  );
}

function LoadingTip(msg: string) {
  return (
    <span style={{ ...tipStyle, color: "#1890FF" }}>
      <Icon type="loading" />
      <span style={{ paddingLeft: 8 }}>{msg}</span>
    </span>
  );
}

function Loading(componentName: string) {
  return function (props: any) {
    if (props.error) {
      return ErrorTip(`${componentName} 组件加载失败, 请确认是否注册成功`);
    } else if (props.timedOut) {
      return ErrorTip(`${componentName} 组件加载超时了`);
    } else {
      return LoadingTip(`${componentName} 组件加载中...`);
    }
  };
}

export const DynamicFunc = (loader: any, componentName: string) => {
  return Loadable({
    loader: loader(componentName),
    loading: Loading(componentName),
  });
};

export interface DynamicEngineProps {
  mode: string;
  loader?: Loader;
  componentName: string;
  componentProps: any;
  onValuesChange: (changedValues: any, allValues: any) => void;
}

const DynamicEngine = memo((props: DynamicEngineProps) => {
  const { uniformTmplGroupList } = useContext(EditorContext);
  const loader = props.loader ? props.loader : uniformTmplGroupList[0].loader;
  const { mode, componentName, componentProps, onValuesChange } = props;
  const mergeProps = { ...componentProps, mode, onValuesChange };

  const Dynamic = useMemo(() => {
    return (DynamicFunc(
      loader,
      componentName
    ) as unknown) as FC<DynamicEngineProps>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Dynamic {...mergeProps} />;
});

DynamicEngine.displayName = "DynamicEngine";

export default DynamicEngine;
