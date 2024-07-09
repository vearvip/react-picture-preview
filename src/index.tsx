import React, { useState } from "react";
import Image, { ImagePreviewType } from "rc-image";
import "rc-image/assets/index.css";
import {
  CloseOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  DownloadOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
// import { createRoot } from "react-dom/client";
import ReactDOM from "react-dom";
import { PreviewGroupPreview } from "rc-image/lib/PreviewGroup";

// 定义组件的 Props 类型
interface PhotoGalleryProps {
  src: string;
  images?: string[];
  onClose?: () => void;
  actions?: {
    rotateLeft?: boolean;
    rotateRight?: boolean;
    zoomIn?: boolean;
    zoomOut?: boolean;
    flipX?: boolean;
    flipY?: boolean;
    download?: boolean;
  };
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  src,
  images,
  onClose,
  actions,
}) => {
  const [visible, setVisible] = useState(true);
  const [current, setCurrent] = useState(
    (images || []).findIndex((image) => image === src) || 0,
  );

  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = src.split("/").pop()!; // 使用图片文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a); // 清理创建的元素
    } catch (error) {
      console.error("下载失败:", error);
    }
  };

  const previewOptions: PreviewGroupPreview = {
    visible,
    current: current,
    onVisibleChange: (visible: boolean) => {
      setVisible(visible);
      if (!visible && onClose) {
        onClose();
      }
    },
    onChange: (current: number) => {
      setCurrent(current);
    },
    icons: {
      close: <CloseOutlined />,
      left: <LeftOutlined />,
      right: <RightOutlined />,
    },
    toolbarRender: (
      _,
      {
        actions: {
          onFlipY,
          onFlipX,
          onRotateLeft,
          onRotateRight,
          onZoomOut,
          onZoomIn,
        },
      },
    ) => {
      let buttons = {
        rotateLeft: <RotateLeftOutlined onClick={onRotateLeft} />,
        rotateRight: <RotateRightOutlined onClick={onRotateRight} />,
        zoomIn: <ZoomInOutlined onClick={onZoomIn} />,
        zoomOut: <ZoomOutOutlined onClick={onZoomOut} />,
        flipX: <SwapOutlined onClick={onFlipX} />,
        flipY: <SwapOutlined rotate={90} onClick={onFlipY} />,
        download: <DownloadOutlined key="download" onClick={handleDownload} />,
      };
      // 过滤
      if (actions) {
        for (const key in actions) {
          if (!actions[key]) {
            delete buttons[key];
          }
        }
      }
      console.log("buttons", buttons);
      return (
        <div
          style={{
            display: "flex",
            color: "#bbb",
            background: "rgba(0, 0, 0, 0.45)",
            borderRadius: "100px",
            padding: "0 20px",
          }}
        >
          {Object.keys(buttons).map((key, index) => (
            <div
              key={key}
              style={{
                padding: "10px",
                cursor: "pointer",
                marginLeft: index === 0 ? 0 : "10px",
                fontSize: "18px",
              }}
            >
              {buttons[key]}
            </div>
          ))}
        </div>
      );
    },
  };

  return images && Array.isArray(images) && images.length > 0 ? (
    <Image.PreviewGroup preview={previewOptions}>
      {images.map((src) => {
        return (
          <Image
            key={src}
            src={src}
            style={{
              display: "none",
            }}
          />
        );
      })}
    </Image.PreviewGroup>
  ) : (
    <Image
      src={src}
      preview={previewOptions as ImagePreviewType}
      style={{
        display: "none",
      }}
    />
  );
};

// 定义 preview 函数的参数类型
interface PreviewOptions {
  src: string;
  images?: string[];
  onClose?: () => void;
  actions?: {
    rotateLeft?: boolean;
    rotateRight?: boolean;
    zoomIn?: boolean;
    zoomOut?: boolean;
    flipX?: boolean;
    flipY?: boolean;
    download?: boolean;
  };
}

export const preview = ({ src, images, onClose, actions }: PreviewOptions) => {
  const photoGalleryContainer = document.createElement("div");
  document.body.appendChild(photoGalleryContainer);
  const photoGallery = (
    <PhotoGallery
      src={src}
      images={images}
      actions={actions}
      onClose={() => {
        if (onClose) onClose();
        setTimeout(() => {
          ReactDOM.unmountComponentAtNode(photoGalleryContainer);
          document.body.removeChild(photoGalleryContainer); // 清理创建的容器
        }, 300); // 退场动画刚好是0.3s
      }}
    />
  );
  ReactDOM.render(photoGallery, photoGalleryContainer);
};
