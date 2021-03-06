import React from "react";
import { Form, Input, Select, Checkbox } from "antd";
import { FormComponentProps } from "antd/es/form";
import { nanoid } from "nanoid";
import { ALL_RULES } from "../validator";
import { parseOptions } from "../helper";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import {
  attrLabelCol,
  attrWrapperCol,
  attrLabelAlign,
  attTextAreaRows,
} from "../config";

const { TextArea } = Input;
const { Option } = Select;

interface PropTypes extends FormComponentProps {
  name: string;
  value?: any[];
  label?: string;
  rules?: string[];
  options?: string;
  disabled?: boolean;
  optionsList?: any[];
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

class Stage extends React.Component<PropTypes> {
  handleChange = (value: CheckboxValueType[]) => {
    this.triggerChange(value);
  };

  triggerChange = (newVal: any) => {
    const { onChange } = this.props;
    onChange && onChange(newVal);
  };

  render() {
    const { disabled, optionsList, value } = this.props;
    return (
      <Checkbox.Group
        disabled={disabled}
        value={value}
        options={optionsList}
        onChange={this.handleChange}
      />
    );
  }
}

const Preview: React.FC<PropTypes> = (props) => {
  const { optionsList, value } = props;
  return (
    <div>{value && value.length && value.map((val) => {
      const target = (optionsList as any[]).find((item) => item.value === val);
      return target ? target.label : val;
    }).join(", ")}</div>
  );
};

const Attr = Form.create<PropTypes>({
  name: "Attr",
  onValuesChange(props, changedValues, allValues) {
    props.onAttrPropsChange &&
      props.onAttrPropsChange(changedValues, allValues);
  },
})(
  class extends React.Component<PropTypes, any> {
    render() {
      const {
        form,
        name,
        label,
        value,
        options,
        rules,
        optionsList,
      } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form
          labelCol={attrLabelCol}
          wrapperCol={attrWrapperCol}
          labelAlign={attrLabelAlign}
        >
          <Form.Item label="name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }],
              initialValue: name,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="label">
            {getFieldDecorator("label", { initialValue: label })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="value">
            {getFieldDecorator("value", {
              initialValue: value,
            })(<Checkbox.Group options={optionsList} />)}
          </Form.Item>
          <Form.Item label="rules">
            {getFieldDecorator("rules", { initialValue: rules })(
              <Select placeholder="请选择" mode="multiple">
                {ALL_RULES.map((rule) => (
                  <Option key={rule} value={rule}>
                    {rule}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="options">
            {getFieldDecorator("options", { initialValue: options })(
              <TextArea
                rows={attTextAreaRows}
                placeholder="请输入选项信息,例如: 中国,China;日本,Japan;美国,America"
              />
            )}
          </Form.Item>
          <div
            style={{
              textAlign: "left",
              color: "#f55757",
              fontSize: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            * 请以 label,value 的形式输入您的选项，label 和 value
            间请以中文或英文逗号隔开，选项间请以中文或英文分号隔开，例如：key1,value1;key2,value2
          </div>
          <div
            style={{
              textAlign: "left",
              color: "#f55757",
              fontSize: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            * 如果 label,value
            都是相同值，那么可以简单只提供一个值：value1;value2;key,value3
          </div>
        </Form>
      );
    }
  }
);

const RadioGroup: React.FC<PropTypes> = (props) => {
  const { mode, options } = props;
  let optionsList = parseOptions(options);
  switch (mode) {
    case "stage":
      return <Stage {...props} optionsList={optionsList} />;
    case "attr":
      return <Attr {...props} optionsList={optionsList} />;
    case "preview":
      return <Preview {...props} optionsList={optionsList} />;
    default:
      return <Stage {...props} optionsList={optionsList} />;
  }
};

RadioGroup.defaultProps = {
  name: nanoid(),
  value: [],
  label: "标题",
  options: "选项1,option1;选项2,option2;选项3,option3",
  mode: "stage",
};

export default RadioGroup;
