import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Award, 
  BookOpen, 
  CreditCard, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Moon, 
  Zap, 
  Users, 
  Sparkles,
  Plus
} from "lucide-react";
import "./App.css";

type Tab = "dashboard" | "certificates" | "classes" | "subscription";
type Theme = "light" | "dark";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<Theme>("dark");
  const [licenseKey, setLicenseKey] = useState("");

  const [mockUser] = useState({
    name: "Giáo viên Demo",
    plan: "Premium",
    expiry: "2027-06-19"
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case "dashboard": return "Bảng Điều Khiển";
      case "certificates": return "Tạo Chứng Chỉ";
      case "classes": return "Quản Lý Lớp Học";
      case "subscription": return "Gói Ứng Dụng";
    }
  };

  return (
    <div className="app-container">
      <aside className={`sidebar ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <Sparkles size={24} />
            <span className="brand-name">MakeEasy Ed</span>
          </div>
          <button 
            className="toggle-sidebar-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <ul className="nav-links">
          <li>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
            >
              <LayoutDashboard size={20} />
              <span className="nav-item-text">Bảng Điều Khiển</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("certificates")}
              className={`nav-item ${activeTab === "certificates" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
            >
              <Award size={20} />
              <span className="nav-item-text">Tạo Chứng Chỉ</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("classes")}
              className={`nav-item ${activeTab === "classes" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
            >
              <BookOpen size={20} />
              <span className="nav-item-text">Lớp Học</span>
            </button>
          </li>
          <li>
            <button
              onClick={() => setActiveTab("subscription")}
              className={`nav-item ${activeTab === "subscription" ? "active" : ""}`}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left" }}
            >
              <CreditCard size={20} />
              <span className="nav-item-text">Gói Ứng Dụng</span>
            </button>
          </li>
        </ul>

        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="avatar">
              {mockUser.name.split(" ").map(n => n[0]).join("")}
            </div>
            <div className="user-info">
              <span className="username">{mockUser.name}</span>
              <span className="user-status">{mockUser.plan}</span>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1 className="page-title">{getPageTitle()}</h1>
          <div className="header-actions">
            <div className="license-badge">
              <Zap size={16} />
              <span>Gói: {mockUser.plan}</span>
            </div>
            <button className="theme-toggle-btn" onClick={toggleTheme}>
              {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </header>

        <div className="content-body">
          {activeTab === "dashboard" && (
            <div>
              <div className="dashboard-grid">
                <div className="card">
                  <div className="card-header-flex">
                    <span className="card-title">Tổng số lớp</span>
                    <div className="card-icon-container">
                      <BookOpen size={20} />
                    </div>
                  </div>
                  <div className="card-value">12</div>
                  <div className="card-desc">Lớp học đang quản lý</div>
                </div>

                <div className="card accent-card">
                  <div className="card-header-flex">
                    <span className="card-title">Học sinh</span>
                    <div className="card-icon-container">
                      <Users size={20} />
                    </div>
                  </div>
                  <div className="card-value">450</div>
                  <div className="card-desc">Học sinh trong danh sách</div>
                </div>

                <div className="card">
                  <div className="card-header-flex">
                    <span className="card-title">Chứng chỉ đã tạo</span>
                    <div className="card-icon-container">
                      <Award size={20} />
                    </div>
                  </div>
                  <div className="card-value">1,280</div>
                  <div className="card-desc">Đã xuất bản và lưu trữ</div>
                </div>
              </div>

              <div className="card" style={{ marginBottom: "2rem" }}>
                <div style={{ marginBottom: "1rem" }}>
                  <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>Phím Tắt Nhanh</h3>
                </div>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <button className="btn-primary" onClick={() => setActiveTab("certificates")}>
                    <Plus size={18} />
                    <span>Thiết kế chứng chỉ</span>
                  </button>
                  <button className="btn-primary" onClick={() => setActiveTab("classes")} style={{ background: "linear-gradient(135deg, var(--accent-color), #c084fc)" }}>
                    <Plus size={18} />
                    <span>Thêm lớp mới</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "certificates" && (
            <div className="placeholder-view">
              <Award className="placeholder-icon" size={48} />
              <h2 className="placeholder-title">Trình Thiết Kế Chứng Chỉ</h2>
              <p className="placeholder-text">
                Import hình ảnh học sinh từ thư mục hoặc file riêng lẻ để tự động ghép vào mẫu chứng chỉ có sẵn, crop ảnh tròn và tải về file PDF tổng hợp.
              </p>
              <button className="btn-primary">
                <Plus size={18} />
                <span>Bắt đầu thiết kế</span>
              </button>
            </div>
          )}

          {activeTab === "classes" && (
            <div className="placeholder-view">
              <BookOpen className="placeholder-icon" size={48} />
              <h2 className="placeholder-title">Quản Lý Lớp Học & Học Sinh</h2>
              <p className="placeholder-text">
                Quản lý thông tin lớp, danh sách học sinh và điểm số. Hỗ trợ import/export dữ liệu từ file Excel.
              </p>
              <button className="btn-primary">
                <Plus size={18} />
                <span>Tạo lớp học đầu tiên</span>
              </button>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="card" style={{ maxWidth: "600px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "2rem" }}>
                <Zap size={48} style={{ color: "var(--accent-color)", marginBottom: "1rem" }} />
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Thông Tin Bản Quyền</h2>
                <p style={{ color: "var(--text-muted)" }}>Trạng thái kích hoạt và gói dịch vụ hiện tại</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ padding: "1rem", borderRadius: "12px", backgroundColor: "var(--border-color)", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 500 }}>Gói hiện tại:</span>
                  <span style={{ fontWeight: 700, color: "var(--accent-color)" }}>{mockUser.plan}</span>
                </div>

                <div style={{ padding: "1rem", borderRadius: "12px", backgroundColor: "var(--border-color)", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontWeight: 500 }}>Hạn dùng đến:</span>
                  <span style={{ fontWeight: 600 }}>{mockUser.expiry}</span>
                </div>

                <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "1.5rem" }}>
                  <label style={{ display: "block", fontSize: "0.875rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    KÍCH HOẠT BẢN QUYỀN MỚI
                  </label>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <input 
                      type="text" 
                      placeholder="Nhập mã bản quyền của bạn..." 
                      value={licenseKey}
                      onChange={(e) => setLicenseKey(e.target.value)}
                      style={{
                        flex: 1,
                        padding: "0.75rem 1rem",
                        borderRadius: "12px",
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--bg-app)",
                        color: "var(--text-main)"
                      }}
                    />
                    <button className="btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
                      <span>Kích Hoạt</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
