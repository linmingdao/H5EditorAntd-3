import { nanoid } from "nanoid";
import { ComponentType } from "./constants";
import {
  BrickTemplate,
  BuildingTemplateGroup,
  BuildingTemplateGroupList,
  UniformTmplGroupList,
  FormSettingsProps,
} from "./types";

/**
 * 获取统一的模板数据结构
 * @param bricks 基础模板
 * @param buildings 业务模板
 */
export function getUniformTmplGroupList(
  bricks: BrickTemplate,
  buildings: BuildingTemplateGroupList
): UniformTmplGroupList {
  return [
    // 基础组件分组信息
    {
      icon: bricks.icon,
      title: "基础组件",
      loader: bricks.loader,
      // [ { id, type: "Bricks", label, name, props } ]
      components: bricks.components.map((item) => ({
        ...item,
        id: nanoid(),
        type: ComponentType.Bricks,
      })),
    },
    // 建筑组件分组
    ...buildings.map((item: BuildingTemplateGroup) => ({
      icon: item.icon,
      title: item.title,
      updateComponents: item.updateComponents,
      // [ { id, type: "Buildings", label, composes } ]
      components: item.components.map((item) => ({
        ...item,
        id: nanoid(),
        type: ComponentType.Buildings,
      })),
    })),
  ];
}

export function convertFormSettings(settings: FormSettingsProps = {}) {
  return {
    ...settings,
    colon: settings.colon && settings.colon === "true" ? true : false,
    labelCol: {
      span: settings.labelCol ? Number(settings.labelCol) : 6,
    },
    wrapperCol: {
      span: settings.wrapperCol ? Number(settings.wrapperCol) : 18,
    },
  };
}

export function getComponentErrorTips(name?: string) {
  if (name) {
    return "";
  } else {
    return "<span style='color:#f5222d;font-size:14px;'>请设置 name 属性哟~~</span>";
  }
}
