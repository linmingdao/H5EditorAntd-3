import Notes from "./Components/Notes";
import Selector from "./Components/Selector";
import TextArea from "./Components/TextArea";
import TextInput from "./Components/TextInput";
import RadioGroup from "./Components/RadioGroup";
import CheckboxGroup from "./Components/CheckboxGroup";
import DateTimeSelect from "./Components/DateTimeSelect";

export const BrickComponents: {
  [key: string]: any;
  [index: number]: any;
} = {
  Notes: {
    label: "添加注释",
    name: "Notes",
    instance: Notes,
  },
  TextInput: {
    label: "输入框",
    name: "TextInput",
    instance: TextInput,
  },
  TextArea: {
    label: "文本域",
    name: "TextArea",
    instance: TextArea,
  },
  Selector: {
    label: "下拉框",
    name: "Selector",
    instance: Selector,
  },
  RadioGroup: {
    label: "单选框",
    name: "RadioGroup",
    instance: RadioGroup,
  },
  CheckboxGroup: {
    label: "复选框",
    name: "CheckboxGroup",
    instance: CheckboxGroup,
  },
  DateTimeSelect: {
    label: "日期选择器",
    name: "DateTimeSelect",
    instance: DateTimeSelect,
  },
};
