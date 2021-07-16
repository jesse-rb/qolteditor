function styleBar(parentElement, caretManager, page, style) {
    let _this = this;
    let _parentElement = parentElement;
    let _caretManager = caretManager;
    let _page = page;
    let _style = style;

    // Change page text color
    let updateTextColor = function(e) {
        _style.color = e.target.value;
        _caretManager.SyncedMove(0, _style); // Update caret style to match
        _caretManager.GlobalStyle(_style);
    }

    // Change page text background color
    let updateTextBackgroundColor = function(e) {
        _style.backgroundColor = e.target.value;
        document.getElementById('checkbox-toggle-text-background-color').checked = true;
        _caretManager.SyncedMove(0, _style); // Update caret style to match
        _caretManager.GlobalStyle(_style);
    }

    // Toggle page text background color
    let ToggleTextBackgroundColor = function(e) {
        if (e.target.checked) {
            _style.backgroundColor = document.getElementById('color-picker-text-background').value;
        } else {
            _style.backgroundColor = 'transparent';
        }
        _caretManager.SyncedMove(0, _style); // Update caret style to match
        _caretManager.GlobalStyle(_style);
    }

    // Change page text size
    let updateTextSize = function(e) {
        _style.size = e.target.value + 'px'
        _caretManager.SyncedMove(0, _style); // Update caret style to match
        _caretManager.GlobalStyle(_style);
    }

    // Change page color
    let updatePageColor = function(e) {
        _style.pageColor = e.target.value;
        _page.style.setProperty('background-color', _style.pageColor);
    }

    this.GetStyle = function() {
        return _style;
    }

    this.Render = function() {
        //
        // Init page style display
        //
        let divStyleDisplayBar = document.createElement('div');
        divStyleDisplayBar.className = 'style-bar';

        //
        // Text color picker
        let divTextColorPicker = document.createElement('div');
        divTextColorPicker.className = 'style-control';

        // Label
        let labelTextColorPicker = document.createElement('label');
        labelTextColorPicker.textContent = 'text';
        labelTextColorPicker.setAttribute('for', 'color-picker-text');

        divTextColorPicker.appendChild(labelTextColorPicker);

        // Input
        let colorPickerText = document.createElement('input');
        colorPickerText.setAttribute('id', 'color-picker-text');
        colorPickerText.setAttribute('type', 'color');
        colorPickerText.setAttribute('value', _style.color);
        colorPickerText.addEventListener('change', updateTextColor, false);

        divTextColorPicker.appendChild(colorPickerText);

        divStyleDisplayBar.appendChild(divTextColorPicker);

        //
        // Text background picker
        let divTextBackgroundColorPicker = document.createElement('div');
        divTextBackgroundColorPicker.className = 'style-control';

        // Label
        let labelTextBackgroundColorPicker = document.createElement('label');
        labelTextBackgroundColorPicker.textContent = 'text background';
        labelTextBackgroundColorPicker.setAttribute('for', 'color-picker-text-background');

        divTextBackgroundColorPicker.appendChild(labelTextBackgroundColorPicker);

        // Checkbox
        let checkBoxTextBackgroundColor = document.createElement('input');
        checkBoxTextBackgroundColor.setAttribute('id', 'checkbox-toggle-text-background-color');
        checkBoxTextBackgroundColor.setAttribute('type', 'checkbox');
        if (_style.backgroundColor != 'transparent') {
            checkBoxTextBackgroundColor.checked = true;
        }
        checkBoxTextBackgroundColor.addEventListener('change', ToggleTextBackgroundColor, false);

        divTextBackgroundColorPicker.appendChild(checkBoxTextBackgroundColor);

        // Input
        let colorPickerTextBackground = document.createElement('input');
        colorPickerTextBackground.setAttribute('id', 'color-picker-text-background');
        colorPickerTextBackground.setAttribute('type', 'color');
        colorPickerTextBackground.setAttribute('value', _style.backgroundColor);
        colorPickerTextBackground.addEventListener('change', updateTextBackgroundColor, false);

        divTextBackgroundColorPicker.appendChild(colorPickerTextBackground);

        divStyleDisplayBar.appendChild(divTextBackgroundColorPicker);

        //
        // Text size
        let divTextSize = document.createElement('div');
        divTextSize.className = 'style-control';

        // Label
        let labelTextSize = document.createElement('label');
        labelTextSize.textContent = 'text size in \'px\'';
        labelTextSize.setAttribute('for', 'number-text-size');

        divTextSize.appendChild(labelTextSize);

        // Input
        let numberTextSize = document.createElement('input');
        numberTextSize.setAttribute('id', 'number-text-size');
        numberTextSize.setAttribute('type', 'number');
        numberTextSize.setAttribute('value', _style.size.split("px")[0]);
        numberTextSize.addEventListener('change', updateTextSize, false);

        divTextSize.appendChild(numberTextSize);

        divStyleDisplayBar.appendChild(divTextSize);

        parentElement.appendChild(divStyleDisplayBar);

        //
        // Page color picker
        let divPageColorPicker = document.createElement('div');
        divPageColorPicker.className = 'style-control';

        // Label
        let labelPageColorPicker = document.createElement('label');
        labelPageColorPicker.textContent = 'page';
        labelPageColorPicker.setAttribute('for', 'color-picker-page');

        divPageColorPicker.appendChild(labelPageColorPicker);

        // Input
        let colorPickerPage = document.createElement('input');
        colorPickerPage.setAttribute('id', 'color-picker-page');
        colorPickerPage.setAttribute('type', 'color');
        colorPickerPage.setAttribute('value', _style.pageColor);
        colorPickerPage.addEventListener('change', updatePageColor, false);

        divPageColorPicker.appendChild(colorPickerPage);

        divStyleDisplayBar.appendChild(divPageColorPicker);

        //
        // Apply styles initially
        //
        _page.style.setProperty('width', _style.pageWidth);
        _page.style.setProperty('height', _style.pageHeight);
        _page.style.setProperty('padding', _style.pagePadding);
        _page.style.setProperty('background-color', _style.pageColor);
        _page.style.setProperty('font-family', _style.font);

        _caretManager.GlobalStyle(_style);
    }
}