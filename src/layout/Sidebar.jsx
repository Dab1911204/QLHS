import { Link, useLocation } from "react-router-dom";
import { MdKeyboardArrowDown, MdOutlineCategory } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { useMemo, useState } from "react";
import { useSidebar } from "../contexts/Sidebar/SidebarContext";

const initialMenuItems = [
  { name: "Trang chủ", path: "/", icon: <IoHomeOutline size={15} /> },
  {
    name: "Quản lý hồ sơ",
    icon: <AiOutlineProduct size={15} />,
    path: "/documents"
  },
  {
    name: "Quản lý nhân sự",
    icon: <MdOutlineCategory size={15} />,
    children: [
      { name: "Danh sách nhân sự", path: "/employees" },
      { name: "Chấm công", path: "/employees/add" },
    ],
  },
];

export default function Sidebar() {
  const { isOpen } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  // Lưu lại danh mục cha được click (chỉ một cha khi không có child active theo URL)
  // Cho phép mở nhiều danh mục cha
  const [openMenus, setOpenMenus] = useState(() => {
    const parent = initialMenuItems.find((item) =>
      item.children?.some((c) => c.path === currentPath),
    );
    return parent ? [parent.name] : [];
  });

  // Cha tương ứng với URL hiện tại (nếu có child khớp)
  const parentFromUrl = useMemo(
    () =>
      initialMenuItems.find((item) =>
        item.children?.some((c) => c.path === currentPath),
      ),
    [currentPath],
  );

  const handleClick = (item) => {
    if (!item.children) return;

    const hasActiveChild = item.children.some((c) => c.path === currentPath);
    const isCurrentlyOpen =
      openMenus.includes(item.name) || parentFromUrl?.name === item.name;

    // Toggle mở/đóng, không ảnh hưởng trạng thái active (active chỉ theo child)
    if (isCurrentlyOpen && !hasActiveChild) {
      setOpenMenus((prev) => prev.filter((i) => i !== item.name));
    } else if (!isCurrentlyOpen) {
      setOpenMenus((prev) => [...prev, item.name]);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"} bg-white`}>
      <div className="mb-2 flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <img src="logo_TDS.png" alt="logo" className="mt-4"/>
        </div>
      </div>

      <nav className="mb-6">
        <div className="flex flex-col gap-4">
          <h2 className="ml-1 mb-2 text-sm text-gray-500">
            Menu
          </h2>

          <ul className="text-[14px] font-semibold">
            {initialMenuItems.map((item) => {
              const hasChildren = !!item.children?.length;
              const hasActiveChild = hasChildren
                ? item.children.some((c) => c.path === currentPath)
                : false;

              const isOpenMenu =
                hasChildren &&
                (openMenus.includes(item.name) ||
                  parentFromUrl?.name === item.name ||
                  hasActiveChild);

              const isActive = hasChildren
                ? // Chỉ active cha khi có child khớp URL
                  hasActiveChild
                : // Item không có children -> active khi path khớp URL
                  item.path === currentPath;

              return (
                <li key={item.name}>
                  <div
                    className={`flex items-center ps-3 py-2 cursor-pointer rounded-xl text-gray-800
                      ${
                        isActive
                          ? "active-sidebar-item"
                          : "hover:bg-red-100 hover:text-red-700"
                      }`}
                    onClick={() => handleClick(item)}
                  >
                    {item.icon && <div className="mr-2">{item.icon}</div>}

                    {hasChildren ? (
                      <>
                        <span>{item.name}</span>
                        <MdKeyboardArrowDown
                          className={`ml-auto mr-2 transition-transform ${
                            isOpenMenu ? "rotate-180" : ""
                          }`}
                        />
                      </>
                    ) : (
                      <Link to={item.path} className="w-full">
                        {item.name}
                      </Link>
                    )}
                  </div>

                  {hasChildren && isOpenMenu && (
                    <div className="ml-5 mt-1">
                      {item.children.map((child) => {
                        const childActive = child.path === currentPath;

                        return (
                          <Link
                            key={child.name}
                            to={child.path}
                            className={`flex items-center ps-3 py-2 cursor-pointer rounded-xl text-gray-800
                              ${
                                childActive
                                  ? "active-sidebar-item"
                                  : "hover:bg-red-100 hover:text-red-700"
                              }`}
                          >
                            {child.name}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </aside>
  );
}
