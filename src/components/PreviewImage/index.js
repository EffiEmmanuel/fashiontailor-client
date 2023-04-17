import Image from "next/image";
import React, { useState } from "react";

function PreviewImage({ file }) {
  const [preview, setPreview] = useState({});

  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div>
      <Image width={100} height={100} src={preview} alt="Image" className="object-contain max-w-[100px]" />
    </div>
  );
}

export default PreviewImage;
