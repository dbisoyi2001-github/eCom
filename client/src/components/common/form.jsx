import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"; // Import Dialog components

const CommonForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const [showDialog, setShowDialog] = useState(false); // Manage dialog visibility
  const [newOption, setNewOption] = useState(""); // Manage new category/brand
  const [currentSelectName, setCurrentSelectName] = useState(""); // Track the current select field

  const renderInputs = (getControlItem) => {
    let element = null;

    const value = formData[getControlItem.name] || "";

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            required={getControlItem.required}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <>
            <Select
              value={value}
              onValueChange={(value) => {
                if (value === "add_new") {
                  setCurrentSelectName(getControlItem.name); // Track which select is adding a new option
                  setShowDialog(true); // Open dialog
                } else {
                  setFormData({
                    ...formData,
                    [getControlItem.name]: value,
                  });
                }
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={getControlItem.label}></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {getControlItem.options && getControlItem.options.length > 0
                  ? getControlItem.options.map((optionItem) => (
                      <SelectItem key={optionItem.id} value={optionItem.label}>
                        {optionItem.label}
                      </SelectItem>
                    ))
                  : ""}
                <SelectItem value="add_new">
                  Add New {getControlItem.label}
                </SelectItem>
              </SelectContent>
            </Select>

            {/* Dialog for adding new option */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    Add New{" "}
                    {currentSelectName === "category"
                      ? "Category"
                      : "Brand"} {/* Display based on current select */}
                  </DialogTitle>
                  <DialogDescription>
                    Enter the name of the new{" "}
                    {currentSelectName === "category"
                      ? "Category"
                      : "Brand"}. {/* Display based on current select */}
                  </DialogDescription>
                </DialogHeader>
                <Input
                  placeholder={`Enter new ${
                    currentSelectName === "category" ? "Category" : "Brand"
                  }`}
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                />
                <Button
                  onClick={() => {
                    const newOptionObject = {
                      id: getControlItem.options.length + 1, // Assign a new ID
                      label: newOption,
                    };

                    // Find the control item to update its options
                    formControls.find(
                      (control) => control.name === currentSelectName
                    ).options.push(newOptionObject);

                    // Update formData with the new option
                    setFormData({
                      ...formData,
                      [currentSelectName]: newOptionObject.label,
                    });

                    setShowDialog(false); // Close dialog
                    setNewOption(""); // Reset new option input
                  }}
                >
                  Add{" "}
                  {currentSelectName === "category"
                    ? "Category"
                    : "Brand"} {/* Display based on current select */}
                </Button>
              </DialogContent>
            </Dialog>
          </>
        );
        break;

      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.id}
            required={getControlItem.required}
            value={value}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            required={getControlItem.required}
            onChange={(event) =>
              setFormData({
                ...formData,
                [getControlItem.name]: event.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1">{controlItem.label}</Label>
            {renderInputs(controlItem)}
          </div>
        ))}
      </div>
      <Button className="mt-2 w-full" type="submit">
        {buttonText || "Submit"}
      </Button>
    </form>
  );
};

export default CommonForm;
