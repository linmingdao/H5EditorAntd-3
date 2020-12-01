import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import H5Editor, { renderForm } from "./Editor";
import { Icon } from "antd";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <H5Editor
          tmplPanelWidth={300}
          attrPanelWidth={380}
          stageBgColor="#f3f2f2a3"
          stageActiveColor="#1890ff2b"
          stageDropColor="#1890ff1c"
          className="blink-border"
          attLabelWrapperCol={[7, 17]}
          style={{ width: 1200, height: 700 }}
          enableBuildingsFormSettings={true}
          bricks={{
            icon: <Icon type="build" />,
            loader: (name: string) => () => import(`./Bricks/${name}`),
            getComponents: () => [
              {
                label: "输入框",
                name: "TextInput",
                props: {
                  value: "我是输入框的默认值",
                },
              },
            ],
          }}
          buildings={[
            {
              icon: <Icon type="pie-chart" />,
              title: "模板组件",
              getComponents: () => [
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
          {renderForm((name: string) => () => import(`./Bricks/${name}`), {
            label: "文章模板",
            formSettings: {
              name: "wqVKsHCXQqwP3SCz85rO6",
              colon: "true",
              layout: "horizontal",
              labelAlign: "right",
              labelCol: 6,
              wrapperCol: 18,
            },
            composes: [
              {
                label: "输入框",
                name: "TextInput",
                props: {
                  value: "哈哈哈",
                  name: "jTvPx-pzs-C4m2lin5IrT",
                  label: "哈哈",
                  placeholder: "请输入哈哈哈",
                },
                id: "6-0Kr_z_hEtGkqC2oxAt5",
                type: "bricks",
              },
              {
                label: "输入框",
                name: "TextInput",
                props: {
                  value: "我是输入框的默认值",
                  name: "u8_csOkHw7Ul3xvYF1Vq6",
                },
                id: "mF9Yj5NBZTpXPWkawWKzG",
                type: "bricks",
              },
              {
                label: "输入框",
                name: "TextInput",
                props: {
                  value: "我是输入框的默认值",
                  name: "9Wvf8W70fuK0_WKR3OwMb",
                },
                id: "3Q4WzAHjSk7QAlaWlctaB",
                type: "bricks",
              },
            ],
          })}
        </div>
      </header>
    </div>
  );
};

export default App;
