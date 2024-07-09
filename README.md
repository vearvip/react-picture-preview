# @vearvip/react-picture-preview

`@vearvip/react-picture-preview` 是一个基于 `React` 和 `rc-image` 的图片预览组件，具备图片旋转、翻转、缩放和下载等功能。

演示：
[Demo](https://rpktvx.csb.app/)

## 安装

使用 npm 安装：

```bash
npm install @vearvip/react-picture-preview
```

或使用 yarn 安装：

```bash
yarn add @vearvip/react-picture-preview
```

## 使用方法

### 导入组件

```jsx 
import { preview } from '@vearvip/react-picture-preview';
```

### 使用示例

```jsx
import React from 'react';
import { preview } from '@vearvip/react-picture-preview';

const imageList = [
  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ',
];


const App = () => {
  return (
    <div>
      <div>

        <button
          onClick={() => {
            preview({
              src: imageList[0],
              actions: {
                rotateLeft: false,
                rotateRight: false,
                zoomIn: false,
                zoomOut: false,
                flipX: false,
                flipY: false,
                // download: false
              }
            });
          }}
        >
          查看图片1-单张
        </button>
        <button
          onClick={() => {
            preview({
              src: imageList[1],
            });
          }}
        >
          查看图片2-单张
        </button>
      </div>
      <div>

        <button
          onClick={() => {
            preview({
              src: imageList[0],
              images: imageList
            });
          }}
        >
          查看图片1-多张
        </button>
        <button
          onClick={() => {
            preview({
              src: imageList[1],
              images: imageList
            });
          }}
        >
          查看图片2-多张
        </button>
      </div>
    </div>
  );
};

export default App;
```

## API

### preview(options) 函数参数

`preview` 函数接收一个对象，该对象包含以下属性：

| 属性名    | 类型     | 必填  | 描述                                                                                                                  |
| --------- | -------- | ----- | --------------------------------------------------------------------------------------------------------------------- |
| src       | string   | 是    | 要预览的图片地址。                                                                                                     |
| images    | string[] | 否    | 图片地址数组，如果不提供，则预览单张图片。                                                                               |
| onClose   | function | 否    | 关闭预览时的回调函数。                                                                                                  |
| actions   | object   | 否    | 配置哪些功能按钮是可用的，具体属性详见下表。                                                                               |

### actions 对象属性

`actions` 对象包含以下可选布尔属性，指示对应的功能按钮是否显示（默认都显示）：

| 属性名      | 类型  | 描述                                 |
| ----------- | ----- | ------------------------------------ |
| rotateLeft  | bool  | 是否显示向左旋转按钮                 |
| rotateRight | bool  | 是否显示向右旋转按钮                 |
| zoomIn      | bool  | 是否显示放大按钮                     |
| zoomOut     | bool  | 是否显示缩小按钮                     |
| flipX       | bool  | 是否显示水平翻转按钮                 |
| flipY       | bool  | 是否显示垂直翻转按钮                 |
| download    | bool  | 是否显示下载按钮                     |



## 贡献

欢迎贡献以及反馈问题。请在提交 Pull Request 之前先创建一个 Issue 以便讨论。
