import React, { useContext } from "react";
import { Form, Select, Input } from "antd";
import { FormSettingsProps } from "../types";
import { defaultFormSettings } from "../constants";
import { EditorContext } from "../index";
import { FormComponentProps } from "antd/es/form";

const { Option } = Select;

const FormGlobalSettings: React.FC<FormSettingsProps> = (props) => {
  const { handleFormSettingsChange, attLabelWrapperCol = [7, 17] } = useContext(
    EditorContext
  );

  interface StageFormProps extends FormComponentProps {
    initialValues: any;
  }

  const LayoutSettingsForm = Form.create<StageFormProps>({
    name: "LayoutSettingsForm",
    onValuesChange(props, changedValues, allValues) {
      handleFormSettingsChange &&
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
                rules: [{ required: true, message: "请输入" }],
                initialValue: name,
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="colon">
              {getFieldDecorator("colon", {
                rules: [{ required: true, message: "请输入" }],
                initialValue: colon,
              })(
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  placeholder="请选择"
                >
                  <Option value="true">带冒号(:)</Option>
                  <Option value="false">不带冒号(:)</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="layout">
              {getFieldDecorator("layout", {
                rules: [{ required: true, message: "请输入" }],
                initialValue: layout,
              })(
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  placeholder="请选择"
                >
                  <Option value="horizontal">horizontal</Option>
                  <Option value="vertical">vertical</Option>
                  <Option value="inline">inline</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="labelAlign">
              {getFieldDecorator("labelAlign", {
                rules: [{ required: true, message: "请输入" }],
                initialValue: labelAlign,
              })(
                <Select
                  style={{ width: "100%", textAlign: "left" }}
                  placeholder="请选择"
                >
                  <Option value="right">right</Option>
                  <Option value="left">left</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item label="labelCol">
              {getFieldDecorator("labelCol", {
                rules: [{ required: true, message: "请输入" }],
                initialValue: labelCol,
              })(<Input type="number" placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="wrapperCol">
              {getFieldDecorator("wrapperCol", {
                rules: [{ required: true, message: "请输入" }],
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
