import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    const trimmed = searchTerm.trim();

    if (!trimmed) {
      navigate("/featured");
      return;
    }

    navigate(`/featured?search=${encodeURIComponent(trimmed)}`);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        body {
          background: #ffffff;
          color: #111827;
        }

        .hero {
          width: 100%;
          height: 420px;
          background-image: url('/images/help-bg3.png');
          background-size: cover;
          background-position: 75% center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          padding-left: 120px;
          padding-right: 40px;
          border-bottom: 1px solid #e5e7eb;
        }

        .hero-content {
          max-width: 760px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-content h1 {
          font-size: 62px;
          font-weight: 700;
          line-height: 1.08;
          color: #141726;
          margin-bottom: 22px;
        }

        .hero-content p {
          font-size: 19px;
          line-height: 1.75;
          color: #272c31;
          max-width: 680px;
          margin-bottom: 34px;
        }

        .hero-search-form {
          display: flex;
          align-items: stretch;
          gap: 12px;
          max-width: 700px;
        }

        .hero-search-input-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #d1d5db;
          border-radius: 999px;
          padding: 0 18px;
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.08);
        }

        .hero-search-icon {
          font-size: 18px;
          color: #6b7280;
          margin-right: 10px;
          flex-shrink: 0;
        }

        .hero-search-input {
          flex: 1;
          border: none;
          outline: none;
          background: transparent;
          font-size: 16px;
          color: #111827;
          padding: 16px 0;
        }

        .hero-search-input::placeholder {
          color: #6b7280;
        }

        .hero-search-btn {
          border: none;
          background: #2563eb;
          color: #ffffff;
          font-size: 15px;
          font-weight: 700;
          padding: 0 24px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 10px 24px rgba(37, 99, 235, 0.22);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .hero-search-btn:hover {
          transform: translateY(-1px);
          opacity: 0.96;
        }

        .support-actions {
          padding: 70px 40px 80px;
          background: #f8fafc;
        }

        .support-actions-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .support-actions-header {
          text-align: center;
          margin-bottom: 42px;
        }

        .support-actions-header h2 {
          font-size: 36px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 10px;
        }

        .support-actions-header p {
          font-size: 17px;
          color: #4b5563;
          line-height: 1.6;
        }

        .action-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .action-card {
          background: #ffffff;
          border: 1px solid #e5e7eb;
          border-radius: 18px;
          padding: 34px 28px;
          min-height: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }

        .action-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
          border-color: #d1d5db;
        }

        .action-icon {
          width: 78px;
          height: 78px;
          border-radius: 50%;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }

        .action-icon svg {
          width: 38px;
          height: 38px;
          stroke: #111827;
          stroke-width: 1.8;
          fill: none;
        }

        .action-card h3 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 14px;
        }

        .action-card p {
          font-size: 16px;
          line-height: 1.7;
          color: #4b5563;
          max-width: 280px;
        }

        @media (max-width: 768px) {
          .action-grid {
            grid-template-columns: 1fr;
          }

          .hero-search-form {
                flex-direction: column;
                max-width: 100%;
            }

          .hero-search-btn {
                height: 50px;
            }
        }
      `}</style>

      <section className="hero">
        <div className="hero-content">
          <h1>How Can We Help?</h1>
          <p>
            Report maintenance issues related to university rooms, labs, or equipment.
            Our support team will review and resolve your request as quickly as possible.
          </p>

          <form className="hero-search-form" onSubmit={handleSearch}>
            <div className="hero-search-input-wrap">
              <span className="hero-search-icon">⌕</span>
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search issues, buildings, categories, or locations"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="support-actions">
        <div className="support-actions-container">

          <div className="support-actions-header">
            <h2>Quick Support Actions</h2>
            <p>
              Select an option below to create a request, review your submitted reports,
              or explore common support discussions.
            </p>
          </div>

<div className="action-grid">

  <div className="action-card" onClick={() => navigate("/report")}>
    <div className="action-icon">
      <svg viewBox="0 0 24 24">
        <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h13A1.5 1.5 0 0 1 20 7.5V10a2 2 0 0 0 0 4v2.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 16.5V14a2 2 0 0 0 0-4V7.5z"/>
        <path d="M9 6v12"/>
      </svg>
    </div>
    <h3>Report an Issue</h3>
    <p>
      Create a new support ticket for maintenance problems, damaged equipment,
      or facility-related concerns.
    </p>
  </div>

  <div className="action-card" onClick={() => navigate("/my-reports")}>
    <div className="action-icon">
      <svg viewBox="0 0 24 24">
        <path d="M9 4h6"/>
        <path d="M10 3h4a1 1 0 0 1 1 1v1H9V4a1 1 0 0 1 1-1z"/>
        <path d="M8 5H7a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1"/>
        <path d="M9 10h6"/>
        <path d="M9 14h6"/>
      </svg>
    </div>
    <h3>My Reports</h3>
    <p>
      View previously submitted tickets, track progress,
      and check the status of issues you have already reported.
    </p>
  </div>

  <div className="action-card" onClick={() => navigate("/featured")}>
    <div className="action-icon">
      <svg viewBox="0 0 24 24">
        <path d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7A2.5 2.5 0 0 1 17.5 16H10l-4 4v-4H6.5A2.5 2.5 0 0 1 4 13.5v-7z"/>
        <path d="M8 9h8"/>
        <path d="M8 12h5"/>
      </svg>
    </div>
    <h3>Featured Conversations</h3>
    <p>
      Browse highlighted discussions, useful updates,
      and frequently explored support topics from the help centre.
    </p>
  </div>

</div>
        </div>
      </section>
    </>
  );
}