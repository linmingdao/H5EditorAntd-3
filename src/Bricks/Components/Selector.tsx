import React from "react";
import { Form, Input, Select } from "antd";
import { FormComponentProps } from "antd/es/form";
import { nanoid } from "nanoid";
import { ALL_RULES } from "../validator";
import { parseOptions } from "../helper";
import {
  attrLabelCol,
  attrWrapperCol,
  attrLabelAlign,
  attTextAreaRows,
} from "../config";

const { TextArea } = Input;
const { Option } = Select;

declare const ModeOptions: ["default", "multiple"];
export declare type ModeOption = typeof ModeOptions[number];

interface PropTypes extends FormComponentProps {
  name: string;
  value?: any;
  label?: string;
  rules?: string[];
  selectMode?: ModeOption;
  placeholder?: string;
  options?: string;
  optionsList?: any[];
  mode?: string;
  onChange?: (values: any) => void;
  onAttrPropsChange?: (changedValues: any, allValues: any) => void;
}

class Stage extends React.Component<PropTypes> {
  handleChange = (value: any) => {
    this.triggerChange(value);
  };

  triggerChange = (newVal: any) => {
    const { onChange } = this.props;
    onChange && onChange(newVal);
  };

  render() {
    const { placeholder, value, selectMode, optionsList } = this.props;
    return (
      <Select
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        mode={selectMode ? selectMode : "default"}
      >
        {optionsList &&
          optionsList.map((m) => {
            return (
              <Option key={m.value} value={m.value}>
                {m.label}
              </Option>
            );
          })}
      </Select>
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
      const {
        form,
        name,
        value,
        label,
        rules,
        placeholder,
        options,
        optionsList,
        selectMode,
      } = this.props;

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
              <Select
                placeholder="请选择"
                mode={selectMode ? selectMode : "default"}
              >
                {optionsList &&
                  optionsList.map((m) => (
                    <Option key={m.value} value={m.value}>
                      {m.label}
                    </Option>
                  ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="单选or多选">
            {getFieldDecorator("selectMode", { initialValue: selectMode })(
              <Select placeholder="请选择">
                <Option value="default">单选</Option>
                <Option value="multiple">多选</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item label="rules">
            {getFieldDecorator("rules", { initialValue: rules })(
              <Select placeholder="请选择" mode="multiple">
                {ALL_RULES.map((rule) => (
                  <Option key={rule} value={rule}>
                    {rule}
                  </Option>
                ))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="placeholder">
            {getFieldDecorator("placeholder", { initialValue: placeholder })(
              <Input placeholder="请输入" />
            )}
          </Form.Item>
          <Form.Item label="options">
            {getFieldDecorator("options", { initialValue: options })(
              <TextArea
                rows={attTextAreaRows}
                placeholder="请输入选项信息,例如: 中国,China;日本,Japan;美国,America"
              />
            )}
          </Form.Item>
          <div
            style={{
              textAlign: "left",
              color: "#f55757",
              fontSize: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            * 请以 label,value 的形式输入您的选项，label 和 value
            间请以中文或英文逗号隔开，选项间请以中文或英文分号隔开，例如：key1,value1;key2,value2
          </div>
          <div
            style={{
              textAlign: "left",
              color: "#f55757",
              fontSize: 12,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            * 如果 label,value
            都是相同值，那么可以简单只提供一个值：value1;value2;key,value3
          </div>
        </Form>
      );
    }
  }
);

const Selector: React.FC<PropTypes> = (props) => {
  const { mode, options } = props;
  let _options = parseOptions(options);
  switch (mode) {
    case "stage":
      return <Stage {...props} optionsList={_options} />;
    case "attr":
      return <Attr {...props} optionsList={_options} />;
    default:
      return <Stage {...props} optionsList={_options} />;
  }
};

Selector.defaultProps = {
  name: nanoid(),
  value: "",
  selectMode: "default",
  rules: [],
  label: "标题",
  placeholder: "请选择",
  options: "选项1,option1;选项2,option2;选项3,option3",
  mode: "stage",
};

export default Selector;
