document.getElementById("addServiceBtn")?.addEventListener("click", function() {
    // Get the servicesContainer
    const servicesContainer = document.getElementById("servicesContainer");

    // If servicesContainer is not found, exit the function
    if (!servicesContainer) return;

    // Count the existing service fields
    const serviceFields: NodeListOf<Element> = document.querySelectorAll('.service');
    
    // Create a new paragraph element
    const p: HTMLParagraphElement = document.createElement("p");
    p.classList.add("service");

    // Create a label and input ftsor the new service
    const label: HTMLLabelElement = document.createElement("label");
    label.setAttribute("for", "service" + (serviceFields.length + 1));
    label.textContent = "Service";

    const input: HTMLInputElement = document.createElement("input");
    input.type = "text";
    input.id = "service" + (serviceFields.length + 1);
    input.name = "services[]";

    // Append the label and input to the paragraph
    p.appendChild(label);
    p.appendChild(input);

    // Append the paragraph to the servicesContainer
    servicesContainer.appendChild(p);
});