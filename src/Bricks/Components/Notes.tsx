import React from "react";
import { Form, Input } from "antd";
import { FormComponentProps } from "antd/es/form";
import { nanoid } from "nanoid";
import {
  attrLabelCol,
  attrWrapperCol,
  attrLabelAlign,
  attTextAreaRows,
} from "../config";

const { TextArea } = Input;

interface PropTypes extends FormComponentProps {
  name: string;
  label?: string;
  notesHtml?: string;
  mode?: string;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

class Stage extends React.Component<PropTypes> {
  render() {
    const { notesHtml } = this.props;
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: notesHtml ? notesHtml : "请编辑注释信息",
        }}
      ></div>
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
      const { form, name, label, notesHtml } = this.props;
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
          <Form.Item label="编辑注释">
            {getFieldDecorator("notesHtml", { initialValue: notesHtml })(
              <TextArea
                rows={attTextAreaRows}
                placeholder="请直接输入注释信息，支持 html 格式"
              />
            )}
          </Form.Item>
        </Form>
      );
    }
  }
);

const Notes: React.FC<PropTypes> = (props) => {
  const { mode } = props;
  switch (mode) {
    case "stage":
      return <Stage {...props} />;
    case "attr":
      return <Attr {...props} />;
    default:
      return <Stage {...props} />;
  }
};

Notes.defaultProps = {
  name: nanoid(),
  label: "标题",
  notesHtml:
    "<div>1、注释内容1</div><div>2、注释内容2，<a href='https://www.baidu.com' target='_blank'>百度</a></div><div>3、注释内容3</div><div>4、注释内容4</div><div style='color:#f5222d;'>注：直接支持 html 哟</div>",
  mode: "stage",
};

export default Notes;
