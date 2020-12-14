import React, { useContext } from "react";
import { FormComponentProps } from "antd/es/form";
import { Form } from "antd";
import { Mode } from "../constants";
import { EditorContext } from "../index";
import DynamicEngine from "../DynamicEngine";
import { convertFormSettings, getComponentErrorTips } from "../helper";

interface PropTypes {
  formData: any;
}

const StageForm: React.FC<PropTypes> = ({ formData }) => {
  const { label, name, rules = [] } = formData.props;
  const { formSettings } = useContext(EditorContext);

  const SForm = Form.create<FormComponentProps>({
    name: "_StageForm",
  })(
    class extends React.Component<FormComponentProps, any> {
      render() {
        const { form } = this.props;
        const { getFieldDecorator } = form;
        return (
          <Form {...convertFormSettings(formSettings)}>
            <Form.Item label={label || "标题"}>
              {name ? (
                rules.includes("Required") ? (
                  getFieldDecorator(`${name}`, {
                    rules: [{ required: true, message: "该字段必填哟~~" }],
                  })(
                    <DynamicEngine
                      componentName={formData.name}
                      componentProps={{ ...formData.props, mode: Mode.Stage }}
                    />
                  )
                ) : (
                  <DynamicEngine
                    componentName={formData.name}
                    componentProps={{ ...formData.props, mode: formData.Stage }}
                  />
                )
              ) : (
                <div
                  dangerouslySetInnerHTML={{
                    __html: getComponentErrorTips(name),
                  }}
                ></div>
              )}
            </Form.Item>
          </Form>
        );
      }
    }
  );
  return <SForm />;
};

export default StageForm;
