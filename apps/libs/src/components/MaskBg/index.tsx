import "./index.css";
import { PropsWithChildren } from "react";
import { NativeProps } from "antd-mobile/es/utils/native-props";

function MaskBg({
  className,
  children,
}: PropsWithChildren<Record<string, any> & NativeProps>) {
  return (
    <div className={`mask-bg ${className}`}>
      {children || 'Loading...'}
    </div>
  );
}

MaskBg.displayName = "MaskBg";
export { MaskBg };
