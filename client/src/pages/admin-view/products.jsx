import { useState } from "react";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormControls } from "@/config";
import ProductImageUpload from "@/components/admin-view/imageupload";

// Initial form data state
const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openAddProductForm, setOpenAddProductForm] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({}); // Add error state
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imgLoadingState, setImgLoadingState] = useState(false);

  // Validate stock and prices on submit
  const validateForm = () => {
    const newErrors = {};

    // Validate price and stock fields
    if (!formData.price || formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.salePrice && formData.salePrice < 0) {
      newErrors.salePrice = "Sale Price cannot be negative";
    }
    if (!formData.totalStock || formData.totalStock <= 0) {
      newErrors.totalStock = "Stock must be greater than 0";
    }

    // Return errors if any
    return newErrors;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Perform validation
    const formErrors = validateForm();

    if (Object.keys(formErrors).length === 0) {
      // If no errors, process the form
      console.log("Form submitted successfully!", formData);
    } else {
      // If errors, set errors to state
      setErrors(formErrors);
    }
  };

  return (
    <>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenAddProductForm(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4"></div>
      <Sheet
        open={openAddProductForm}
        onOpenChange={() => setOpenAddProductForm(false)}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader className="border-b py-2">
            <SheetTitle>Add New Product</SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImgLoadingState={setImgLoadingState}
          />
          <div className="py-4">
            <CommonForm
              formControls={addProductFormControls}
              formData={formData}
              setFormData={setFormData}
              buttonText="Add"
              onSubmit={onSubmit}
            />
            {/* Display validation errors below the form */}
            {errors.price && <p className="text-red-500">{errors.price}</p>}
            {errors.salePrice && (
              <p className="text-red-500">{errors.salePrice}</p>
            )}
            {errors.totalStock && (
              <p className="text-red-500">{errors.totalStock}</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default AdminProducts;
