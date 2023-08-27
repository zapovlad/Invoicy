// Show the plugin UI
figma.showUI(__html__, {width: 400, height:400});

figma.ui.onmessage = async msg => {

  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  if (msg.type === 'actionGenerate') {

    // Desctructure the form data object
    const {invoiceTitle, invoiceNumber, invoiceDate, frameDirection} = msg.formDataObj

    const title = invoiceTitle

    // Create the frame and name it
    const parentFrame = figma.createFrame()

    parentFrame.name = invoiceTitle + " " + invoiceNumber

    parentFrame.layoutMode = frameDirection.toUpperCase() 
    parentFrame.itemSpacing = 8

    parentFrame.primaryAxisSizingMode = 'FIXED'
    parentFrame.counterAxisSizingMode = 'FIXED'

    // Create the text property in Figma
    const titleNode = figma.createText()

    // Name the layer
    titleNode.name = invoiceTitle

    // Generate the input text into the text property in Figma
    titleNode.characters = title.toString()

    // Size the layer
    titleNode.resize(346, 36)

    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}