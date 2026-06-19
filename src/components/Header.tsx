interface HeaderProps {
  licenseStatus: string;
}

export function Header({ licenseStatus }: HeaderProps) {
  return (
    <header className="app-header">
      <div>
        <h1 className="app-title">MakeEasy Ed</h1>
        <p className="app-subtitle">Phần mềm tạo và in Giấy Khen tự động dành cho giáo viên</p>
      </div>
      <div className="license-info">
        <span>Trạng thái: {licenseStatus}</span>
      </div>
    </header>
  );
}
