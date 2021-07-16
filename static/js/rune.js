// A rune prototype
function rune(parentElement, rune) {
    let _parentElement = parentElement;
    let _rune = rune;
    let _element;
    
    this.Render = function(pos) {
        _element = document.createElement('pre');
        _element.textContent = _rune;
        _parentElement.insertBefore(_element, parentElement.children[pos]);
    }

    this.Remove = function() {
        _parentElement.removeChild(_element);
    }

    // Styling
    this.SetColor = function(color) {
        _element.style.setProperty('color', color);
    }

    this.SetBackgroundColor = function(color) {
        _element.style.setProperty('background-color', color);
    }

    this.SetSize = function(size) {
        _element.style.setProperty('font-size', size);
    }
}