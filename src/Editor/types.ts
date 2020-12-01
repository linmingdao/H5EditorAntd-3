import React from "react";
import { ComponentType } from "./constants";

export type Loader = (name: string) => any;

export interface ObjProps {
  [key: string]: any;
}

// 传入 H5Editor 的 props 结构定义

export interface BrickComponent {
  type?: string;
  id?: string;
  label: string;
  name: string;
  loader?: Loader;
  props?: ObjProps;
}

export interface BrickTemplate {
  icon?: React.ReactNode;
  loader: Loader;
  components?: any[];
  getComponents: () => BrickComponent[];
}

export interface BuildingComponent {
  label: string;
  formSettings?: ObjProps;
  composes: BrickComponent[];
  updateComponents?: (config: any) => void;
}

export interface BuildingTemplateGroup {
  icon?: React.ReactNode;
  title: string;
  components?: any[];
  getComponents: () => BuildingComponent[];
  updateComponents: (config: any, formSettings: any) => void;
}

export type BuildingTemplateGroupList = BuildingTemplateGroup[];

// 基础组件 和 建筑组件 统一的数据结构

export interface UniformBrickTmplProps {
  [key: string]: any;
}

export interface UniformBrickTmpl {
  id: string;
  type: ComponentType.Bricks;
  label: string;
  name: string;
  props: UniformBrickTmplProps;
}

export interface UniformBuildingTmpl {
  id: string;
  type: "Buildings";
  label: string;
  composes: UniformBrickTmpl[];
}

// TODO:处理这里的类型检查
// export type UniformTmpl = UniformBrickTmpl | UniformBuildingTmpl;

// 统一的模板组件分组
export interface UniformTmplGroup {
  icon?: React.ReactNode;
  // 非 Bricks 组件无 loader
  loader?: Loader;
  title: string;
  components: any[];
}

// 统一的模板组件分组列表
export type UniformTmplGroupList = UniformTmplGroup[];

export interface H5EditorProps {
  bricks: BrickTemplate;
  buildings: BuildingTemplateGroupList;
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

export type SelectedCallback = (selectedIndex: number) => void;

export type NoSelectedCallback = () => void;

export interface H5EditorContext {
  stageBgColor?: string;
  stageActiveColor?: string;
  stageDropColor?: string;
  tmplPanelWidth?: number;
  attrPanelWidth?: number;
  attLabelWrapperCol?: [number, number];
  emptyImageType: React.ReactNode;
  formSettings: FormSettingsProps;
  uniformTmplGroupList: UniformTmplGroupList;
  stageItemList: StageItem[];
  collapse: boolean;
  setCollapse: (collapse: boolean) => void;
  selectedStageItemIndex: number;
  handleStageItemPropsChange?: (
    selectedIndex: number,
    changedValues: any,
    allValues?: any
  ) => void;
  handleFormSettingsChange?: (changedValues: any, allValues?: any) => void;
  handleDrop?: (item: any) => void;
  handleClear?: NoSelectedCallback;
  handleSelect?: SelectedCallback;
  handleSort?: (stageItemList: StageItem[]) => void;
  handleCopy?: SelectedCallback;
  handleRemove?: (id: string, index: number) => void;
  handleReset?: NoSelectedCallback;
  handleUndo?: NoSelectedCallback;
  handleRedo?: NoSelectedCallback;
}

export interface StageItem {
  id: string;
  name: string;
  props: any;
}

export interface BrickSchema {
  onAttributesChange: (attrs: any) => void;
}

type labelAlignLiteral = "right" | "left";
type layoutLiteral = "horizontal" | "vertical" | "inline";

export interface FormSettingsProps {
  name?: string;
  colon?: string;
  layout?: layoutLiteral;
  labelAlign?: labelAlignLiteral;
  labelCol?: number;
  wrapperCol?: number;
}
