import { Printer, Settings } from "lucide-react";

type Tab = "certificates" | "settings";

interface TabNavigationProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

export function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  return (
    <nav className="app-nav-tabs">
      <button 
        className={`tab-btn ${activeTab === "certificates" ? "active" : ""}`}
        onClick={() => setActiveTab("certificates")}
      >
        <Printer size={20} />
        <span>Tạo Giấy Khen</span>
      </button>
      <button 
        className={`tab-btn ${activeTab === "settings" ? "active" : ""}`}
        onClick={() => setActiveTab("settings")}
      >
        <Settings size={20} />
        <span>Cài Đặt & Bản Quyền</span>
      </button>
    </nav>
  );
}
