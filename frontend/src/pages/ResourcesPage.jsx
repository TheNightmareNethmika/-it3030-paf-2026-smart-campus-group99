import React from "react";

const resources = [
  {
    id: 1,
    name: "Lecture Hall A",
    type: "Lecture Hall",
    capacity: 100,
    location: "Block A - Floor 1",
    status: "ACTIVE",
  },
  {
    id: 2,
    name: "Computer Lab 1",
    type: "Lab",
    capacity: 40,
    location: "Block B - Floor 2",
    status: "ACTIVE",
  },
  {
    id: 3,
    name: "Meeting Room 2",
    type: "Meeting Room",
    capacity: 15,
    location: "Admin Building",
    status: "ACTIVE",
  },
  {
    id: 4,
    name: "Projector X120",
    type: "Equipment",
    capacity: 1,
    location: "Media Unit",
    status: "OUT_OF_SERVICE",
  },
];

function ResourcesPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Available Resources</h1>
      <p>Select a resource for booking.</p>

      <div style={{ display: "grid", gap: "16px" }}>
        {resources.map((resource) => (
          <div
            key={resource.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "16px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h3>{resource.name}</h3>
            <p><strong>Type:</strong> {resource.type}</p>
            <p><strong>Capacity:</strong> {resource.capacity}</p>
            <p><strong>Location:</strong> {resource.location}</p>
            <p><strong>Status:</strong> {resource.status}</p>

            <button
              disabled={resource.status !== "ACTIVE"}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: resource.status === "ACTIVE" ? "pointer" : "not-allowed",
                backgroundColor: resource.status === "ACTIVE" ? "#007bff" : "#999",
                color: "white",
              }}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResourcesPage;