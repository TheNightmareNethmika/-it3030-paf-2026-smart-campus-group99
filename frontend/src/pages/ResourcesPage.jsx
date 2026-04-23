import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ResourcesPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const resources = [
    {
      id: 101,
      name: "Lecture Hall A",
      type: "Lecture Hall",
      location: "Block A - Floor 1",
      capacity: 120,
      status: "ACTIVE",
    },
    {
      id: 102,
      name: "Computer Lab 3",
      type: "Lab",
      location: "Block B - Floor 2",
      capacity: 40,
      status: "ACTIVE",
    },
    {
      id: 103,
      name: "Meeting Room 2",
      type: "Meeting Room",
      location: "Admin Building",
      capacity: 12,
      status: "ACTIVE",
    },
    {
      id: 104,
      name: "Projector X200",
      type: "Equipment",
      location: "Media Unit",
      capacity: 1,
      status: "OUT_OF_SERVICE",
    },
  ];

  const filteredResources = resources.filter((resource) =>
    resource.name.toLowerCase().includes(search.toLowerCase()) ||
    resource.type.toLowerCase().includes(search.toLowerCase()) ||
    resource.location.toLowerCase().includes(search.toLowerCase())
  );

  const handleBookNow = (resource) => {
    navigate("/booking", {
      state: {
        selectedResource: resource,
      },
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#eef0f3",
        padding: "30px 15px",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          borderRadius: "18px",
          padding: "28px",
          boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
        }}
      >
        <h1 style={{ marginTop: 0 }}>Resources</h1>
        <p style={{ color: "#555", marginBottom: "20px" }}>
          Browse available resources and click Book Now to continue.
        </p>

        <input
          type="text"
          placeholder="Search by name, type, or location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "12px",
            marginBottom: "24px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "15px",
          }}
        />

        <div style={{ display: "grid", gap: "16px" }}>
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "14px",
                padding: "20px",
                backgroundColor: "#fafafa",
              }}
            >
              <h2 style={{ marginTop: 0 }}>{resource.name}</h2>
              <p><strong>Type:</strong> {resource.type}</p>
              <p><strong>Location:</strong> {resource.location}</p>
              <p><strong>Capacity:</strong> {resource.capacity}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  style={{
                    fontWeight: "bold",
                    color: resource.status === "ACTIVE" ? "green" : "red",
                  }}
                >
                  {resource.status}
                </span>
              </p>

              <button
                onClick={() => handleBookNow(resource)}
                disabled={resource.status !== "ACTIVE"}
                style={{
                  marginTop: "10px",
                  padding: "12px 16px",
                  backgroundColor:
                    resource.status === "ACTIVE" ? "#2563eb" : "#9ca3af",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor:
                    resource.status === "ACTIVE" ? "pointer" : "not-allowed",
                }}
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ResourcesPage;