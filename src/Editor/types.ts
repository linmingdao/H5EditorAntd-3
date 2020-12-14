import React from "react";

export type Loader = (name: string) => any;

export interface PlainMap {
  [key: string]: any;
  [index: number]: any;
}

// start H5Editor 的 props bricks 结构定义

export interface BrickComponent {
  label: string;
  name: string;
  instance: React.FunctionComponent;
  props?: PlainMap;
}

export interface BrickComponentMap {
  [key: string]: BrickComponent;
  [index: number]: BrickComponent;
}

export interface Bricks {
  loader?: Loader;
  title?: string;
  icon?: React.ReactNode;
  components: BrickComponentMap;
}

// end H5Editor 的 props bricks 结构定义

// start H5Editor 的 props buildings 结构定义

export interface BuildingCompose {
  label: string;
  name: string;
  props?: PlainMap;
}

export interface BuildingComponent {
  label: string;
  formSettings?: PlainMap;
  composes: BuildingCompose[];
}

export interface BuildingGroup {
  title?: string;
  icon?: React.ReactNode;
  components: BuildingComponent[];
  updateComponents: (composes: any, formSettings: any) => void;
}

export type Buildings = BuildingGroup[];

// end H5Editor 的 props buildings 结构定义

// start 基础组件 和 建筑组件 统一的数据结构

export interface UniformBrick {
  id: string;
  type: string;
  label: string;
  name?: string;
  props?: PlainMap;
  instance?: React.FunctionComponent;
}

export interface UniformBuilding {
  id: string;
  type: "Buildings";
  label: string;
  composes: UniformBrick[];
}

export interface UniformGroup {
  title: string;
  components: UniformBrick[] | UniformBuilding[];
  icon?: React.ReactNode;
  updateComponents?: (composes: any, formSettings: any) => void;
}

export type UniformTmplGroupList = UniformGroup[];

// end 基础组件 和 建筑组件 统一的数据结构

export interface H5EditorProps {
  bricks: Bricks;
  buildings: Buildings;
  showTmplMenu?: boolean;
  stageBgColor?: string;
  stageActiveColor?: string;
  stageDropColor?: string;
  tmplPanelWidth?: number;
  attrPanelWidth?: number;
  attLabelWrapperCol?: [number, number];
  enableBuildingsFormSettings?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface H5EditorContext {
  bricks: Bricks;
  buildings: Buildings;
  showTmplMenu?: boolean;
  stageBgColor?: string;
  stageActiveColor?: string;
  stageDropColor?: string;
  tmplPanelWidth?: number;
  attrPanelWidth?: number;
  attLabelWrapperCol?: [number, number];
  enableBuildingsFormSettings?: boolean;
  emptyImageType: React.ReactNode;
  formSettings: FormSettingsProps;
  uniformTmplGroupList: UniformTmplGroupList;
  stageItemList: StageItem[];
  collapse: boolean;
  selectedStageItemIndex: number;
  setCollapse: (collapse: boolean) => void;
  handleAttrPropsChange?: (
    selectedIndex: number,
    changedValues: any,
    allValues?: any
  ) => void;
  handleFormSettingsChange?: (changedValues: any, allValues?: any) => void;
  handleDrop?: (item: any) => void;
  handleClear?: () => void;
  handleSelect?: (selectedIndex: number) => void;
  handleSort?: (stageItemList: StageItem[]) => void;
  handleCopy?: (selectedIndex: number) => void;
  handleRemove?: (id: string, index: number) => void;
  handleReset?: () => void;
  handleUndo?: () => void;
  handleRedo?: () => void;
}

// start 舞台项 类型定义

export interface StageItem {
  id: string;
  name: string;
  props: any;
}

// end 舞台项 类型定义

// start 全局属性面板类型定义

export type labelAlignLiteral = "right" | "left";
export type layoutLiteral = "horizontal" | "vertical" | "inline";
export interface FormSettingsProps {
  name?: string;
  colon?: string;
  layout?: layoutLiteral;
  labelAlign?: labelAlignLiteral;
  labelCol?: number;
  wrapperCol?: number;
}

// end 全局属性面板类型定义
