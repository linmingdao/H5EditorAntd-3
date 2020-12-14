import React from "react";
import moment from "moment";
import { nanoid } from "nanoid";
import { ALL_RULES } from "../validator";
import { FormComponentProps } from "antd/es/form";
import { Form, Input, DatePicker, Select } from "antd";
import { attrLabelCol, attrWrapperCol, attrLabelAlign } from "../config";

const { Option } = Select;

interface PropTypes extends FormComponentProps {
  value?: any;
  name: string;
  label?: string;
  rules?: string[];
  placeholder?: string;
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

class Stage extends React.Component<PropTypes> {
  handleChange = (date: moment.Moment | null, dateString: string) => {
    this.triggerChange(date);
  };

  triggerChange = (newVal: any) => {
    const { onChange } = this.props;
    onChange && onChange(newVal);
  };

  render() {
    const { value, placeholder } = this.props;
    return (
      <DatePicker
        value={value}
        showTime={true}
        format="YYYY-MM-DD HH:mm"
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
      const { form, name, value, label, placeholder, rules } = this.props;
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
            })(
              <DatePicker
                value={value}
                showTime={true}
                format="YYYY-MM-DD HH:mm"
                placeholder="请选择"
              />
            )}
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

const DateTimeSelect: React.FC<PropTypes> = (props) => {
  switch (props.mode) {
    case "stage":
      return <Stage {...props} />;
    case "attr":
      return <Attr {...props} />;
    default:
      return <Stage {...props} />;
  }
};

DateTimeSelect.defaultProps = {
  name: nanoid(),
  value: moment(),
  label: "时间",
  placeholder: "请选择",
  mode: "stage",
};

export default DateTimeSelect;
