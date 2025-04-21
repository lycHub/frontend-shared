import "./index.css";
import { HTMLAttributes, PropsWithChildren } from "react";

function MaskBg({
  className,
  children,
}: PropsWithChildren<Record<string, any> & HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={`mask-bg ${className}`}>{children || "Loading..."}</div>
  );
}

MaskBg.displayName = "MaskBg";
export { MaskBg };
