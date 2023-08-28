// Show the plugin UI
figma.showUI(__html__, {width: 400, height:400});

figma.ui.onmessage = async msg => {

  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  if (msg.type === 'actionGenerate') {

    // Desctructure the form data object
    const {invoiceTitle, invoiceNumber, invoiceDate, frameDirection} = msg.formDataObj

    // Converting the date from YYYY/MM/DD format to words
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function convertDate(invoiceDate: string) {
      var tempDate = invoiceDate.split("-");
      return tempDate[2] + " " + months[Number(tempDate[1]) - 1] + " " + tempDate[0];
    }

    const title = invoiceTitle
    const date = convertDate(invoiceDate)

    // Create the frame and name it
    const parentFrame = figma.createFrame()

    parentFrame.name = invoiceTitle + " " + invoiceNumber

    parentFrame.layoutMode = frameDirection.toUpperCase() 
    parentFrame.itemSpacing = 8

    parentFrame.primaryAxisSizingMode = 'AUTO'
    parentFrame.counterAxisSizingMode = 'AUTO'

    // Create the text property in Figma
    const titleNode = figma.createText()
    const dateNode = figma.createText()

    // Name the layer
    titleNode.name = title
    dateNode.name = date

    // Generate the input text into the text property in Figma
    titleNode.characters = title.toString()
    dateNode.characters = date.toString()

    // Size the layer
    titleNode.resize(346, 36)

    // Add the generated nodes to the parent frame
    parentFrame.appendChild(titleNode)
    parentFrame.appendChild(dateNode)

    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}