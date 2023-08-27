// Show the plugin UI
figma.showUI(__html__, {width: 400, height:400});

figma.ui.onmessage = msg => {
  if (msg.type === 'actionGenerate') {

    // Desctructure the form data object
    const {invoiceTitle, invoiceNumber, invoiceDate, frameDirection} = msg.formDataObj

    // Create the frame and name it
    const parentFrame = figma.createFrame()

    parentFrame.name = invoiceTitle + " " + invoiceNumber

    parentFrame.layoutMode = frameDirection.toUpperCase() 
    parentFrame.horizontalPadding = 32
    parentFrame.itemSpacing = 8

    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}