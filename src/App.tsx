import "./App.css";
import React, { useState } from "react";
import { Icon } from "antd";
import "antd/dist/antd.css";
import { Divider, Button } from "antd";
import { BrickComponents } from "./Bricks";
import H5Editor, { renderFormByRegister } from "./Editor";

const App: React.FC = () => {
  const [composes, setComposes] = useState<any[]>([
    {
      label: "输入框",
      name: "TextInput",
      props: { value: "我是输入框的默认值", name: "Ein-SBXAamJmI6pg6v9mt" },
      id: "FsC-Lw5on51in4f6XVmGX",
      type: "bricks",
    },
    {
      label: "文本域",
      name: "TextArea",
      props: { value: "我是文本域的默认值", name: "ANLinusbI5PlhZzOmosv7" },
      id: "kTZyVpfOsVaf8OZLIjY5i",
      type: "bricks",
    },
    {
      label: "下拉框",
      name: "Selector",
      id: "nQ0iko4mwrhs6uApK5oE-",
      type: "bricks",
      props: { name: "Ozz5c0yq4SND7Gfu7U2VO" },
    },
    {
      label: "单选框",
      name: "RadioGroup",
      id: "igBQPEySM0nezTrb3oDCj",
      type: "bricks",
      props: { name: "vjuxIWq02oAgeaUAhRR-I" },
    },
    {
      label: "复选框",
      name: "CheckboxGroup",
      id: "3Z-D6wdMuKr1E1RExu55H",
      type: "bricks",
      props: { name: "VgV8jyQyTkyD9zUHOp3oX" },
    },
    {
      label: "添加注释",
      name: "Notes",
      id: "1leU3gXr8A7iAaWeMvnY5",
      type: "bricks",
      props: { name: "HWzhzKsQuaHv9ClRFS7RE" },
    },
    {
      label: "日期选择器",
      name: "DateTimeSelect",
      id: "F8IfuGi5ELVjJyLdvA1eV",
      type: "bricks",
      props: { name: "oitTxdgkqAKYvGZYanr8U" },
    },
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <H5Editor
          showTmplMenu={false}
          tmplPanelWidth={380}
          attrPanelWidth={380}
          stageBgColor="#f3f2f2a3"
          stageActiveColor="#1890ff2b"
          stageDropColor="#1890ff1c"
          className="blink-border"
          attLabelWrapperCol={[8, 16]}
          style={{ width: 1500, height: 600 }}
          enableBuildingsFormSettings={false}
          bricks={{
            loader: (name: string) => () =>
              import(`./Bricks/Components/${name}`),
            icon: <Icon type="build" />,
            components: BrickComponents,
          }}
          buildings={[
            {
              title: "模板组件",
              icon: <Icon type="pie-chart" />,
              components: [
                {
                  label: "文章模板",
                  formSettings: {
                    name: "loginForm",
                    colon: "true",
                    layout: "horizontal",
                    labelAlign: "right",
                    labelCol: 6,
                    wrapperCol: 18,
                  },
                  composes: [
                    {
                      label: "标题",
                      name: "TextInput",
                      props: {
                        label: "文章标题",
                        name: "title",
                        value: "H5表单编辑器",
                        placeholder: "请输入",
                      },
                    },
                    {
                      label: "作者",
                      name: "TextInput",
                      props: {
                        label: "文章作者",
                        name: "author",
                        value: "朴朴",
                        placeholder: "请输入",
                      },
                    },
                  ],
                },
              ],
              updateComponents: (composes: any, formSettings: any) => {
                console.log("模板组件");
                console.log(
                  JSON.stringify({ label: "文章模板", formSettings, composes })
                );
                setComposes(composes);
              },
            },
          ]}
        />

        <div
          style={{
            width: 1200,
            backgroundColor: "#fff",
            padding: 40,
            marginTop: 30,
          }}
        >
          {renderFormByRegister(
            composes,
            <>
              <Divider />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Button type="default" title="取消">
                  取消
                </Button>
                <Button
                  title="提交"
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: 10 }}
                >
                  提交
                </Button>
              </div>
            </>
          )}
        </div>
      </header>
    </div>
  );
};

export default App;
