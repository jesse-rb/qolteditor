// A caret prototype
function caret(parentElement, pos, rune) {
    let _this = this;
    let _parentElement = parentElement;
    let _pos = pos
    let _rune = rune;
    let _element;

    this.Move = function(amount) {
        _pos += amount;
    }

    this.GetPos = function() {
        return _pos;
    }
    
    this.Render = function(append, style) {
        _element && _parentElement.removeChild(_element);

        _element = document.createElement('pre');
        _element.textContent = _rune;

        _element.style.setProperty('color', style.color);
        _element.style.setProperty('background-color', style.backgroundColor);
        _element.style.setProperty('font-size', style.size);

        _element.className = 'caret';

        if (append) {
            _parentElement.appendChild(_element);
        } else {
            _parentElement.insertBefore(_element, parentElement.children[_pos]);
        }
    }

    this.Remove = function() {
        _parentElement.removeChild(_element);
    }
}