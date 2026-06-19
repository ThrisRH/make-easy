import { Printer, Settings } from "lucide-react";

type Tab = "certificates" | "settings";

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <ul className="sidebar-menu">
      <li>
        <button 
          className={`menu-btn ${activeTab === "certificates" ? "active" : ""}`}
          onClick={() => setActiveTab("certificates")}
        >
          <Printer size={22} />
          <span>Tạo Giấy Khen</span>
        </button>
      </li>
      <li>
        <button 
          className={`menu-btn ${activeTab === "settings" ? "active" : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          <Settings size={22} />
          <span>Cài Đặt & Bản Quyền</span>
        </button>
      </li>
    </ul>
  );
}
