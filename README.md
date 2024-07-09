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

```javascript 
import { preview } from '@vearvip/react-picture-preview';
```

### 使用示例

```javascript
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

```

## API

### preview(options)

打开图片预览组件。

#### 参数

- `options` (Object): 预览选项。
  - `src` (string): 要预览的图片的 URL。
  - `images` (Array<string>): 图片列表，不传的话就是单张查看，传的话，就是可以上下切换（可选）。
  - `onClose` (Function): 图片查看器关闭时的回调函数（可选）。



## 贡献

欢迎贡献以及反馈问题。请在提交 Pull Request 之前先创建一个 Issue 以便讨论。
