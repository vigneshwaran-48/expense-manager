import Image from "next/image";
import React, { useEffect, useState } from "react";
import Spinner from "./loader/Spinner";
import { getImageResource } from "../actions/static";

const SecureImage = ({
  url,
  alt,
  className = "",
}: {
  url: string;
  alt: string;
  className?: string;
}) => {
  const [src, setSrc] = useState<string | ArrayBuffer | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (
      !url.startsWith(process.env.NEXT_PUBLIC_RESOURCE_SERVER_URL as string)
    ) {
      setSrc(url);
      return;
    }
    setLoading(true);
    (async () => {
      const splitted = url.split("/")[5];
      const imageStr = await getImageResource(splitted);
      setSrc(imageStr);
      setLoading(false);
    })();
  }, []);

  return loading ? (
    <Spinner className={className} />
  ) : (
    <Image
      src={src as string}
      alt={alt}
      className={`${className}`}
      width={40}
      height={40}
    />
  );
};

export default SecureImage;
