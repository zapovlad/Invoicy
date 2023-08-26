// Show the plugin UI
figma.showUI(__html__, {width: 400, height:400});

figma.ui.onmessage = msg => {
  if (msg.type === 'actionGenerate') {
    // Close the plugin 
    figma.closePlugin('Your invoice is generated. Get that 💰')
  }
}