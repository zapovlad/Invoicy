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

    // Create the parent frame and name it
    const titleDateFrame = figma.createFrame()
    // titleDateFrame.name = invoiceTitle + " " + invoiceNumber
    titleDateFrame.name = 'Title + Date Container'
    titleDateFrame.layoutMode = verticalFrameDirection.toUpperCase() 
    titleDateFrame.itemSpacing = 8
    titleDateFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    titleDateFrame.primaryAxisSizingMode = 'AUTO'
    titleDateFrame.counterAxisSizingMode = 'AUTO'

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

    // Size the layer
    titleFrame.resize(531, 36)

    // Add the generated nodes to the parent frame
    titleFrame.appendChild(titleNode)
    titleFrame.appendChild(numberNode)
    titleDateFrame.appendChild(titleFrame)
    titleDateFrame.appendChild(dateNode)

    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}