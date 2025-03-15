import { toast } from "react-toastify";

// ✅ Success Toast
export const handelSucees = (msg) => {
  toast.success(msg, {
    position: "top-right",
    icon: "✅", // Custom success icon
    style: {
      backgroundColor: "#4BB543", // Green background
      color: "white", // White text
      padding: "12px 16px", // Padding
      borderRadius: "8px", // Rounded corners
      fontWeight: "bold", // Bold text
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Soft shadow
      fontSize: "14px", // Text size
    },
    autoClose: 3000, // Auto close after 3 sec
    hideProgressBar: false, // Show progress bar
    closeOnClick: true, // Close when clicked
    pauseOnHover: true, // Pause when hover
    draggable: true, // Draggable
    progress: undefined,
  });
};

// ✅ Error Toast
export const handelerror = (msg) => {
  toast.error(msg, {
    position: "top-left",
    icon: "❌", // Custom error icon
    style: {
      backgroundColor: "#D8000C", // Red background
      color: "white", // White text
      padding: "12px 16px", // Padding
      borderRadius: "8px", // Rounded corners
      fontWeight: "bold", // Bold text
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)", // Soft shadow
      fontSize: "14px", // Text size
    },
    autoClose: 4000, // Auto close after 4 sec
    hideProgressBar: false, // Show progress bar
    closeOnClick: true, // Close when clicked
    pauseOnHover: true, // Pause when hover
    draggable: true, // Draggable
    progress: undefined,
  });
};
