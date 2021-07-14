// Page object prototype
function page(parentElement, width, height, indentTop, indentRight, indentBottom, indentLeft, color, backgroundColor, fontFam, fontSize, cursor) {
    let _this = this;
    let _width = width;
    let _height = height;
    let _indentTop = indentTop;
    let _indentRight = indentRight;
    let _indentBottom = indentBottom;
    let _indentLeft = indentLeft;
    let _color = color;
    let _backgroundColor = backgroundColor;
    let _fontFam = fontFam;
    let _fontSize = fontSize;
    let _cursor = cursor

    let _runes = [];
    let _element;
    
    let _caretPos = 0;
    let _caret = document.createElement('pre');
    _caret.textContent = _cursor;

    let _selected = {
        c: '',
        s: 0,
        e: 0
    }
    
    let pageInput = function(e) {
        // Wrap each symbol in span to be styled individually        
        if (e.key == 'ArrowRight') { // Handle left and right arrow keys
            if (_caretPos < _runes.length) {
                _caretPos ++;
                _element.removeChild(_caret);
                _element.insertBefore(_caret, _element.children[_caretPos])
            }
        } else if (e.key == 'ArrowLeft') {
            if (_caretPos > 0) {
                _caretPos --;
                _element.removeChild(_caret);
                _element.insertBefore(_caret, _element.children[_caretPos])
            }
        } else if (e.key == 'Backspace') {
            _runes[_caretPos-1].Remove();
            _runes.splice(_caretPos, 1);
            _caretPos --;
        } else if (!e.meta && !e.ctrlKey && !e.altKey && !(e.key == 'Shift')) { // All general keys
            let r = new rune(_element, e.key)
            _runes.splice(_caretPos, 0, r);
            r.Render(_caretPos);
            _caretPos ++;
            _element.removeChild(_caret);
            if (_element.children[_caretPos+1] != undefined) {
                _element.insertBefore(_caret, _element.children[_caretPos]);
            } else {
                _element.appendChild(_caret);
            }
            
            
        }

        

        e.preventDefault();
    }

    this.GetSelection = function() {
        return _selected;
    }

    // this.GetContent = function() {
    //     return _content;
    // }

    this.Render = function() {
        _element = document.createElement('div');
        _element.addEventListener('keydown', pageInput, false);
        _element.contentEditable = true;

        _element.style.setProperty('width', _width+'px');
        _element.style.setProperty('height', _height+'px');
        _element.style.setProperty('padding', _indentTop+'px '+_indentRight+'px '+_indentBottom+'px '+_indentLeft+'px');
        _element.style.setProperty('color', _color);
        _element.style.setProperty('background-color', _backgroundColor);
        _element.style.setProperty('font-family', _fontFam);
        _element.style.setProperty('font-size', _fontSize);

        _element.appendChild(_caret);

        _element.className = 'page';

        parentElement.appendChild(_element);
    }
}