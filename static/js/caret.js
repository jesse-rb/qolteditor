// A caret prototype
function caret(parentElement, pos, rune, color) {
    let _this = this;
    let _parentElement = parentElement;
    let _pos = pos
    let _rune = rune;
    let _element;
    let _color = color;

    this.Move = function(amount) {
        _pos += amount;
    }

    this.GetPos = function() {
        return _pos;
    }
    
    this.Render = function(append) {
        _element && _parentElement.removeChild(_element);

        _element = document.createElement('pre');
        _element.textContent = _rune;

        _element.style.setProperty('color', _color);

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