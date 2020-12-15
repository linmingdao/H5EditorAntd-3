import React from "react";
import { Form } from "antd";
import { Mode } from "./constants";
import { RULES } from "../Bricks/validator";
import { FormComponentProps } from "antd/es/form";
import { BrickComponents } from "../Bricks";

interface RenderFormData {
  disabled?: boolean;
  composes: any[];
  formFooter?: React.ReactNode;
  userSubmitCb?: (values: any) => void;
}

export function renderFormByRegister(data: RenderFormData) {
  const { disabled, composes, formFooter, userSubmitCb } = data;
  const CustomForm = Form.create<FormComponentProps>({
    name: "CustomForm",
  })(
    class extends React.Component<FormComponentProps, any> {
      handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            userSubmitCb && userSubmitCb(values);
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
                const BrickCompnent = BrickComponents[item.name]["instance"];
                const _rules = item.props.rules || [];
                const rules = _rules.map((ruleName) => RULES[ruleName]);
                return (
                  <Form.Item key={index} label={item.props.label || "标题"}>
                    {getFieldDecorator(`${item.props.name}`, {
                      rules,
                      initialValue: item.props.value || "",
                    })(
                      <BrickCompnent
                        {...{ ...item.props, disabled, mode: Mode.Stage }}
                      />
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
