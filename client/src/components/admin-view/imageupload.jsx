import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloud, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImgLoadingState,
}) => {
  const inputRef = useRef(null);

  const handleImageFileChange = (event) => {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const dropedFile = event.dataTransfer.files?.[0];
    if (dropedFile) setImageFile(dropedFile);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const uploadedImageToCloudinary = async () => {
    setImgLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:5000/api/admin/products/upload-image",
      data
    );
    console.log(response.data);
    if (response.data?.success) {
      setUploadedImageUrl(response.data.result.url);
      setImgLoadingState(false);
    }
  };

  useEffect(() => {
    if (imageFile !== null) uploadedImageToCloudinary();
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto">
      <Label className="text-lg my-2 block">Upload Image</Label>
      <div
        className="border-2 border-dashed rounded-lg p-4"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
        />
        {!imageFile ? (
          <label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloud className="w-10 h-10 text-muted-foreground mb-2" />
            <span>drag and drop or click to upload image</span>
          </label>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              varient="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
