import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createIssue } from "../api/issueApi";

export default function ReportIssuePage() {
  const navigate = useNavigate();
  const roomRequiredLocations = useMemo(
    () => ["Lecture Hall", "Computer Lab", "Classroom", "Staff Room", "Meeting Room"],
    []
  );

  const initialForm = {
    name: "Student User",
    email: "student@sliit.lk",
    title: "",
    category: "",
    priority: "",
    locationType: "",
    building: "",
    roomNumber: "",
    assetId: "",
    contactNumber: "",
    incidentDate: "",
    description: "",
  };

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [selectedImageFiles, setSelectedImageFiles] = useState([]);
  const [fileError, setFileError] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const maxDate = today.toISOString().split("T")[0];

    const minDateObj = new Date();
    minDateObj.setDate(today.getDate() - 30);
    const minDate = minDateObj.toISOString().split("T")[0];

    setForm((prev) => ({
      ...prev,
      incidentDate: prev.incidentDate || maxDate,
    }));

    setDateLimits({ min: minDate, max: maxDate });
  }, []);

  const [dateLimits, setDateLimits] = useState({ min: "", max: "" });

  const isRoomRequired = roomRequiredLocations.includes(form.locationType);

  const roomLabel = isRoomRequired
    ? "Room / Lab Number *"
    : form.locationType === "Corridor / Common Area" ||
      form.locationType === "Washroom" ||
      form.locationType === "Outdoor Area" ||
      form.locationType === "Other"
    ? "Exact Location Reference"
    : "Room / Lab Number";

  const roomPlaceholder = isRoomRequired
    ? "Example: Lab 03 / A-204 / LH-07"
    : form.locationType === "Corridor / Common Area" ||
      form.locationType === "Washroom" ||
      form.locationType === "Outdoor Area" ||
      form.locationType === "Other"
    ? "Add nearby reference"
    : "Enter room, lab, or space reference if available";

  const roomHint = isRoomRequired
    ? "Required for lecture halls, labs, classrooms, staff rooms, and meeting rooms."
    : form.locationType === "Corridor / Common Area" ||
      form.locationType === "Washroom" ||
      form.locationType === "Outdoor Area" ||
      form.locationType === "Other"
    ? "Optional. Helps identify the exact spot within a larger area."
    : "Add the exact space reference when available.";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "locationType" && !roomRequiredLocations.includes(value)
        ? { roomNumber: "" }
        : {}),
    }));
  };

  const handleImageSelection = (e) => {
    setFileError("");
    const newFiles = Array.from(e.target.files || []);

    if (newFiles.length === 0) return;

    const invalidFiles = newFiles.filter((file) => !file.type.startsWith("image/"));
    if (invalidFiles.length > 0) {
      setFileError("Only image files are allowed. Please upload JPG, PNG, WEBP, or GIF files only.");
      e.target.value = "";
      return;
    }

    if (selectedImageFiles.length + newFiles.length > 3) {
      setFileError("You can upload a maximum of 3 images only.");
      e.target.value = "";
      return;
    }

    setSelectedImageFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setSelectedImageFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
    setFileError("");
  };

  const resetForm = () => {
    setForm({
      ...initialForm,
      incidentDate: dateLimits.max || "",
    });
    setErrors({});
    setSuccessMessage("");
    setSelectedImageFiles([]);
    setFileError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setFileError("");

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("priority", form.priority);
    formData.append("locationType", form.locationType);
    formData.append("building", form.building);
    formData.append("roomNumber", form.roomNumber);
    formData.append("assetId", form.assetId);
    formData.append("contactNumber", form.contactNumber.trim() === "" ? "" : form.contactNumber);
    formData.append("incidentDate", form.incidentDate);
    formData.append("description", form.description);

    selectedImageFiles.forEach((file) => {
      formData.append("images", file);
    });

    try {
      const response = await createIssue(formData);
      const createdIssue = response.data;
      navigate(`/issues/${createdIssue.id}`);
    } catch (err) {
      if (err.response?.data && typeof err.response.data === "object") {
        setErrors(err.response.data);
      } else {
        setErrors({ general: "Failed to submit issue." });
      }
    }
  };

  const getImageText = () => {
    const count = selectedImageFiles.length;
    if (count === 0) return "No images selected. You may upload up to 3 images.";
    if (count === 1) return "1 image selected.";
    return `${count} images selected.`;
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        body { background: #f6f7f8; color: #1c1c1c; font-family: Arial, sans-serif; }
        .page-shell { max-width: 1180px; margin: 0 auto; padding: 32px 24px 60px; }
        .report-layout { display: grid; grid-template-columns: 1fr 320px; gap: 24px; align-items: start; }
        .report-main { display: flex; flex-direction: column; gap: 18px; }
        .page-header, .form-card, .side-card, .premium-actions {
          background: #ffffff; border: 1px solid #edeff1; border-radius: 18px;
        }
        .page-header { padding: 28px 30px; }
        .eyebrow {
          display: inline-block; font-size: 13px; font-weight: 700; color: #2563eb;
          text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 10px;
        }
        .page-header h1 { font-size: 36px; line-height: 1.15; color: #111827; margin-bottom: 12px; }
        .page-header p { font-size: 16px; line-height: 1.7; color: #4b5563; max-width: 820px; }
        .form-card { padding: 26px 28px 30px; }
        .section-title { font-size: 21px; font-weight: 700; color: #111827; margin-bottom: 6px; }
        .section-subtitle { font-size: 14px; line-height: 1.6; color: #6b7280; margin-bottom: 22px; }
        .alert { margin-bottom: 16px; padding: 14px 16px; border-radius: 12px; font-size: 14px; font-weight: 600; line-height: 1.6; }
        .alert-error { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
        .alert-success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        form { display: flex; flex-direction: column; gap: 24px; }
        .form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .form-group { display: flex; flex-direction: column; gap: 8px; }
        .full-width { grid-column: 1 / -1; }
        label { font-size: 14px; font-weight: 700; color: #374151; }
        .required { color: #dc2626; margin-left: 3px; }
        input, select, textarea {
          width: 100%; border: 1px solid #d1d5db; border-radius: 12px; background: #ffffff;
          color: #111827; font-size: 15px; padding: 14px 15px; outline: none;
        }
        input:focus, select:focus, textarea:focus {
          border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.10);
        }
        input[readonly] { background: #f3f4f6; color: #4b5563; cursor: not-allowed; }
        textarea { resize: vertical; min-height: 170px; line-height: 1.6; }
        .hint { font-size: 12.5px; color: #6b7280; line-height: 1.5; }
        .upload-box { border: 1.5px dashed #cbd5e1; border-radius: 16px; background: #f9fafb; padding: 20px; }
        .inline-note { margin-top: 10px; font-size: 13px; color: #6b7280; line-height: 1.6; }
        .upload-trigger {
          border: 1px solid #d1d5db; background: #e0dfdf; color: #374151; font-size: 14px;
          font-weight: 600; padding: 10px 16px; border-radius: 999px; cursor: pointer;
        }
        .upload-trigger:disabled { background: #e5e7eb; color: #9ca3af; border-color: #e5e7eb; cursor: not-allowed; }
        .image-preview-container { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; }
        .image-preview-item {
          position: relative; width: 120px; height: 120px; border-radius: 14px; overflow: hidden;
          border: 1px solid #d1d5db; background: #ffffff;
        }
        .image-preview-item img { width: 100%; height: 100%; object-fit: cover; display: block; cursor: zoom-in; }
        .remove-image-btn {
          position: absolute; top: 8px; right: 8px; width: 26px; height: 26px; border: none;
          border-radius: 999px; background: rgba(17, 24, 39, 0.88); color: #ffffff; font-size: 16px; cursor: pointer;
        }
        .file-error, .field-error { font-size: 13px; color: #dc2626; line-height: 1.5; font-weight: 600; }
        .action-row { display: flex; justify-content: flex-end; gap: 12px; padding-top: 4px; }
        .btn {
          border: none; border-radius: 999px; padding: 13px 22px; font-size: 14px;
          font-weight: 700; cursor: pointer;
        }
        .btn-secondary { background: #e5e7eb; color: #111827; }
        .btn-primary { background: #2563eb; color: #ffffff; box-shadow: 0 8px 18px rgba(37, 99, 235, 0.18); }
        .report-side { display: flex; flex-direction: column; gap: 18px; }
        .side-panel { position: sticky; top: 24px; display: flex; flex-direction: column; gap: 18px; }
        .premium-actions {
          background: linear-gradient(145deg, #ffffff 0%, #f8fbff 100%);
          border: 1px solid #e6eef8; border-radius: 22px; padding: 22px 20px;
          box-shadow: 0 18px 30px rgba(15, 23, 42, 0.04);
        }
        .premium-actions h3, .side-card h3 { font-size: 17px; color: #111827; margin-bottom: 14px; }
        .premium-actions p { font-size: 14px; color: #6b7280; line-height: 1.7; margin-bottom: 18px; }
        .action-links { display: flex; flex-direction: column; gap: 12px; }
        .action-link {
          display: flex; align-items: center; justify-content: space-between; gap: 12px; text-decoration: none;
          color: #111827; padding: 14px 16px; border-radius: 16px; background: #ffffff; border: 1px solid #e5e7eb;
        }
        .action-link-title { font-size: 15px; font-weight: 700; color: #111827; }
        .action-link-sub { font-size: 12px; color: #6b7280; margin-top: 3px; }
        .action-arrow { font-size: 18px; color: #94a3b8; flex-shrink: 0; }
        .side-card { padding: 22px 20px; }
        .side-card ul { padding-left: 18px; color: #4b5563; }
        .side-card li { margin-bottom: 10px; line-height: 1.6; font-size: 14px; }
        .status-pill {
          display: inline-block; padding: 6px 10px; font-size: 12px; font-weight: 700;
          border-radius: 999px; background: #dbeafe; color: #1d4ed8; margin-right: 8px; margin-bottom: 8px;
        }
        .image-modal {
          display: flex; position: fixed; z-index: 9999; inset: 0; background: rgba(15, 23, 42, 0.92);
          align-items: center; justify-content: center; padding: 30px;
        }
        .image-modal-content { max-width: 90vw; max-height: 85vh; border-radius: 16px; object-fit: contain; background: #fff; }
        .image-modal-close {
          position: absolute; top: 18px; right: 24px; font-size: 40px; color: #fff; cursor: pointer; border: none; background: transparent;
        }
        @media (max-width: 1024px) {
          .report-layout { grid-template-columns: 1fr; }
          .report-side { order: -1; }
        }
        @media (max-width: 768px) {
          .page-shell { padding: 20px 14px 40px; }
          .page-header { padding: 22px 20px; }
          .page-header h1 { font-size: 29px; }
          .form-card { padding: 22px 18px 24px; }
          .form-grid { grid-template-columns: 1fr; }
          .action-row { flex-direction: column; }
          .btn { width: 100%; }
        }
      `}</style>

      <div className="page-shell">
        <div className="report-layout">
          <main className="report-main">
            <section className="page-header">
              <span className="eyebrow">Support Ticket</span>
              <h1>Report an Issue</h1>
              <p>
                Use this form to report classroom, lab, equipment, or facility-related issues.
                Provide clear details so the support team can assign your request faster and begin
                resolution quickly.
              </p>
            </section>

            <section className="form-card">
              <div className="section-title">Issue Submission Form</div>
              <div className="section-subtitle">
                Fill in the required details below. Your name and email are automatically loaded
                from your logged-in account.
              </div>

              {errors.general && <div className="alert alert-error">{errors.general}</div>}
              {successMessage && <div className="alert alert-success">{successMessage}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-grid">
                  <div className="form-group">
                    <label>Name<span className="required">*</span></label>
                    <input type="text" name="name" value={form.name} readOnly />
                  </div>

                  <div className="form-group">
                    <label>Email<span className="required">*</span></label>
                    <input type="email" name="email" value={form.email} readOnly />
                  </div>

                  <div className="form-group full-width">
                    <label>Issue Title<span className="required">*</span></label>
                    <input
                      type="text"
                      name="title"
                      maxLength="120"
                      placeholder="Example: Projector in Lab 3 is not turning on"
                      value={form.title}
                      onChange={handleChange}
                    />
                    {errors.title && <div className="field-error">{errors.title}</div>}
                  </div>

                  <div className="form-group">
                    <label>Issue Category<span className="required">*</span></label>
                    <select name="category" value={form.category} onChange={handleChange}>
                      <option value="">Select a category</option>
                      <option>Classroom Facilities</option>
                      <option>Laboratory Equipment</option>
                      <option>IT / Network</option>
                      <option>Electrical</option>
                      <option>Furniture</option>
                      <option>Air Conditioning / Ventilation</option>
                      <option>Plumbing / Water</option>
                      <option>Cleanliness / Housekeeping</option>
                      <option>Safety Hazard</option>
                      <option>Other</option>
                    </select>
                    {errors.category && <div className="field-error">{errors.category}</div>}
                  </div>

                  <div className="form-group">
                    <label>Priority<span className="required">*</span></label>
                    <select name="priority" value={form.priority} onChange={handleChange}>
                      <option value="">Select priority</option>
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                    {errors.priority && <div className="field-error">{errors.priority}</div>}
                  </div>

                  <div className="form-group">
                    <label>Location Type<span className="required">*</span></label>
                    <select name="locationType" value={form.locationType} onChange={handleChange}>
                      <option value="">Select location type</option>
                      <option>Lecture Hall</option>
                      <option>Computer Lab</option>
                      <option>Classroom</option>
                      <option>Staff Room</option>
                      <option>Meeting Room</option>
                      <option>Corridor / Common Area</option>
                      <option>Washroom</option>
                      <option>Outdoor Area</option>
                      <option>Other</option>
                    </select>
                    {errors.locationType && <div className="field-error">{errors.locationType}</div>}
                  </div>

                  <div className="form-group">
                    <label>Building / Area<span className="required">*</span></label>
                    <select name="building" value={form.building} onChange={handleChange}>
                      <option value="">Select building or area</option>
                      <option>Main Building</option>
                      <option>Engineering Building</option>
                      <option>Computing Building</option>
                      <option>Library</option>
                      <option>Administration Block</option>
                      <option>Auditorium</option>
                      <option>Student Center</option>
                      <option>Hostel Area</option>
                      <option>Parking Area</option>
                      <option>Other</option>
                    </select>
                    {errors.building && <div className="field-error">{errors.building}</div>}
                  </div>

                  <div className="form-group">
                    <label>{roomLabel}</label>
                    <input
                      type="text"
                      name="roomNumber"
                      placeholder={roomPlaceholder}
                      value={form.roomNumber}
                      onChange={handleChange}
                      required={isRoomRequired}
                    />
                    <div className="hint">{roomHint}</div>
                  </div>

                  <div className="form-group">
                    <label>Equipment ID / Asset Tag</label>
                    <input
                      type="text"
                      name="assetId"
                      placeholder="Example: PC-IT-204, PJ-1102"
                      value={form.assetId}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Preferred Contact Number</label>
                    <input
                      type="tel"
                      name="contactNumber"
                      placeholder="Example: 07XXXXXXXX"
                      value={form.contactNumber}
                      onChange={handleChange}
                    />
                    {errors.contactNumber && <div className="field-error">{errors.contactNumber}</div>}
                  </div>

                  <div className="form-group">
                    <label>Date Observed<span className="required">*</span></label>
                    <input
                      type="date"
                      name="incidentDate"
                      min={dateLimits.min}
                      max={dateLimits.max}
                      value={form.incidentDate}
                      onChange={handleChange}
                    />
                    {errors.incidentDate && <div className="field-error">{errors.incidentDate}</div>}
                  </div>

                  <div className="form-group full-width">
                    <label>Issue Description<span className="required">*</span></label>
                    <textarea
                      name="description"
                      placeholder="Describe the issue clearly. Include what happened, what is not working, when you noticed it, and whether it is affecting classes, labs, or student usage."
                      value={form.description}
                      onChange={handleChange}
                    />
                    <div className="hint">
                      Be specific. A clear description helps technicians resolve the issue faster.
                    </div>
                    {errors.description && <div className="field-error">{errors.description}</div>}
                  </div>

                  <div className="form-group full-width">
                    <label>Upload Images</label>
                    <div className="upload-box">
                      <div className="image-preview-container">
                        {selectedImageFiles.map((file, index) => (
                          <div className="image-preview-item" key={`${file.name}-${index}`}>
                            <img
                              src={URL.createObjectURL(file)}
                              alt="Selected preview"
                              onClick={() => setPreviewImage(URL.createObjectURL(file))}
                            />
                            <button
                              type="button"
                              className="remove-image-btn"
                              onClick={() => removeImage(index)}
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={handleImageSelection}
                      />

                      <button
                        type="button"
                        className="upload-trigger"
                        disabled={selectedImageFiles.length >= 3}
                        onClick={() => fileInputRef.current?.click()}
                      >
                        {selectedImageFiles.length >= 3 ? "Maximum Reached" : "Choose Images"}
                      </button>

                      <div className="inline-note">{getImageText()}</div>
                      <div className="inline-note">
                        Supported files: JPG, PNG, WEBP, GIF. Screenshots or photos of the issue are helpful.
                      </div>

                      {fileError && <div className="file-error">{fileError}</div>}
                    </div>
                  </div>
                </div>

                <div className="action-row">
                  <button type="button" className="btn btn-secondary" onClick={resetForm}>
                    Clear Form
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Issue Report
                  </button>
                </div>
              </form>
            </section>
          </main>

          <aside className="report-side">
            <div className="side-panel">
              <section className="premium-actions">
                <h3>Support Guide</h3>
                <p>Understand how your issue moves through the system and navigate quickly.</p>

                <div className="action-links">
                  <Link to="/" className="action-link">
                    <div>
                      <div className="action-link-title">Help Centre</div>
                      <div className="action-link-sub">Return to support home</div>
                    </div>
                    <div className="action-arrow">→</div>
                  </Link>

                  <Link to="/my-reports" className="action-link">
                    <div>
                      <div className="action-link-title">My Reports</div>
                      <div className="action-link-sub">Track your submitted issues</div>
                    </div>
                    <div className="action-arrow">→</div>
                  </Link>

                  <Link to="/featured" className="action-link">
                    <div>
                      <div className="action-link-title">Featured Discussions</div>
                      <div className="action-link-sub">See common issues & solutions</div>
                    </div>
                    <div className="action-arrow">→</div>
                  </Link>
                </div>
              </section>

              <section className="side-card">
                <h3>What happens next?</h3>
                <ul>
                  <li>Your issue is logged into the maintenance ticket system.</li>
                  <li>The support team reviews the location, category, and severity.</li>
                  <li>The issue moves through stages like Open, In Progress, Resolved, and Closed.</li>
                </ul>
              </section>

              <section className="side-card">
                <h3>Ticket Stages</h3>
                <span className="status-pill">Open</span>
                <span className="status-pill">In Progress</span>
                <span className="status-pill">Resolved</span>
                <span className="status-pill">Closed</span>
              </section>

              <section className="side-card">
                <h3>Helpful tips</h3>
                <ul>
                  <li>Use the exact room or lab reference.</li>
                  <li>Include the equipment ID when available.</li>
                  <li>Upload a clear photo when the problem is visible.</li>
                  <li>Set high or urgent priority only for serious disruption or safety risk.</li>
                </ul>
              </section>
            </div>
          </aside>
        </div>
      </div>

      {previewImage && (
        <div className="image-modal" onClick={() => setPreviewImage("")}>
          <button className="image-modal-close" onClick={() => setPreviewImage("")}>
            &times;
          </button>
          <img
            className="image-modal-content"
            src={previewImage}
            alt="Preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}