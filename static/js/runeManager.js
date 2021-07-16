function runesManager(parentElement) {
    _parentElement = parentElement;
    _runes = [];

    this.InsertAt = function(pos, content) {
        r = new rune(parentElement, content);
        _runes.splice(pos, 0, r);
        r.Render(pos);
    }

    this.RemoveAt = function(pos) {
        _runes[pos].Remove();
        _runes.splice(pos, 1);
    }

    this.Count = function() {
        return _runes.length;
    }

    // Styling global
    this.SetGlobalColor = function(color) {
        for (r of _runes) {
            r.SetColor(color);
        }
    }

    this.SetGlobalBackgroundColor = function(color) {
        for (r of _runes) {
            r.SetBackgroundColor(color);
        }
    }

    this.SetGlobalSize = function(size) {
        for (r of _runes) {
            r.SetSize(size);
        }
    }

    // Styling range
    this.SetRangeColor = function(color, start, end) {
        for (let i=start; i<=end; i++) {
            _runes[i].SetColor(color);
        }
    }

    this.SetRangeBackgroundColor = function(color, start, end) {
        for (let i=start; i<=end; i++) {
            _runes[i].SetBackgroundColor(color);
        }
    }

    this.SetRangeSize = function(size, start, end) {
        for (let i=start; i<=end; i++) {
            _runes[i].SetSize(size);
        }
    }
}