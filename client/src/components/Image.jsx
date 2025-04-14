import { IKImage } from "imagekitio-react";

const Image = ({ src, className, w, h, alt }) => {
  // Check if src is empty
  if (!src) {
    return null;
  }
  
  // Check if src is a local path (starts with /)
  if (src.startsWith('/')) {
    return (
      <img
        src={src}
        className={className}
        alt={alt || "Image"}
        width={w}
        height={h}
        loading="lazy"
      />
    );
  }

return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt || "Image"}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
};

export default Image;
