// Show the plugin UI
figma.showUI(__html__, {width: 400, height:716});

figma.ui.onmessage = async msg => {

  await figma.loadFontAsync({ family: 'Inter', style: 'Regular' })

  if (msg.type === 'actionGenerate') {

    try {
      await figma.loadFontAsync({ family: 'Unbounded', style: 'Regular'})
  
    } catch(err) {
      console.error(`Error: ${err}`);
    }

    // Desctructure the form data object

    const {
      invoiceTitle,
      invoiceNumber,
      invoiceDate,
      senderName,
      receiverName
    } = msg.formDataObj;

    const {
      legendSenderLabel,
      legendReceiverLabel
    } = msg;

    function convertDate(invoiceDate: string): string {
      const months: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const [year, month, day] = invoiceDate.split("-");
      return `${months[Number(month) - 1]} ${day}, ${year}`;
  }

  const formattedDate = convertDate(invoiceDate)

    const title = invoiceTitle
    const number = invoiceNumber
    const from = legendSenderLabel
    const sender = senderName
    const to = legendReceiverLabel
    const receiver = receiverName

    // Create the parent frame and name it
    const parentFrame = figma.createFrame()
    parentFrame.name = invoiceTitle + ' ' + invoiceNumber
    parentFrame.layoutMode = 'VERTICAL'
    parentFrame.itemSpacing = 36
    parentFrame.paddingTop = 48
    parentFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    parentFrame.resize(592, 820)
    parentFrame.primaryAxisSizingMode = 'FIXED'
    parentFrame.counterAxisSizingMode = 'FIXED'
    parentFrame.counterAxisAlignItems = 'CENTER'

    // Create the details frame and name it
    const detailsFrame = figma.createFrame()
    detailsFrame.name = 'Details'
    detailsFrame.layoutMode = 'VERTICAL'
    detailsFrame.itemSpacing = 8
    detailsFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    detailsFrame.resize(528, 60)
    detailsFrame.primaryAxisSizingMode = 'AUTO'
    detailsFrame.counterAxisSizingMode = 'FIXED'

    // Create the title frame and name it
    const titleFrame = figma.createFrame()
    titleFrame.name = 'Invoice Title + Number'
    titleFrame.layoutMode = 'HORIZONTAL'
    titleFrame.itemSpacing = 8
    titleFrame.paddingTop = 1
    titleFrame.paddingBottom = 3
    titleFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    titleFrame.primaryAxisSizingMode = 'AUTO'
    titleFrame.counterAxisSizingMode = 'AUTO'
    titleFrame.counterAxisAlignItems = 'CENTER'

    const contactsFrame = figma.createFrame()
    contactsFrame.name = 'Contacts'
    contactsFrame.layoutMode = 'HORIZONTAL'
    contactsFrame.itemSpacing = 24
    contactsFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    contactsFrame.resize(528, 112)
    contactsFrame.primaryAxisSizingMode = 'FIXED'
    contactsFrame.counterAxisSizingMode = 'AUTO'

    const senderNameFrame = figma.createFrame()
    senderNameFrame.name = 'Sender'
    senderNameFrame.layoutMode = 'VERTICAL'
    senderNameFrame.itemSpacing = 8
    senderNameFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    senderNameFrame.resize(252, 44)
    senderNameFrame.primaryAxisSizingMode = 'AUTO'
    senderNameFrame.counterAxisSizingMode = 'FIXED'

    const receiverNameFrame = figma.createFrame()
    receiverNameFrame.name = 'Receiver'
    receiverNameFrame.layoutMode = 'VERTICAL'
    receiverNameFrame.itemSpacing = 8
    receiverNameFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    receiverNameFrame.resize(252, 44)
    receiverNameFrame.primaryAxisSizingMode = 'AUTO'
    receiverNameFrame.counterAxisSizingMode = 'FIXED'

    // Create the title text property in Figma
    const titleNode = figma.createText()
    titleNode.fontName = {family: 'Unbounded', style: 'Regular'}
    titleNode.fontSize = 28
    titleNode.lineHeight = {unit: 'PIXELS', value: 32}
    titleNode.letterSpacing = {unit: 'PERCENT', value: -3}
    titleNode.fills = [{type: 'SOLID', color: {r: 0.145, g: 0.133, b: 0.125}}]

    const numberNode = figma.createText()
    numberNode.fontName = {family: 'Unbounded', style: 'Regular'}
    numberNode.fontSize = 28
    numberNode.lineHeight = {unit: 'PIXELS', value: 32}
    numberNode.letterSpacing = {unit: 'PERCENT', value: -3}
    numberNode.fills = [{type: 'SOLID', color: {r: 0.725, g: 0.714, b: 0.698}}]

    const dateNode = figma.createText()
    dateNode.fontName = { family: 'Inter', style: 'Regular' }
    dateNode.fontSize = 12
    dateNode.lineHeight = {unit: 'PIXELS', value: 16}
    dateNode.letterSpacing = {unit: 'PERCENT', value: -1}
    dateNode.fills = [{type: 'SOLID', color: {r: 0.31, g: 0.302, b: 0.29}}]

    const fromNode = figma.createText()
    fromNode.fontName = { family: 'Inter', style: 'Regular' }
    fromNode.fontSize = 12
    fromNode.lineHeight = {unit: 'PIXELS', value: 16}
    fromNode.letterSpacing = {unit: 'PERCENT', value: -1}
    fromNode.fills = [{type: 'SOLID', color: {r: 0.576, g: 0.561, b: 0.545}}]

    const senderNode = figma.createText()
    senderNode.fontName = {family: 'Unbounded', style: 'Regular'}
    senderNode.fontSize = 16
    senderNode.lineHeight = {unit: 'PIXELS', value: 20}
    senderNode.letterSpacing = {unit: 'PERCENT', value: -2}
    senderNode.fills = [{type: 'SOLID', color: {r: 0.145, g: 0.133, b: 0.125}}]

    const toNode = figma.createText()
    toNode.fontName = { family: 'Inter', style: 'Regular' }
    toNode.fontSize = 12
    toNode.lineHeight = {unit: 'PIXELS', value: 16}
    toNode.letterSpacing = {unit: 'PERCENT', value: -1}
    toNode.fills = [{type: 'SOLID', color: {r: 0.576, g: 0.561, b: 0.545}}]

    const receiverNode = figma.createText()
    receiverNode.fontName = {family: 'Unbounded', style: 'Regular'}
    receiverNode.fontSize = 16
    receiverNode.lineHeight = {unit: 'PIXELS', value: 20}
    receiverNode.letterSpacing = {unit: 'PERCENT', value: -2}
    receiverNode.fills = [{type: 'SOLID', color: {r: 0.145, g: 0.133, b: 0.125}}]

    // Name the layer
    titleNode.name = title
    numberNode.name = number
    dateNode.name = formattedDate
    fromNode.name = legendSenderLabel
    toNode.name = legendReceiverLabel
    senderNode.name = sender
    receiverNode.name = receiver

    // Generate the input text into the text property in Figma
    titleNode.characters = title.toString()
    numberNode.characters = number.toString()
    dateNode.characters = formattedDate.toString()
    fromNode.characters = from.toString()
    toNode.characters = to.toString()
    senderNode.characters = sender.toString()
    receiverNode.characters = receiver.toString()

    // Add the title and number to the title frame
    titleFrame.appendChild(titleNode)
    titleFrame.appendChild(numberNode)

    // Add the title frame to the details frame
    detailsFrame.appendChild(titleFrame)

    // Add the date to the details frame
    detailsFrame.appendChild(dateNode)
    parentFrame.appendChild(detailsFrame)

    senderNameFrame.appendChild(fromNode)
    senderNameFrame.appendChild(senderNode)
    receiverNameFrame.appendChild(toNode)
    receiverNameFrame.appendChild(receiverNode)

    contactsFrame.appendChild(senderNameFrame)
    contactsFrame.appendChild(receiverNameFrame)

    parentFrame.appendChild(contactsFrame)

    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}