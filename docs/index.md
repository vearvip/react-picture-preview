---
sidebar_label: 用法
sidebar_position: 0
---
	

```jsx preview	
import React from "react";	
import { preview } from "@vearvip/react-picture-preview";	

import "rc-image/assets/index.css";	

const imageList = [	
  "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",	
  "https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*ngiJQaLQELEAAAAAAAAAAABkARQnAQ",	
];	

export default () => {	
  return (	
    <>	
      <button	
        onClick={() => {	
          preview({	
            src: imageList[0],	
          });	
        }}	
        style={{	
          marginRight: 10,	
        }}	
      >	
        查看图片1	
      </button>	
      <button	
        onClick={() => {	
          preview({	
            src: imageList[1],	
          });	
        }}	
      >	
        查看图片2	
      </button>	
    </>	
  );	
};	

```	
