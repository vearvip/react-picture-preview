import { useState } from "react";
import Image from "rc-image";
import "rc-image/assets/index.css";
import {
  CloseOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { createRoot } from "react-dom/client";

/**
 * PhotoGallery组件渲染一个图片查看器。
 *
 * @param {Object} props - 组件的参数
 * @param {string} props.src - 图片的URL
 * @param {Function} [props.onClose] - 图片查看器关闭时的回调函数
 */
const PhotoGallery = ({ src, onClose }) => {
  const [visible, setVisible] = useState(true);

  /**
   * 处理图片的下载功能。
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const handleDownload = async () => {
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = src.split("/").pop(); // 使用图片文件名
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a); // 清理创建的元素
    } catch (error) {
      console.error("下载失败:", error);
    }
  };

  return (
    <Image
      src={src}
      preview={{
        visible,
        onVisibleChange: (visible) => {
          setVisible(visible);
          if (!visible) {
            onClose && onClose();
          }
        },
        icons: {
          close: <CloseOutlined />,
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
          const buttons = {
            rotateLeft: <RotateLeftOutlined onClick={onRotateLeft} />,
            rotateRight: <RotateRightOutlined onClick={onRotateRight} />,
            zoomIn: <ZoomInOutlined onClick={onZoomIn} />,
            zoomOut: <ZoomOutOutlined onClick={onZoomOut} />,
            flipX: <SwapOutlined onClick={onFlipX} />,
            flipY: <SwapOutlined rotate={90} onClick={onFlipY} />,
            download: (
              <DownloadOutlined key="download" onClick={handleDownload} />
            ),
          };
          return (
            <div
              className="rc-image-preview-footer"
              style={{
                position: "fixed",
                zIndex: "1001",
                bottom: "32px",
                left: "0",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                className="rc-image-preview-operations"
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
            </div>
          );
        },
      }}
      style={{
        display: "none",
      }}
    />
  );
};

/**
 * 预览图片函数，显示图片查看器。
 *
 * @param {Object} options - 预览选项
 * @param {string} options.src - 要预览的图片URL
 * @param {Function} [options.onClose] - 图片查看器关闭时的回调函数
 */
export const preview = ({ src, onClose }) => {
  const photoGalleryContainer = document.createElement("div");
  document.body.appendChild(photoGalleryContainer);
  const photoGallery = (
    <PhotoGallery
      src={src}
      onClose={() => {
        onClose && onClose();
        setTimeout(() => {
          root.unmount(photoGalleryContainer);
          document.body.removeChild(photoGalleryContainer); // 清理创建的容器
        }, 300); // 退场动画刚好是0.3s
      }}
    />
  );
  const root = createRoot(photoGalleryContainer);
  root.render(photoGallery);
};
