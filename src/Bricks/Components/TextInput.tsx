import React from "react";
import { nanoid } from "nanoid";
import { ALL_RULES } from "../validator";
import { Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/es/form";
import { attrLabelCol, attrWrapperCol, attrLabelAlign } from "../config";

const { Option } = Select;

interface PropTypes extends FormComponentProps {
  name: string;
  value?: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  disabled?: boolean;
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

class Stage extends React.Component<PropTypes> {
  handleChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    this.triggerChange(value);
  };

  triggerChange = (newVal: any) => {
    const { onChange } = this.props;
    onChange && onChange(newVal);
  };

  render() {
    const { disabled, placeholder, value } = this.props;
    return (
      <Input
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

const Preview: React.FC<PropTypes> = (props) => {
  return <div>{props.value}</div>;
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
      const { name, value, label, placeholder, rules } = this.props;
      const { getFieldDecorator } = this.props.form;
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
            {getFieldDecorator("label", {
              initialValue: label,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="value">
            {getFieldDecorator("value", {
              initialValue: value,
              trigger: "onBlur",
              valuePropName: "defaultValue",
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="rules">
            {getFieldDecorator("rules", { initialValue: rules })(
              <Select placeholder="请选择" mode="multiple">
                {ALL_RULES.map((rule) => (
                  <Option value={rule}>{rule}</Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="placeholder">
            {getFieldDecorator("placeholder", {
              initialValue: placeholder,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </Form>
      );
    }
  }
);

const TextInput: React.FC<PropTypes> = (props) => {
  switch (props.mode) {
    case "stage":
      return <Stage {...props} />;
    case "attr":
      return <Attr {...props} />;
    case "preview":
      return <Preview {...props} />;
    default:
      return <Stage {...props} />;
  }
};

TextInput.defaultProps = {
  name: nanoid(),
  value: "",
  label: "标题",
  placeholder: "请输入",
  mode: "stage",
};

export default TextInput;
