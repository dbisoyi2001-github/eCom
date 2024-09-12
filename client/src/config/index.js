export const registerFormControls = [
  {
    name: "userName",
    label: "Username",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    required: true,
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
    required: true,
  },
];

export const addProductFormControls = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter product title",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
    required: true,
  },
  {
    name: "category",
    label: "Category",
    placeholder: "Select product category",
    componentType: "select",
    options: [
      { id: 1, label: "Electronics" },
      { id: 2, label: "Clothing" },
      { id: 3, label: "Books" },
      { id: 4, label: "Home Appliances" },
    ],
    required: true,
    add: true,
  },
  {
    name: "brand",
    label: "Brand",
    placeholder: "Select product brand",
    componentType: "select",
    options: [
      { id: 1, label: "Brand A" },
      { id: 2, label: "Brand B" },
      { id: 3, label: "Brand C" },
    ],
    required: true,
    add: true,
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    componentType: "input",
    type: "number",
    required: true,
  },
  {
    name: "salePrice",
    label: "Sale Price",
    placeholder: "Enter sale price (optional)",
    componentType: "input",
    type: "number",
    required: false,
  },
  {
    name: "stock",
    label: "Stock",
    placeholder: "Enter stock quantity",
    componentType: "input",
    type: "number",
    required: true,
  },
];
