import { useContext, useState } from "react";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import { useDropzone } from "react-dropzone";
import ChangeUplodeB from "./ChangeUplodeB";
import { CmsContext, EdiContext } from "../context/CmsContext";
import apiUrl from "./ApiConfig";

const ImageResizer = ({ handleImageUpload }) => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const [localAltText, setLocalAltText] = useState(""); // استیت برای ذخیره alt text
  let{setShowImageDiv}=useContext(EdiContext)

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const validExtensions = ["png", "jpg", "jpeg", "webp"];

    if (!validExtensions.includes(file.name.split(".").pop().toLowerCase())) {
      console.error("Invalid file extension");
      return;
    }

    setImage(file);
    setImageUrl(URL.createObjectURL(file));
    ChangeUplodeB(file, handleUploadSuccess, handleUploadError);
  };

  const handleUploadSuccess = (id) => {
    setImageId(id);
  };

  const handleUploadError = () => {
    console.log("Image upload failed");
  };

  const handleSave = () => {
    console.log("Saving image with altText:", localAltText); // بررسی مقدار altText قبل از ارسال
  
    if (image) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
  
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const resizedFile = new File([blob], "resized-image.png", {
                type: "image/png",
              });
  
              ChangeUplodeB(
                resizedFile,
                (id) => {
                  console.log("Image uploaded, calling handleImageUpload...");
                  handleImageUpload(`${apiUrl}/${id}`, localAltText); // ارسال altText
                },
                (error) => {
                  console.error("Failed to upload resized image:", error);
                }
              );
            }
          },
          "image/png"
        );
      };
    }
  };
  

  const { getRootProps, getInputProps } = useDropzone({
    accept: ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    onDrop,
  });

  return (
    <div >
            <i class="fa-regular fa-circle-xmark" onClick={()=>setShowImageDiv(false)} style={{cursor:'pointer' ,marginBottom:'20px'}} ></i>

      <div
      
        {...getRootProps()}
        style={{
          border: "2px dashed gray",
          padding: "20px",
          textAlign: "center",
          cursor:'pointer'
        }}
      >
        
        <input {...getInputProps()} />
        <p>عکس را انتخاب کنید یا به اینجا بکشید</p>
      </div>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <ResizableBox
            width={dimensions.width}
            height={dimensions.height}
            minConstraints={[100, 100]}
            maxConstraints={[600, 600]}
            onResizeStop={(e, data) =>
              setDimensions({
                width: data.size.width,
                height: data.size.height,
              })
            }
          >
            <img
              src={imageUrl}
              alt={localAltText} // استفاده از alt
              style={{ width: "100%", height: "100%" }}
            />
          </ResizableBox>

          {/* Input برای alt text */}
          <input
            type="text"
            value={localAltText}
            onChange={(e) => setLocalAltText(e.target.value)}
            placeholder="متن جایگزین برای تصویر"
            style={{
              display: "block",
              marginTop: "10px",
              width: "100%",
              padding: "5px",
            }}
          />

          <button
            onClick={handleSave}
            style={{
              marginTop: "10px",
              outline: "none",
              border: "1px dotted",
            }}
          >
            ذخیره عکس
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageResizer;
