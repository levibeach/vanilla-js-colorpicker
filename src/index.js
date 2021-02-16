// Import stylesheets
import './styles.css'

var selected = '#345ef0'

function checkColor() {
  // remove the # from the hex
  var c = selected.substring(1)

  // convert rrggbb to decimal
  var rgb = parseInt(c, 16)
  var r = (rgb >> 16) & 0xff
  var g = (rgb >> 8) & 0xff
  var b = (rgb >> 0) & 0xff

  // ITU-R BT.709
  var luma = Math.floor(0.2126 * r + 0.7152 * g + 0.0722 * b)

  if (luma < 126) {
    return '#ffffff'
  } else {
    return '#000000'
  }
}

var hex = document.createElement('div')
hex.style.color = checkColor()
hex.innerHTML = selected

var colorInput = document.createElement('input')
colorInput.type = 'color'
colorInput.id = 'colorpicker'

function ColorPicker(element, data) {
  this.data = data
  this.element = element
  element.value = data
  element.addEventListener('change', this, false)
}

ColorPicker.prototype.handleEvent = function (event) {
  switch (event.type) {
    case 'change':
      this.change(this.element.value)
  }
}

ColorPicker.prototype.change = function (value) {
  this.data = value
  this.element.value = value
  selected = value
  hex.innerHTML = selected
  hex.style.color = checkColor()
  document.body.style.backgroundColor = selected
}

// Add everything to the DOM
document.body.append(hex)
document.body.append(colorInput)

var myColorPicker = new ColorPicker(colorInput, selected)

document.body.style.backgroundColor = selected
