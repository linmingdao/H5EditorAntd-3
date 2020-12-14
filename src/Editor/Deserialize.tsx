import React from "react";
import { Form } from "antd";
import { Loader } from "./types";
import { Mode } from "./constants";
import { RULES } from "../Bricks/validator";
import DynamicEngine from "./DynamicEngine";
import { FormComponentProps } from "antd/es/form";
import { BrickComponents } from "../Bricks";

export function renderFormByRegister(
  composes: any[],
  formFooter: React.ReactNode
) {
  const CustomForm = Form.create<FormComponentProps>({
    name: "CustomForm",
  })(
    class extends React.Component<FormComponentProps, any> {
      handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            console.log("Received values of form: ", values);
          }
        });
      };

      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Form
            labelAlign="right"
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onSubmit={this.handleSubmit}
          >
            {composes.map(
              (
                item: {
                  props: {
                    label: string;
                    name: string;
                    value: any;
                    rules: string[];
                  };
                  name: string;
                },
                index: number
              ) => {
                const BrickCompnent = BrickComponents[item.name];
                const _rules = item.props.rules || [];
                const rules = _rules.map((ruleName) => RULES[ruleName]);
                return (
                  <Form.Item key={index} label={item.props.label || "标题"}>
                    {getFieldDecorator(`${item.props.name}`, {
                      rules,
                      initialValue: item.props.value || "",
                    })(
                      <BrickCompnent {...{ ...item.props, mode: Mode.Stage }} />
                    )}
                  </Form.Item>
                );
              }
            )}
            {formFooter}
          </Form>
        );
      }
    }
  );

  return <CustomForm />;
}

export function renderFormByDynamicEngine(loader: Loader, composes: any[]) {
  const CustomForm = Form.create<FormComponentProps>({
    name: "CustomForm",
  })(
    class extends React.Component<FormComponentProps, any> {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Form
            labelAlign="right"
            layout="horizontal"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
          >
            {composes.map(
              (
                item: {
                  props: { label: string; name: string; value: any };
                  name: string;
                },
                index: number
              ) => {
                return (
                  <Form.Item key={index} label={item.props.label || "标题"}>
                    {getFieldDecorator(`${item.props.name}`, {
                      initialValue: item.props.value || "",
                    })(
                      // FIXME: getFieldDecorator 包装 DynamicEngine 后，自定义组件无法获取 onChange 的临时处理方式
                      <DynamicEngine
                        loader={loader}
                        componentName={item.name}
                        componentProps={{ ...item.props, mode: Mode.Stage }}
                      />
                    )}
                  </Form.Item>
                );
              }
            )}
          </Form>
        );
      }
    }
  );

  return <CustomForm />;
}
