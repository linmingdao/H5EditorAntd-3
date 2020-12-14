import React from "react";
import { nanoid } from "nanoid";
import { ALL_RULES } from "../validator";
import { Form, Input, Select, InputNumber } from "antd";
import { FormComponentProps } from "antd/es/form";
import { attrLabelCol, attrWrapperCol, attrLabelAlign } from "../config";

const { Option } = Select;
const { TextArea } = Input;

interface PropTypes extends FormComponentProps {
  name: string;
  value?: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  rows?: number;
  required?: string;
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
    const { placeholder, value, rows } = this.props;
    return (
      <TextArea
        value={value}
        rows={rows ? rows : 4}
        placeholder={placeholder}
        onChange={this.handleChange}
      />
    );
  }
}

const Attr = Form.create<PropTypes>({
  name: "Attr",
  onValuesChange(props, changedValues, allValues) {
    props.onAttrPropsChange &&
      props.onAttrPropsChange(changedValues, allValues);
  },
})(
  class extends React.Component<PropTypes, any> {
    render() {
      const { form, name, value, label, placeholder, rows, rules } = this.props;
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
            {getFieldDecorator("label", {
              initialValue: label,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="value">
            {getFieldDecorator("value", {
              initialValue: value,
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
          <Form.Item label="rows">
            {getFieldDecorator("rows", {
              initialValue: rows,
            })(
              <InputNumber
                min={1}
                precision={0}
                placeholder="请输入"
                style={{ width: "100%" }}
              />
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

const CTextArea: React.FC<PropTypes> = (props) => {
  switch (props.mode) {
    case "stage":
      return <Stage {...props} />;
    case "attr":
      return <Attr {...props} />;
    default:
      return <Stage {...props} />;
  }
};

CTextArea.defaultProps = {
  name: nanoid(),
  value: "",
  rows: 4,
  rules: [],
  label: "备注",
  placeholder: "请输入",
  mode: "stage",
};

export default CTextArea;
