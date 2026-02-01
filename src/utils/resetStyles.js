function resetStyles(elementId) {
  const element = document.getElementById(elementId);

  if (element) {
    // Revert the styles applied by scrollToElementAndCenter
    element.style.border = ""; // Revert border to default
    element.style.backgroundColor = ""; // Revert background color to default
  } else {
    console.error(`Element with ID "${elementId}" not found for resetting styles.`);
  }
}
