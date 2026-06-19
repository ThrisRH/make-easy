import { useState } from "react";
import { Header } from "./components/Header";
import { TabNavigation } from "./components/TabNavigation";
import { CertificateCreator } from "./components/CertificateCreator";
import { SettingsPanel } from "./components/SettingsPanel";
import "./App.css";

type Tab = "certificates" | "settings";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("certificates");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
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
  const [principalName, setPrincipalName] = useState("Nguyễn Văn A");
  const [location, setLocation] = useState("Hà Nội");

  const [licenseKey, setLicenseKey] = useState("");
  const [licenseStatus, setLicenseStatus] = useState("Premium (Hạn dùng: Vĩnh viễn)");

  const handleSelectFolder = () => {
    setSelectedImages([
      "Nguyen Van A.jpg",
      "Tran Thi B.jpg",
      "Le Van C.jpg",
      "Pham Minh D.jpg",
      "Hoang Anh E.jpg"
    ]);
    setCurrentIndex(0);
    setImageOffsets({ x: 0, y: 0, scale: 1, rotation: 0 });
    setExportSuccess(false);
  };

  const handleSelectFiles = () => {
    setSelectedImages([
      "Nguyen Van A.jpg",
      "Tran Thi B.jpg"
    ]);
    setCurrentIndex(0);
    setImageOffsets({ x: 0, y: 0, scale: 1, rotation: 0 });
    setExportSuccess(false);
  };

  const handleClearImages = () => {
    setSelectedImages([]);
    setCurrentIndex(0);
    setExportSuccess(false);
  };

  const handleNext = () => {
    if (currentIndex < selectedImages.length - 1) {
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
    if (selectedImages.length === 0) return;
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

  const formatStudentName = (fileName: string) => {
    return fileName
      .replace(/\.[^/.]+$/, "")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, c => c.toUpperCase());
  };

  return (
    <div className="app-container">
      <Header licenseStatus={licenseStatus} />
      
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {activeTab === "certificates" ? (
        <CertificateCreator
          selectedImages={selectedImages}
          currentIndex={currentIndex}
          imageOffsets={imageOffsets}
          isExporting={isExporting}
          exportProgress={exportProgress}
          exportSuccess={exportSuccess}
          schoolName={schoolName}
          handleSelectFolder={handleSelectFolder}
          handleSelectFiles={handleSelectFiles}
          handleClearImages={handleClearImages}
          handleNext={handleNext}
          handlePrev={handlePrev}
          adjustOffset={adjustOffset}
          adjustZoom={adjustZoom}
          adjustRotation={adjustRotation}
          handleExportPDF={handleExportPDF}
          formatStudentName={formatStudentName}
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
  );
}

export default App;
