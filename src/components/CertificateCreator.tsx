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
import { StudentData } from "../App";

interface ImageOffsets {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

interface CertificateCreatorProps {
  students: StudentData[];
  currentIndex: number;
  imageOffsets: ImageOffsets;
  isExporting: boolean;
  exportProgress: number;
  exportSuccess: boolean;
  schoolName: string;
  setSchoolName: (name: string) => void;
  classNameVal: string;
  setClassNameVal: (name: string) => void;
  noGradeCommon: boolean;
  setNoGradeCommon: (val: boolean) => void;
  noGradeTextCommon: string;
  setNoGradeTextCommon: (text: string) => void;
  handleSelectFolder: () => void;
  handleSelectFiles: () => void;
  handleClearImages: () => void;
  handleNext: () => void;
  handlePrev: () => void;
  adjustOffset: (direction: "up" | "down" | "left" | "right") => void;
  adjustZoom: (type: "in" | "out") => void;
  adjustRotation: () => void;
  handleExportPDF: () => void;
  updateStudentData: (index: number, updatedFields: Partial<StudentData>) => void;
}

export function CertificateCreator({
  students,
  currentIndex,
  imageOffsets,
  isExporting,
  exportProgress,
  exportSuccess,
  schoolName,
  setSchoolName,
  classNameVal,
  setClassNameVal,
  noGradeCommon,
  setNoGradeCommon,
  noGradeTextCommon,
  setNoGradeTextCommon,
  handleSelectFolder,
  handleSelectFiles,
  handleClearImages,
  handleNext,
  handlePrev,
  adjustOffset,
  adjustZoom,
  adjustRotation,
  handleExportPDF,
  updateStudentData
}: CertificateCreatorProps) {
  const activeStudent = students[currentIndex];

  return (
    <div className="step-container">
      {/* BƯỚC 1 */}
      <section className="step-card">
        <div className="step-header">
          <div className="step-number">1</div>
          <h2 className="step-title">Chọn ảnh học sinh</h2>
        </div>
        <p className="step-desc">
          Chọn thư mục chứa ảnh chân dung của học sinh trên máy tính, hoặc chọn từng ảnh riêng lẻ. Tên file ảnh nên đặt theo tên học sinh (Ví dụ: Nguyen Van A.jpg) để tự động nhận dạng tên ở bước sau.
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
          {students.length > 0 && (
            <button className="btn btn-danger" onClick={handleClearImages}>
              <span>Xóa hết chọn lại</span>
            </button>
          )}
        </div>

        <div className={`status-box ${students.length > 0 ? "active" : ""}`}>
          {students.length > 0 ? (
            <span>Đã nhận: {students.length} ảnh học sinh sẵn sàng tạo giấy khen.</span>
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
          <h2 className="step-title">Xem trước & Căn chỉnh thông tin học sinh</h2>
        </div>
        <p className="step-desc">
          Thầy/Cô hãy điền thông tin Trường/Lớp chung cho cả lớp, sau đó chỉnh sửa Tên, Học lực hoặc căn chỉnh ảnh cho từng học sinh để giấy khen hiển thị đẹp nhất.
        </p>

        {students.length > 0 && activeStudent ? (
          <div className="preview-container">
            {/* THÔNG TIN CHUNG CHO CẢ LỚP */}
            <div style={{ width: "100%", borderBottom: "1px solid #e5e7eb", paddingBottom: "1.5rem", marginBottom: "1rem" }}>
              <h3 className="adjust-label" style={{ marginBottom: "1rem" }}>Cấu hình chung cho cả lớp:</h3>
              <div className="form-row">
                <div className="form-group-half">
                  <label className="form-label">Tên Trường Học:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={schoolName} 
                    onChange={(e) => setSchoolName(e.target.value)} 
                  />
                </div>
                <div className="form-group-half">
                  <label className="form-label">Tên Lớp Học:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={classNameVal} 
                    onChange={(e) => setClassNameVal(e.target.value)} 
                  />
                </div>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <label className="checkbox-group">
                  <input 
                    type="checkbox" 
                    className="checkbox-input"
                    checked={noGradeCommon} 
                    onChange={(e) => setNoGradeCommon(e.target.checked)} 
                  />
                  <span>Không xét học lực (Áp dụng cho toàn bộ học sinh trong lớp)</span>
                </label>
              </div>

              {noGradeCommon && (
                <div className="form-group" style={{ maxWidth: "100%", marginTop: "1rem" }}>
                  <label className="form-label">Nội dung chúc mừng / Hoàn thành năm học chung:</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Ví dụ: Hoàn thành xuất sắc chương trình tiểu học"
                    value={noGradeTextCommon} 
                    onChange={(e) => setNoGradeTextCommon(e.target.value)} 
                  />
                </div>
              )}
            </div>

            {/* ĐIỀU HƯỚNG DANH SÁCH HỌC SINH */}
            <div className="preview-nav" style={{ width: "100%", justifyContent: "center", marginBottom: "1rem" }}>
              <button 
                className="btn btn-secondary" 
                onClick={handlePrev}
                disabled={currentIndex === 0}
                style={{ height: "40px", minWidth: "120px", padding: "0 0.75rem" }}
              >
                <ChevronLeft size={18} />
                <span>Học sinh trước</span>
              </button>
              <span style={{ fontSize: "16px", fontWeight: 700 }}>
                Học sinh {currentIndex + 1} / {students.length}
              </span>
              <button 
                className="btn btn-secondary" 
                onClick={handleNext}
                disabled={currentIndex === students.length - 1}
                style={{ height: "40px", minWidth: "120px", padding: "0 0.75rem" }}
              >
                <span>Học sinh sau</span>
                <ChevronRight size={18} />
              </button>
            </div>

            <div style={{ display: "flex", gap: "2rem", width: "100%", flexWrap: "wrap" }}>
              {/* KHUNG MÔ PHỎNG GIẤY KHEN IN */}
              <div style={{ flex: 1.2, minWidth: "320px" }}>
                <div className="certificate-canvas-wrapper" style={{ width: "100%", padding: "2rem", border: "4px double #d1d5db" }}>
                  <div style={{ border: "2px solid #b45309", padding: "1.5rem", position: "relative", minHeight: "380px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", backgroundColor: "#fffbeb" }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "12px", fontWeight: 700, color: "#b45309", letterSpacing: "0.1em" }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
                      <div style={{ fontSize: "10px", fontWeight: 700, color: "#b45309" }}>Độc lập - Tự do - Hạnh phúc</div>
                      <div style={{ width: "60px", height: "1px", backgroundColor: "#b45309", margin: "4px auto" }}></div>
                    </div>

                    <div style={{ fontSize: "26px", fontWeight: 800, color: "#dc2626", fontFamily: "Georgia, serif", margin: "0.5rem 0" }}>
                      {noGradeCommon ? "CHỨNG NHẬN" : "GIẤY KHEN"}
                    </div>

                    {/* KHUNG TRÒN CHỨA ẢNH HỌC SINH */}
                    <div style={{ 
                      width: "110px", 
                      height: "110px", 
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

                    <div style={{ textAlign: "center", marginTop: "0.75rem" }}>
                      <div style={{ fontSize: "14px", color: "#111827", fontWeight: 700 }}>
                        {noGradeCommon ? "Chứng nhận em:" : "Khen tặng em học sinh:"}
                      </div>
                      <div style={{ fontSize: "22px", fontWeight: 800, color: "#1d4ed8", marginTop: "0.25rem", fontFamily: "Georgia, serif" }}>
                        {activeStudent.name || "(Chưa nhập tên)"}
                      </div>
                      <div style={{ fontSize: "13px", color: "#4b5563", marginTop: "0.25rem", fontWeight: 600 }}>
                        Học sinh lớp {classNameVal || "(Trống)"} - {schoolName || "(Trống)"}
                      </div>
                      
                      {noGradeCommon ? (
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#15803d", marginTop: "0.5rem" }}>
                          Đã: {noGradeTextCommon || "(Trống)"}
                        </div>
                      ) : (
                        <div style={{ fontSize: "14px", fontWeight: 700, color: "#b45309", marginTop: "0.5rem" }}>
                          Đã đạt danh hiệu: {activeStudent.achievement || "(Trống)"}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* PHẦN ĐIỀN THÔNG TIN CHI TIẾT CHO TỪNG HỌC SINH */}
              <div style={{ flex: 1, minWidth: "300px", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                <h3 className="adjust-label">Thông tin riêng của học sinh:</h3>
                
                <div className="form-group" style={{ maxWidth: "100%" }}>
                  <label className="form-label">Tên Học Sinh (Hiển thị trên giấy khen):</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    value={activeStudent.name} 
                    onChange={(e) => updateStudentData(currentIndex, { name: e.target.value })} 
                  />
                </div>

                {!noGradeCommon ? (
                  <div className="form-group" style={{ maxWidth: "100%" }}>
                    <label className="form-label">Danh hiệu / Thành tích học tập:</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="Ví dụ: Hoàn thành xuất sắc nhiệm vụ học tập"
                      value={activeStudent.achievement} 
                      onChange={(e) => updateStudentData(currentIndex, { achievement: e.target.value })} 
                    />
                  </div>
                ) : (
                  <div style={{ fontSize: "15px", color: "#15803d", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", padding: "1rem", borderRadius: "6px", fontWeight: "600" }}>
                    Lớp đang bật chế độ **"Không xét học lực"**. Giấy khen hiển thị nội dung chúc mừng chung ở mục cấu hình lớp phía trên.
                  </div>
                )}

                <div style={{ fontSize: "14px", color: "#4b5563", fontStyle: "italic", borderLeft: "3px solid #d1d5db", paddingLeft: "0.75rem", marginTop: "0.5rem" }}>
                  Tên file ảnh gốc: {activeStudent.imagePath}
                </div>
              </div>
            </div>

            {/* BẢNG ĐIỀU CHỈNH CĂN ẢNH BẰNG NÚT BẤM */}
            <div className="adjust-panel" style={{ width: "100%" }}>
              <div className="adjust-label">Căn chỉnh vị trí ảnh học sinh (Bấm các nút để nhích ảnh hoặc phóng to/thu nhỏ):</div>
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
          Bấm nút bên dưới để gộp tất cả giấy khen của {students.length > 0 ? students.length : "các"} học sinh vào một file PDF để mang đi in.
        </p>

        <button 
          className="btn btn-primary" 
          onClick={handleExportPDF}
          disabled={students.length === 0 || isExporting}
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
              Đang tạo giấy khen cho học sinh... ({exportProgress}%)
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
