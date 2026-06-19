import { 
  FolderOpen, 
  FileImage, 
  ChevronLeft, 
  ChevronRight, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCw, 
  Printer, 
  CheckCircle2 
} from "lucide-react";

interface ImageOffsets {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface CertificateCreatorProps {
  selectedImages: string[];
  currentIndex: number;
  imageOffsets: ImageOffsets;
  isExporting: boolean;
  exportProgress: number;
  exportSuccess: boolean;
  schoolName: string;
  handleSelectFolder: () => void;
  handleSelectFiles: () => void;
  handleClearImages: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  adjustOffset: (direction: "up" | "down" | "left" | "right") => void;
  adjustZoom: (type: "in" | "out") => void;
  adjustRotation: () => void;
  handleExportPDF: () => void;
  formatStudentName: (fileName: string) => string;
}

export function CertificateCreator({
  selectedImages,
  currentIndex,
  imageOffsets,
  isExporting,
  exportProgress,
  exportSuccess,
  schoolName,
  handleSelectFolder,
  handleSelectFiles,
  handleClearImages,
  handleNext,
  handlePrev,
  adjustOffset,
  adjustZoom,
  adjustRotation,
  handleExportPDF,
  formatStudentName
}: CertificateCreatorProps) {
  return (
    <div className="step-container">
      {/* BƯỚC 1 */}
      <section className="step-card">
        <div className="step-header">
          <div className="step-number">1</div>
          <h2 className="step-title">Chọn ảnh học sinh</h2>
        </div>
        <p className="step-desc">
          Chọn thư mục chứa ảnh chân dung của học sinh trên máy tính, hoặc chọn từng ảnh riêng lẻ. Tên file ảnh nên đặt theo tên học sinh (Ví dụ: Nguyen Van A.jpg).
        </p>
        <div className="button-group">
          <button className="btn btn-primary" onClick={handleSelectFolder}>
            <FolderOpen size={20} />
            <span>Chọn thư mục ảnh</span>
          </button>
          <button className="btn btn-secondary" onClick={handleSelectFiles}>
            <FileImage size={20} />
            <span>Chọn từng file ảnh</span>
          </button>
          {selectedImages.length > 0 && (
            <button className="btn btn-danger" onClick={handleClearImages}>
              <span>Xóa hết chọn lại</span>
            </button>
          )}
        </div>

        <div className={`status-box ${selectedImages.length > 0 ? "active" : ""}`}>
          {selectedImages.length > 0 ? (
            <span>Đã nhận: {selectedImages.length} ảnh học sinh sẵn sàng tạo giấy khen.</span>
          ) : (
            <span style={{ color: "#dc2626" }}>Chưa chọn ảnh nào. Thầy/cô vui lòng chọn ảnh ở nút phía trên.</span>
          )}
        </div>
      </section>

      {/* BƯỚC 2 */}
      <section className="step-card">
        <div className="step-header">
          <div className="step-number">2</div>
          <h2 className="step-title">Chọn mẫu giấy khen</h2>
        </div>
        <p className="step-desc">Chọn mẫu giấy khen của nhà trường để in.</p>
        <div className="template-grid">
          <div className="template-option selected">
            <div className="template-thumbnail">
              <span>GIẤY KHEN</span>
            </div>
            <div className="template-name">Mẫu Học Sinh Giỏi (Mặc định)</div>
          </div>
        </div>
      </section>

      {/* BƯỚC 3 */}
      <section className="step-card">
        <div className="step-header">
          <div className="step-number">3</div>
          <h2 className="step-title">Xem trước & Căn chỉnh ảnh</h2>
        </div>
        <p className="step-desc">
          Xem trước giấy khen của từng em học sinh. Nếu ảnh chân dung bị lệch, hãy bấm các nút mũi tên và phóng to/thu nhỏ bên dưới để ảnh nằm chính giữa khung tròn.
        </p>

        {selectedImages.length > 0 ? (
          <div className="preview-container">
            <div className="preview-nav">
              <button 
                className="btn btn-secondary" 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{ height: "40px", minWidth: "120px", padding: "0 0.75rem" }}
              >
                <ChevronLeft size={18} />
                <span>Ảnh trước</span>
              </button>
              <span>Giấy khen {currentIndex + 1} / {selectedImages.length}</span>
              <button 
                className="btn btn-secondary" 
                onClick={handleNext}
                disabled={currentIndex === selectedImages.length - 1}
                style={{ height: "40px", minWidth: "120px", padding: "0 0.75rem" }}
              >
                <span>Ảnh tiếp</span>
                <ChevronRight size={18} />
              </button>
            </div>

            {/* KHUNG MÔ PHỎNG GIẤY KHEN IN */}
            <div className="certificate-canvas-wrapper" style={{ width: "100%", maxWidth: "600px", padding: "2rem", border: "4px double #d1d5db" }}>
              <div style={{ border: "2px solid #b45309", padding: "1.5rem", position: "relative", minHeight: "350px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fffbeb" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 700, color: "#b45309", letterSpacing: "0.1em" }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#b45309" }}>Độc lập - Tự do - Hạnh phúc</div>
                  <div style={{ width: "80px", height: "1px", backgroundColor: "#b45309", margin: "4px auto" }}></div>
                </div>

                <div style={{ fontSize: "28px", fontWeight: 800, color: "#dc2626", fontFamily: "Georgia, serif", margin: "1rem 0" }}>GIẤY KHEN</div>

                {/* KHUNG TRÒN CHỨA ẢNH HỌC SINH */}
                <div style={{ 
                  width: "120px", 
                  height: "120px", 
                  borderRadius: "50%", 
                  border: "3px solid #b45309", 
                  overflow: "hidden", 
                  position: "relative",
                  backgroundColor: "#e5e7eb"
                }}>
                  <div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#9ca3af",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 700,
                    transform: `translate(-50%, -50%) translate(${imageOffsets.x}px, ${imageOffsets.y}px) scale(${imageOffsets.scale}) rotate(${imageOffsets.rotation}deg)`,
                    transition: "transform 0.1s ease"
                  }}>
                    ẢNH HỌC SINH
                  </div>
                </div>

                <div style={{ textAlign: "center", marginTop: "1rem" }}>
                  <div style={{ fontSize: "12px", color: "#4b5563" }}>{schoolName}</div>
                  <div style={{ fontSize: "14px", color: "#4b5563" }}>Khen tặng em học sinh:</div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#111827", marginTop: "0.25rem" }}>
                    {formatStudentName(selectedImages[currentIndex])}
                  </div>
                </div>
              </div>
            </div>

            {/* BẢNG ĐIỀU CHỈNH CĂN ẢNH BẰNG NÚT BẤM */}
            <div className="adjust-panel">
              <div className="adjust-label">Nút căn chỉnh ảnh học sinh (Bấm để di chuyển hoặc thu phóng):</div>
              <div className="adjust-grid">
                <button className="btn btn-secondary btn-adjust" onClick={() => adjustOffset("up")}>
                  <ArrowUp size={16} />
                  <span>Dịch Lên</span>
                </button>
                <button className="btn btn-secondary btn-adjust" onClick={() => adjustOffset("down")}>
                  <ArrowDown size={16} />
                  <span>Dịch Xuống</span>
                </button>
                <button className="btn btn-secondary btn-adjust" onClick={() => adjustOffset("left")}>
                  <ArrowLeft size={16} />
                  <span>Dịch Trái</span>
                </button>
                <button className="btn btn-secondary btn-adjust" onClick={() => adjustOffset("right")}>
                  <ArrowRight size={16} />
                  <span>Dịch Phải</span>
                </button>
                <button className="btn btn-secondary btn-adjust" onClick={() => adjustZoom("in")}>
                  <ZoomIn size={16} />
                  <span>Phóng To</span>
                </button>
                <button className="btn btn-secondary btn-adjust" onClick={() => adjustZoom("out")}>
                  <ZoomOut size={16} />
                  <span>Thu Nhỏ</span>
                </button>
                <button className="btn btn-secondary btn-adjust" onClick={adjustRotation}>
                  <RotateCw size={16} />
                  <span>Xoay Ảnh</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="status-box" style={{ textAlign: "center", padding: "2rem" }}>
            <span>Vui lòng hoàn thành **Bước 1** để xem trước giấy khen.</span>
          </div>
        )}
      </section>

      {/* BƯỚC 4 */}
      <section className="step-card">
        <div className="step-header">
          <div className="step-number">4</div>
          <h2 className="step-title">Tạo và tải file in PDF</h2>
        </div>
        <p className="step-desc">
          Bấm nút bên dưới để gộp tất cả giấy khen của {selectedImages.length > 0 ? selectedImages.length : "các"} học sinh vào một file PDF để mang đi in.
        </p>

        <button 
          className="btn btn-primary" 
          onClick={handleExportPDF}
          disabled={selectedImages.length === 0 || isExporting}
          style={{ width: "100%", height: "54px", fontSize: "18px" }}
        >
          <Printer size={22} />
          <span>TẠO VÀ TẢI FILE PDF IN GIẤY KHEN</span>
        </button>

        {isExporting && (
          <div className="progress-container">
            <div className="progress-bar-bg">
              <div className="progress-bar-fill" style={{ width: `${exportProgress}%` }}></div>
            </div>
            <div className="progress-text">
              Đang tạo giấy khen cho em {formatStudentName(selectedImages[Math.min(currentIndex, selectedImages.length - 1)])}... ({exportProgress}%)
            </div>
          </div>
        )}

        {exportSuccess && (
          <div className="result-card">
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <CheckCircle2 size={24} />
              <span className="result-title">Đã tạo file PDF thành công!</span>
            </div>
            <p style={{ marginTop: "0.5rem", fontSize: "15px" }}>
              File PDF đã được lưu vào thư mục Tải Về (Downloads) trên máy tính của bạn với tên **"Danh_Sach_Giay_Khen.pdf"**. Bạn có thể mang file này đi in ngay lập tức.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
