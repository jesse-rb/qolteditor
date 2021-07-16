function styleBar(parentElement, caretManager, style) {
    let _this = this;
    let _parentElement = parentElement;
    let _caretManager = caretManager;
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
        _style.size = e.target.value
        _caretManager.SyncedMove(0, _style); // Update caret style to match
        _caretManager.GlobalStyle(_style);
    }

    this.GetStyle = function() {
        return _style;
    }

    this.Render = function() {
        // Init page style display
        let divStyleDisplayBar = document.createElement('div');

        // Text color picker label
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

        parentElement.appendChild(divStyleDisplayBar);
    }
}