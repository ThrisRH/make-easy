import { Key } from "lucide-react";

interface SettingsPanelProps {
  schoolName: string;
  setSchoolName: (name: string) => void;
  principalName: string;
  setPrincipalName: (name: string) => void;
  location: string;
  setLocation: (loc: string) => void;
  licenseKey: string;
  setLicenseKey: (key: string) => void;
  handleActivateLicense: () => void;
}

export function SettingsPanel({
  schoolName,
  setSchoolName,
  principalName,
  setPrincipalName,
  location,
  setLocation,
  licenseKey,
  setLicenseKey,
  handleActivateLicense
}: SettingsPanelProps) {
  return (
    <div className="step-card settings-section">
      <div>
        <h2 className="step-title" style={{ marginBottom: "1rem" }}>Cấu hình thông tin mặc định</h2>
        <p className="step-desc">
          Các thông tin này sẽ được lưu lại để tự động điền vào giấy khen mỗi khi tạo, giúp thầy/cô không cần nhập lại nhiều lần.
        </p>
      </div>

      <div className="form-group">
        <label className="form-label">Tên Trường Học:</label>
        <input 
          type="text" 
          className="form-input" 
          value={schoolName} 
          onChange={(e) => setSchoolName(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Tên Hiệu Trưởng / Người Ký:</label>
        <input 
          type="text" 
          className="form-input" 
          value={principalName} 
          onChange={(e) => setPrincipalName(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label className="form-label">Địa phương (Ví dụ: Hà Nội, TP.HCM):</label>
        <input 
          type="text" 
          className="form-input" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
        />
      </div>

      <div className="license-settings" style={{ marginTop: "1.5rem" }}>
        <h3 className="license-title">Kích hoạt bản quyền phần mềm</h3>
        <p className="step-desc" style={{ marginBottom: "1rem" }}>
          Nếu thầy/cô đã mua gói phần mềm, hãy nhập mã bản quyền (License Key) bên dưới để kích hoạt đầy đủ tính năng.
        </p>
        <div className="license-form">
          <input 
            type="text" 
            className="license-input"
            placeholder="Nhập mã bản quyền của bạn..." 
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleActivateLicense} style={{ minWidth: "120px" }}>
            <Key size={18} />
            <span>Kích Hoạt</span>
          </button>
        </div>
      </div>
    </div>
  );
}
