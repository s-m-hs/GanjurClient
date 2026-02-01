function scrollToElementAndCenter(elementId) {
  const element = document.getElementById(elementId);

  if (element) {
    // Scroll to the element and center it vertically
    element.scrollIntoView({
      behavior: "smooth", // Optional: for smooth scrolling
      block: "center", // Centers the element vertically
    });

    // Change the element's style (example: add a border and change background)
    element.style.border = "2px solid red";
    element.style.backgroundColor = "yellow";

    // You can add a timeout to revert the style after a few seconds if needed
    // setTimeout(() => {
    //   element.style.border = ''; // Revert border
    //   element.style.backgroundColor = ''; // Revert background
    // }, 3000); // Revert after 3 seconds
  } else {
    console.error(`Element with ID "${elementId}" not found.`);
  }
}

// Example usage (assuming you have an element with the ID 'myElement'):
// scrollToElementAndCenter('myElement');
export default scrollToElementAndCenter;
