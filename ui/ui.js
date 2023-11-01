"use strict";
var _a;
(_a = document.getElementById("addServiceBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    // Get the servicesContainer
    const servicesContainer = document.getElementById("servicesContainer");
    // If servicesContainer is not found, exit the function
    if (!servicesContainer)
        return;
    // Count the existing service fields
    const serviceFields = document.querySelectorAll('.service');
    // Create a new paragraph element
    const p = document.createElement("p");
    p.classList.add("service");
    // Create a label and input ftsor the new service
    const label = document.createElement("label");
    label.setAttribute("for", "service" + (serviceFields.length + 1));
    label.textContent = "Service";
    const input = document.createElement("input");
    input.type = "text";
    input.id = "service" + (serviceFields.length + 1);
    input.name = "services[]";
    // Append the label and input to the paragraph
    p.appendChild(label);
    p.appendChild(input);
    // Append the paragraph to the servicesContainer
    servicesContainer.appendChild(p);
});
