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
      components:
        (bricks.getComponents &&
          bricks.getComponents().map((item) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Bricks,
          }))) ||
        [],
    },
    // 建筑组件分组
    ...buildings.map((item: BuildingTemplateGroup) => ({
      icon: item.icon,
      title: item.title,
      updateComponents: item.updateComponents,
      // [ { id, type: "Buildings", label, composes } ]
      components:
        (item.getComponents &&
          item.getComponents().map((item) => ({
            ...item,
            id: nanoid(),
            type: ComponentType.Buildings,
          }))) ||
        [],
    })),
  ];
}

export async function requestComponents(
  bricks: BrickTemplate,
  buildings: BuildingTemplateGroupList
) {
  const dfds: any = [bricks.getComponents()];
  buildings.forEach((item: BuildingTemplateGroup) =>
    dfds.push(item.getComponents())
  );
  const res = await Promise.all(dfds);
  bricks.components = res[0] as any[];
  buildings = buildings.map((item, index) => {
    return {
      ...item,
      components: res[index + 1] as any[],
    };
  });
  return getUniformTmplGroupList(bricks, buildings);
}

// export function updateBuildingsComponents(buildings: BuildingTemplateGroupList, index) {
//   const a = buildings[index];
// }

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
