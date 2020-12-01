import { nanoid } from "nanoid";
import { FormSettingsProps } from "./types";

export enum ComponentType {
  Bricks = "bricks",
  Buildings = "buildings",
}

export enum Mode {
  Stage = "stage",
  Attr = "attr",
  Output = "output",
}

export const defaultFormSettings: FormSettingsProps = {
  name: nanoid(),
  colon: "true",
  layout: "horizontal",
  labelAlign: "right",
  labelCol: 12,
  wrapperCol: 12,
};
