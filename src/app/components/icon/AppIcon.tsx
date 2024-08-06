import Image from "next/image";
import React from "react";

const AppIcon = ({
  isLight = false,
  className = "",
}: {
  isLight?: boolean;
  className?: string;
}) => {
  return (
    <Image
      src={`/app-${isLight ? "light" : "dark"}-icon.png`}
      width={170}
      height={30}
      alt="App Icon"
      className={`${className}`}
    />
  );
};

export default AppIcon;
