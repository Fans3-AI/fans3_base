import { useState, useRef } from "react";

const UploadImage: React.FC<{
  onChange?: (file: File, url: string) => void;
}> = ({ onChange }) => {
  const [imageUrl, setImageUrl] = useState<string>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        onChange?.(file, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div
      style={{
        width: 80,
        height: 80,
        border: "1px dashed #aaa",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        background: "#222",
      }}
      onClick={handleDivClick}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
        title="select image"
      />
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: 8,
          }}
        />
      ) : (
        <span style={{ color: "#fff", fontSize: "40px", lineHeight: "40px" }}>
          +
        </span>
      )}
    </div>
  );
};
export default UploadImage;
