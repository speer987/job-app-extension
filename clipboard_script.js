const copyMessageElement = document.getElementById("copyMessage");
const copyContent = async (event) => {
  const link = event.currentTarget.getAttribute("data-link");

  try {
    await navigator.clipboard.writeText(link);
    // Show success message
    copyMessageElement.innerHTML = "Link was copied successfully!";
    copyMessageElement.style.color = "green"; // You can style it to match your design

    // Optionally, hide the message after a few seconds
    setTimeout(() => {
      copyMessageElement.innerHTML = ""; // Clear the message
    }, 2000); // Message disappears after 2 seconds

    console.log("Content copied to clipboard", link);
  } catch (err) {
    copyMessageElement.innerHTML = "Failed to copy content.";
    copyMessageElement.style.color = "red"; // Style for error message

    console.error("Failed to copy: ", err);
  }
};

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", copyContent);
});
