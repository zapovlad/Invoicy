// Show the plugin UI
figma.showUI(__html__, {width: 400, height:716});

figma.ui.onmessage = async msg => {

  await figma.loadFontAsync({ family: "Inter", style: "Regular" })

  if (msg.type === 'actionGenerate') {

    try {
      await figma.loadFontAsync({ family: 'Unbounded', style: 'Regular'})
  
    } catch(err) {
      console.error(`Error: ${err}`);
    }

    // Desctructure the form data object
    const {invoiceTitle, invoiceNumber, invoiceDate, horizontalFrameDirection, verticalFrameDirection} = msg.formDataObj

    // Converting the date from YYYY/MM/DD format to words
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    function convertDate(invoiceDate: string) {
      var tempDate = invoiceDate.split("-");
      return months[Number(tempDate[1]) - 1] + " " + tempDate[2] + ", " + tempDate[0];
    }

    const title = invoiceTitle
    const number = invoiceNumber
    const date = convertDate(invoiceDate)

    // Create the title frame and name it
    const titleFrame = figma.createFrame()
    titleFrame.name = "Invoice Title + Number"
    titleFrame.layoutMode = horizontalFrameDirection.toUpperCase() 
    titleFrame.itemSpacing = 8
    titleFrame.paddingTop = 1
    titleFrame.paddingBottom = 3
    titleFrame.fills = [{type : "SOLID", color: {r: 0.973, g: 0.965, b: 0.945}}]
    titleFrame.primaryAxisSizingMode = 'AUTO'
    titleFrame.counterAxisSizingMode = 'AUTO'
    titleFrame.counterAxisAlignItems = 'CENTER'

    // Create the details frame and name it
    const detailsFrame = figma.createFrame()
    detailsFrame.name = 'Details'
    detailsFrame.layoutMode = verticalFrameDirection.toUpperCase() 
    detailsFrame.itemSpacing = 8
    detailsFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    detailsFrame.primaryAxisSizingMode = 'AUTO'
    detailsFrame.counterAxisSizingMode = 'AUTO'

    const parentFrame = figma.createFrame()
    parentFrame.name = invoiceTitle + " " + invoiceNumber
    parentFrame.layoutMode = 'VERTICAL'
    parentFrame.itemSpacing = 36
    parentFrame.paddingTop = 48
    parentFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    parentFrame.primaryAxisSizingMode = 'AUTO'
    parentFrame.counterAxisSizingMode = 'AUTO'
    parentFrame.counterAxisAlignItems = 'CENTER'

    // Create the title text property in Figma
    const titleNode = figma.createText()
    titleNode.fontName = {family: 'Unbounded', style: 'Regular'}
    titleNode.fontSize = 28
    titleNode.lineHeight = {unit: 'PIXELS', value: 32}
    titleNode.letterSpacing = {unit: 'PERCENT', value: -3}
    titleNode.fills = [{type : 'SOLID', color: {r: 0.145, g: 0.133, b: 0.125}}]

    const numberNode = figma.createText()
    numberNode.fontName = {family: 'Unbounded', style: 'Regular'}
    numberNode.fontSize = 28
    numberNode.lineHeight = {unit: 'PIXELS', value: 32}
    numberNode.letterSpacing = {unit: 'PERCENT', value: -3}
    numberNode.fills = [{type : 'SOLID', color: {r: 0.725, g: 0.714, b: 0.698}}]

    const dateNode = figma.createText()
    dateNode.fontName = { family: 'Inter', style: 'Regular' }
    dateNode.fontSize = 12
    dateNode.lineHeight = {unit: 'PIXELS', value: 16}
    dateNode.letterSpacing = {unit: 'PERCENT', value: -1}
    dateNode.fills = [{type : 'SOLID', color: {r: 0.31, g: 0.302, b: 0.29}}]

    // Name the layer
    titleNode.name = title
    numberNode.name = number
    dateNode.name = date

    // Generate the input text into the text property in Figma
    titleNode.characters = title.toString()
    numberNode.characters = number.toString()
    dateNode.characters = date.toString()

    // Size the details frame
    detailsFrame.resize(531, 60)
    detailsFrame.layoutAlign = 'STRETCH'
    detailsFrame.primaryAxisSizingMode = 'AUTO'
    detailsFrame.counterAxisSizingMode = 'FIXED'

    // Size the parent frame 
    parentFrame.resize(595, 820)

    // Add the title and number to the title frame
    titleFrame.appendChild(titleNode)
    titleFrame.appendChild(numberNode)

    // Add the title frame to the details frame
    detailsFrame.appendChild(titleFrame)

    // Add the date to the details frame
    detailsFrame.appendChild(dateNode)

    parentFrame.appendChild(detailsFrame)

    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}