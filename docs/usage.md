---
sidebar_label: 用法
---
# Usage
```jsx preview
import { preview } from "@vearvip/react-picture-preview"; 
 

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