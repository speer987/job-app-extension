const copyMessageElement = document.getElementById("copyMessage");
const copyContent = async () => {
  try {
    await navigator.clipboard.writeText(
      "https://www.linkedin.com/in/saarah-peer/"
    );
    // Show success message
    copyMessageElement.innerHTML = "Copied!";
    copyMessageElement.style.color = "green"; // You can style it to match your design

    // Optionally, hide the message after a few seconds
    setTimeout(() => {
      copyMessageElement.innerHTML = ""; // Clear the message
    }, 2000); // Message disappears after 2 seconds

    console.log("Content copied to clipboard");
  } catch (err) {
    copyMessageElement.innerHTML = "Failed to copy content.";
    copyMessageElement.style.color = "red"; // Style for error message

    console.error("Failed to copy: ", err);
  }
};

document.querySelector(".btn").addEventListener("click", copyContent);
