import { UserCog } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, LayoutDashboard, Truck } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <Container />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <Truck />,
  },
];

const MenuItems = ({ setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((item) => (
        <div
          key={item.id}
          className={`flex items-center gap-2 rounded-md px-4 py-2 cursor-pointer text-muted-foreground hover:bg-muted
            ${
              location.pathname === item.path
                ? "font-semibold bg-muted text-black"
                : ""
            }
          `}
          onClick={() => {
            navigate(item.path);
            setOpen ? setOpen(false) : null;
          }}
        >
          {item.icon}
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
};

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet onOpenChange={setOpen} open={open}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b">
              <SheetTitle className="text-xl font-bold flex items-center justify-center mr-8">
                <UserCog /> <span className="ml-2">Admin Panel</span>
                <SheetDescription></SheetDescription>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-8 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <UserCog />
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </>
  );
};

export default AdminSidebar;
