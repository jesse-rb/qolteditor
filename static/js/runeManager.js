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
}