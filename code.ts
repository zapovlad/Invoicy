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

    // Create the parent frame and name it
    const parentFrame = figma.createFrame()
    parentFrame.name = invoiceTitle + ' ' + invoiceNumber
    parentFrame.layoutMode = 'VERTICAL'
    parentFrame.itemSpacing = 36
    parentFrame.paddingTop = 48
    parentFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    parentFrame.resize(592, 820)
    parentFrame.primaryAxisSizingMode = 'AUTO'
    parentFrame.counterAxisSizingMode = 'FIXED'
    parentFrame.counterAxisAlignItems = 'CENTER'

    const infoFrame = figma.createFrame()
    infoFrame.name = 'Info'
    infoFrame.layoutMode = 'VERTICAL'
    infoFrame.itemSpacing = 24
    infoFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    infoFrame.primaryAxisSizingMode = 'AUTO'
    infoFrame.counterAxisSizingMode = 'AUTO'

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

    const contactInfoFrame = figma.createFrame()
    contactInfoFrame.name = 'Contacts'
    contactInfoFrame.layoutMode = 'HORIZONTAL'
    contactInfoFrame.itemSpacing = 24
    contactInfoFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    contactInfoFrame.resize(528, 112)
    contactInfoFrame.primaryAxisSizingMode = 'FIXED'
    contactInfoFrame.counterAxisSizingMode = 'AUTO'

    const senderFrame = figma.createFrame()
    senderFrame.name = 'Sender'
    senderFrame.layoutMode = 'VERTICAL'
    senderFrame.itemSpacing = 8
    senderFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    senderFrame.resize(252, 44)
    senderFrame.primaryAxisSizingMode = 'AUTO'
    senderFrame.counterAxisSizingMode = 'FIXED'

    const receiverFrame = figma.createFrame()
    receiverFrame.name = 'Receiver'
    receiverFrame.layoutMode = 'VERTICAL'
    receiverFrame.itemSpacing = 8
    receiverFrame.fills = [{type : 'SOLID', color: {r: 0.973, g: 0.965, b: 0.945}}]
    receiverFrame.resize(252, 44)
    receiverFrame.primaryAxisSizingMode = 'AUTO'
    receiverFrame.counterAxisSizingMode = 'FIXED'

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

    const senderLabelNode = figma.createText()
    senderLabelNode.fontName = { family: 'Inter', style: 'Regular' }
    senderLabelNode.fontSize = 12
    senderLabelNode.lineHeight = {unit: 'PIXELS', value: 16}
    senderLabelNode.letterSpacing = {unit: 'PERCENT', value: -1}
    senderLabelNode.fills = [{type: 'SOLID', color: {r: 0.576, g: 0.561, b: 0.545}}]

    const senderNameNode = figma.createText()
    senderNameNode.fontName = {family: 'Unbounded', style: 'Regular'}
    senderNameNode.fontSize = 16
    senderNameNode.lineHeight = {unit: 'PIXELS', value: 20}
    senderNameNode.letterSpacing = {unit: 'PERCENT', value: -2}
    senderNameNode.fills = [{type: 'SOLID', color: {r: 0.145, g: 0.133, b: 0.125}}]

    const receiverLabelNode = figma.createText()
    receiverLabelNode.fontName = { family: 'Inter', style: 'Regular' }
    receiverLabelNode.fontSize = 12
    receiverLabelNode.lineHeight = {unit: 'PIXELS', value: 16}
    receiverLabelNode.letterSpacing = {unit: 'PERCENT', value: -1}
    receiverLabelNode.fills = [{type: 'SOLID', color: {r: 0.576, g: 0.561, b: 0.545}}]

    const receiverNameNode = figma.createText()
    receiverNameNode.fontName = {family: 'Unbounded', style: 'Regular'}
    receiverNameNode.fontSize = 16
    receiverNameNode.lineHeight = {unit: 'PIXELS', value: 20}
    receiverNameNode.letterSpacing = {unit: 'PERCENT', value: -2}
    receiverNameNode.fills = [{type: 'SOLID', color: {r: 0.145, g: 0.133, b: 0.125}}]

    // Name the layer
    titleNode.name = title
    numberNode.name = number
    dateNode.name = formattedDate

    senderLabelNode.name = legendSenderLabel
    senderNameNode.name = senderName

    receiverLabelNode.name = legendReceiverLabel
    receiverNameNode.name = receiverName

    // Generate the input text into the text property in Figma
    titleNode.characters = title.toString()
    numberNode.characters = number.toString()
    dateNode.characters = formattedDate.toString()

    senderLabelNode.characters = legendSenderLabel.toString()
    senderNameNode.characters = senderName.toString()

    receiverLabelNode.characters = legendReceiverLabel.toString()
    receiverNameNode.characters = receiverName.toString()

    // Display the content in Figma
    titleFrame.appendChild(titleNode)
    titleFrame.appendChild(numberNode)

    detailsFrame.appendChild(titleFrame)
    detailsFrame.appendChild(dateNode)

    senderFrame.appendChild(senderLabelNode)
    senderFrame.appendChild(senderNameNode)

    receiverFrame.appendChild(receiverLabelNode)
    receiverFrame.appendChild(receiverNameNode)

    contactInfoFrame.appendChild(senderFrame)
    contactInfoFrame.appendChild(receiverFrame)

    infoFrame.appendChild(detailsFrame)
    infoFrame.appendChild(contactInfoFrame)

    parentFrame.appendChild(infoFrame)

    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}