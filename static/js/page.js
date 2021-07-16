// Page object prototype
function page(parentElement, width, height, indentTop, indentRight, indentBottom, indentLeft, colorText, colorTextBackground, colorBackground, fontFam, fontSize, cursor) {
    let _this = this;
    let _width = width;
    let _height = height;
    let _indentTop = indentTop;
    let _indentRight = indentRight;
    let _indentBottom = indentBottom;
    let _indentLeft = indentLeft;
    let _colorText = colorText;
    let _colorTextBackground = colorTextBackground;
    let _colorBackground = colorBackground;
    let _fontFam = fontFam;
    let _fontSize = fontSize;
    let _cursor = cursor

    let _runes = [];
    let _element;
    let _styleBar;

    let _caretManager;

    let _selected = {
        c: '',
        s: 0,
        e: 0
    }
    
    // Page input
    let pageInput = function(e) {
        // Wrap each symbol in span to be styled individually        
        if (e.key == 'ArrowRight') { // Handle left and right arrow keys
            _caretManager.SyncedMove(1, _styleBar.GetStyle());
        } else if (e.key == 'ArrowLeft') {
            _caretManager.SyncedMove(-1, _styleBar.GetStyle());
        } else if (e.key == 'Backspace') {
            _caretManager.SyncedBackspace(_styleBar.GetStyle());
        } else if (e.key == 'Delete') {
            _caretManager.SyncedDelete();
        } else if (!e.metaKey && !e.ctrlKey && !e.altKey && !(e.key == 'CapsLock') && !(e.key == 'Shift')) { // All general keys
            console.log('General key: ', e);
            if (e.key == 'Enter') {
                _caretManager.SyncedInsert('\n', _styleBar.GetStyle());
            } else {
                _caretManager.SyncedInsert(e.key, _styleBar.GetStyle());
                _caretManager.SyncedRangeStyle(_styleBar.GetStyle());
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

    // Create style object for consistent use
    let composeStyle = function() {
        return {color: _colorText, backgroundColor: _colorTextBackground, size: _fontSize};
    }

    this.GetSelection = function() {
        return _selected;
    }

    this.Render = function() {
        // Init page element
        let divPageContainer = document.createElement('div');

        _element = document.createElement('div');

        _element.addEventListener('keydown', pageInput, false);
        _element.addEventListener('contextmenu', paste, false);

        _element.contentEditable = true;

        _element.style.setProperty('width', _width+'px');
        _element.style.setProperty('height', _height+'px');
        _element.style.setProperty('padding', _indentTop+'px '+_indentRight+'px '+_indentBottom+'px '+_indentLeft+'px');
        _element.style.setProperty('background-color', _colorBackground);
        _element.style.setProperty('font-family', _fontFam);

        _element.className = 'page';

        divPageContainer.appendChild(_element);

        parentElement.appendChild(divPageContainer);

        // Init caret manager
        _caretManager = new caretManager(_element);
        _caretManager.Add(0, _cursor, composeStyle()); // Add default caret

        _caretManager.GlobalStyle(composeStyle());

        // Init page style bar
        _styleBar = new styleBar(divPageContainer, _caretManager, composeStyle());
        _styleBar.Render();
    }
}