import React, { ReactNode } from "react";
import CloseImage from "../../assets/images/closeButton.png";

const IconType = {
  CloseImage: CloseImage
};

export function Button({
  iconType,
  children,
  className
}: {
  iconType?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <button className={className}>
      {iconType ? <img src={iconType} alt={iconType} /> : children}
    </button>
  );
}

Button.iconType = IconType;
