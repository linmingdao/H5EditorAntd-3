import React from "react";
import { Form, Input } from "antd";

const Stage = Form.create({ name: "Stage" })(
  class extends React.Component {
    render() {
      const { form, label, name, value, placeholder } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form.Item label={label}>
          {getFieldDecorator(name, {
            rules: [{ required: true, message: "请输入" }],
            initialValue: value,
          })(<Input placeholder={placeholder} />)}
        </Form.Item>
      );
    }
  }
);

const Attr = Form.create({
  name: "Attr",
  onValuesChange(props, changedValues, allValues) {
    props.onValuesChange(changedValues, allValues);
  },
})(
  class extends React.Component {
    render() {
      const { form, name, value, label, placeholder } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          <Form.Item label="name">
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入" }],
              initialValue: name,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="value">
            {getFieldDecorator("value", {
              rules: [{ required: true, message: "请输入" }],
              initialValue: value,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="label">
            {getFieldDecorator("label", {
              rules: [{ required: true, message: "请输入" }],
              initialValue: label,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="placeholder">
            {getFieldDecorator("placeholder", {
              rules: [{ required: true, message: "请输入" }],
              initialValue: placeholder,
            })(<Input placeholder="请输入" />)}
          </Form.Item>
        </Form>
      );
    }
  }
);

const TextInput = (props) => {
  switch (props.mode) {
    case "stage":
      return <Stage {...props} />;
    case "attr":
      return <Attr {...props} />;
    default:
      return <Stage {...props} />;
  }
};

TextInput.defaultProps = {
  name: "title",
  value: "基于 Ant Design 的表单编辑器",
  label: "标题",
  placeholder: "请输入",
  mode: "stage",
};

export default TextInput;
