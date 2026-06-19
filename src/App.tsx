import { useState } from "react";
import { TabNavigation } from "./components/TabNavigation";
import { CertificateCreator } from "./components/CertificateCreator";
import { SettingsPanel } from "./components/SettingsPanel";
import "./App.css";

type Tab = "certificates" | "settings";

export interface StudentData {
  imagePath: string;
  name: string;
  achievement: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("certificates");
  const [students, setStudents] = useState<StudentData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [imageOffsets, setImageOffsets] = useState({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0
  });

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportSuccess, setExportSuccess] = useState(false);
  
  const [schoolName, setSchoolName] = useState("Trường Tiểu Học Bình Minh");
  const [className, setClassName] = useState("Lớp 5A");
  const [principalName, setPrincipalName] = useState("Nguyễn Văn A");
  const [location, setLocation] = useState("Hà Nội");

  const [noGradeCommon, setNoGradeCommon] = useState(false);
  const [noGradeTextCommon, setNoGradeTextCommon] = useState("Chúc mừng hoàn thành chương trình tiểu học");

  const [licenseKey, setLicenseKey] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("Premium (Hạn dùng: Vĩnh viễn)");

  const formatStudentName = (fileName: string) => {
    return fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  const handleSelectFolder = () => {
    const images = [
      "Nguyen Van A.jpg",
      "Tran Thi B.jpg",
      "Le Van C.jpg",
      "Pham Minh D.jpg",
      "Hoang Anh E.jpg"
    ];
    const initialStudents = images.map(img => ({
      imagePath: img,
      name: formatStudentName(img),
      achievement: "Hoàn thành xuất sắc nhiệm vụ học tập"
    }));
    setStudents(initialStudents);
    setCurrentIndex(0);
    setImageOffsets({ x: 0, y: 0, scale: 1, rotation: 0 });
    setExportSuccess(false);
  };

  const handleSelectFiles = () => {
    const images = [
      "Nguyen Van A.jpg",
      "Tran Thi B.jpg"
    ];
    const initialStudents = images.map(img => ({
      imagePath: img,
      name: formatStudentName(img),
      achievement: "Hoàn thành xuất sắc nhiệm vụ học tập"
    }));
    setStudents(initialStudents);
    setCurrentIndex(0);
    setImageOffsets({ x: 0, y: 0, scale: 1, rotation: 0 });
    setExportSuccess(false);
  };

  const handleClearImages = () => {
    setStudents([]);
    setCurrentIndex(0);
    setExportSuccess(false);
  };

  const handleNext = () => {
    if (currentIndex < students.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const adjustOffset = (direction: "up" | "down" | "left" | "right") => {
    setImageOffsets(prev => {
      switch (direction) {
        case "up": return { ...prev, y: prev.y - 5 };
        case "down": return { ...prev, y: prev.y + 5 };
        case "left": return { ...prev, x: prev.x - 5 };
        case "right": return { ...prev, x: prev.x + 5 };
      }
    });
  };

  const adjustZoom = (type: "in" | "out") => {
    setImageOffsets(prev => {
      const delta = type === "in" ? 0.1 : -0.1;
      return { ...prev, scale: Math.max(0.5, Math.min(3, prev.scale + delta)) };
    });
  };

  const adjustRotation = () => {
    setImageOffsets(prev => ({ ...prev, rotation: (prev.rotation + 90) % 360 }));
  };

  const handleExportPDF = () => {
    if (students.length === 0) return;
    setIsExporting(true);
    setExportProgress(0);
    setExportSuccess(false);

    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsExporting(false);
          setExportSuccess(true);
          return 100;
        }
        return prev + 20;
      });
    }, 400);
  };

  const handleActivateLicense = () => {
    if (licenseKey.trim() !== "") {
      setLicenseStatus("Premium (Đã kích hoạt thành công)");
      setLicenseKey("");
    }
  };

  const updateStudentData = (index: number, updatedFields: Partial<StudentData>) => {
    setStudents(prev => prev.map((s, idx) => idx === index ? { ...s, ...updatedFields } : s));
  };

  return (
    <div className="app-layout">
      {/* SIDEBAR YOUTUBE STUDIO STYLE */}
      <aside className="sidebar-yts">
        <div className="sidebar-profile">
          <div className="sidebar-avatar">
            GV
          </div>
          <div className="sidebar-profile-name">Thầy/Cô Giáo</div>
          <div className="sidebar-profile-role">{schoolName || "Trường Tiểu Học"}</div>
        </div>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="sidebar-footer">
          <span>Phiên bản v0.0.0</span>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="main-yts">
        {/* HEADER YOUTUBE STUDIO STYLE */}
        <header className="header-yts">
          <div className="header-title">
            {activeTab === "certificates" ? "Tạo Giấy Khen Học Sinh" : "Cấu Hình & Bản Quyền"}
          </div>
          <div className="header-right">
            <div className="license-info">
              <span>Bản quyền: {licenseStatus}</span>
            </div>
          </div>
        </header>

        {/* WORKSPACE CONTENT AREA */}
        <div className="content-yts">
          {activeTab === "certificates" ? (
            <CertificateCreator
              students={students}
              currentIndex={currentIndex}
              imageOffsets={imageOffsets}
              isExporting={isExporting}
              exportProgress={exportProgress}
              exportSuccess={exportSuccess}
              schoolName={schoolName}
              setSchoolName={setSchoolName}
              classNameVal={className}
              setClassNameVal={setClassName}
              noGradeCommon={noGradeCommon}
              setNoGradeCommon={setNoGradeCommon}
              noGradeTextCommon={noGradeTextCommon}
              setNoGradeTextCommon={setNoGradeTextCommon}
              handleSelectFolder={handleSelectFolder}
              handleSelectFiles={handleSelectFiles}
              handleClearImages={handleClearImages}
              handleNext={handleNext}
              handlePrev={handlePrev}
              adjustOffset={adjustOffset}
              adjustZoom={adjustZoom}
              adjustRotation={adjustRotation}
              handleExportPDF={handleExportPDF}
              updateStudentData={updateStudentData}
            />
          ) : (
            <SettingsPanel
              schoolName={schoolName}
              setSchoolName={setSchoolName}
              principalName={principalName}
              setPrincipalName={setPrincipalName}
              location={location}
              setLocation={setLocation}
              licenseKey={licenseKey}
              setLicenseKey={setLicenseKey}
              handleActivateLicense={handleActivateLicense}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
export type { Tab };
