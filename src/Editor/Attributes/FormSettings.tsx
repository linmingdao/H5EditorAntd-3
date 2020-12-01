import React, { useContext } from "react";
import { Form, Select, Input } from "antd";
import { FormSettingsProps } from "../types";
import { defaultFormSettings } from "../constants";
import { EditorContext } from "../index";
import { FormComponentProps } from "antd/es/form";

const { Option } = Select;

const FormGlobalSettings: React.FC<FormSettingsProps> = (props) => {
  const {
    handleFormSettingsChange,
    attLabelWrapperCol = [12, 12],
  } = useContext(EditorContext);

  interface StageFormProps extends FormComponentProps {
    initialValues: any;
  }

  const LayoutSettingsForm = Form.create<StageFormProps>({
    name: "LayoutSettingsForm",
    onValuesChange(props, changedValues, allValues) {
      if (handleFormSettingsChange)
        handleFormSettingsChange(changedValues, allValues);
    },
  })(
    class extends React.Component<StageFormProps, any> {
      render() {
        const { form, initialValues } = this.props;
        const { getFieldDecorator } = form;
        const {
          name,
          colon,
          layout,
          labelAlign,
          labelCol,
          wrapperCol,
        } = initialValues;
        return (
          <Form
            labelCol={{ span: attLabelWrapperCol[0] }}
            wrapperCol={{ span: attLabelWrapperCol[1] }}
            labelAlign="left"
          >
            <Form.Item label="name">
              {getFieldDecorator("name", {
                initialValue: name,
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="colon">
              {getFieldDecorator("colon", {
                initialValue: colon,
              })(
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  placeholder="请选择"
                >
                  <Option value="true">带冒号</Option>
                  <Option value="false">不带冒号</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="layout">
              {getFieldDecorator("layout", {
                initialValue: layout,
              })(
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  placeholder="请选择"
                >
                  <Option value="horizontal">水平</Option>
                  <Option value="vertical">垂直</Option>
                  <Option value="inline">内联</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="label align">
              {getFieldDecorator("labelAlign", {
                initialValue: labelAlign,
              })(
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  placeholder="请选择"
                >
                  <Option value="right">右对齐</Option>
                  <Option value="left">左对齐</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="label col">
              {getFieldDecorator("labelCol", {
                initialValue: labelCol,
              })(<Input type="number" placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="wrapper col">
              {getFieldDecorator("wrapperCol", {
                initialValue: wrapperCol,
              })(<Input type="number" placeholder="请输入" />)}
            </Form.Item>
          </Form>
        );
      }
    }
  );

  return <LayoutSettingsForm initialValues={props} />;
};

FormGlobalSettings.defaultProps = { ...defaultFormSettings };

FormGlobalSettings.displayName = "FormGlobalSettings";

export default FormGlobalSettings;
