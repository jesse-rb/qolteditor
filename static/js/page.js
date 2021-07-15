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

    let _caretManager;

    let _selected = {
        c: '',
        s: 0,
        e: 0
    }
    
    let pageInput = function(e) {
        // Wrap each symbol in span to be styled individually        
        if (e.key == 'ArrowRight') { // Handle left and right arrow keys
            _caretManager.SyncedMove(1);
        } else if (e.key == 'ArrowLeft') {
            _caretManager.SyncedMove(-1);
        } else if (e.key == 'Backspace') {
            _caretManager.SyncedBackspace();
        } else if (e.key == 'Delete') {
            _caretManager.SyncedDelete();
        } else if (!e.metaKey && !e.ctrlKey && !e.altKey && !(e.key == 'CapsLock') && !(e.key == 'Shift')) { // All general keys
            console.log('General key: ', e);
            if (e.key == 'Enter') {
                _caretManager.SyncedInsert('\n');
            } else {
                let stringKey = '';
                const code = e.which || e.code;
                let key = e.key;
                if (!key) {
                    key = String.fromCharCode(code);
                }
                stringKey += key;

                _caretManager.SyncedInsert(key);
            }
        } else if (e.ctrlKey) {
            // TODO: Add copy, cut and paste support
            if (e.key == 'v' || e.key == 'V') {
                console.log('ctrl v');
            } else if (e.key == 'c' || e.key == 'C') {
                console.log('ctrl c');
            } else if (e.key == 'x' || e.key == 'X') {
                console.log('ctrl x');
            }
        }

        e.preventDefault();
    }

    let paste = function(e) {
        e.preventDefault();
    }

    this.GetSelection = function() {
        return _selected;
    }

    this.Render = function() {
        _element = document.createElement('div');

        _element.addEventListener('keydown', pageInput, false);
        _element.addEventListener('contextmenu', paste, false);

        _element.contentEditable = true;

        _element.style.setProperty('width', _width+'px');
        _element.style.setProperty('height', _height+'px');
        _element.style.setProperty('padding', _indentTop+'px '+_indentRight+'px '+_indentBottom+'px '+_indentLeft+'px');
        _element.style.setProperty('color', _color);
        _element.style.setProperty('background-color', _backgroundColor);
        _element.style.setProperty('font-family', _fontFam);
        _element.style.setProperty('font-size', _fontSize);

        _element.className = 'page';

        parentElement.appendChild(_element);

        _caretManager = new caretManager(_element);
        _caretManager.Add(0, _cursor, '#FFA500'); // Add default caret
    }
}