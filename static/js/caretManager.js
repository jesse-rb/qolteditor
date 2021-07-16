function caretManager(parentElement) {
    let _carets = [];
    let _runeManager = new runesManager(parentElement);
    let _parentElement = parentElement;

    let append = function(c) {
        return (c.GetPos() > _runeManager.Count());
    }

    this.Add = function(pos, rune, style) {
        let c = new caret(_parentElement, pos, rune)
        _carets.push(c)
        c.Render(append(c), style);
    }

    this.SyncedMove = function(amount, style) {
        for (c of _carets) {
            if (!(c.GetPos() + amount < 0) && !(c.GetPos() + amount > _runeManager.Count())) {
                c.Move(amount);
                c.Render(append(c), style);
            }
        }
    }

    this.SyncedBackspace = function(style) {
        for (c of _carets) {
            if (!(c.GetPos()-1 < 0)) {
                _runeManager.RemoveAt(c.GetPos()-1);
                c.Move(-1);
                c.Render(append(c), style);
            }
        }
    }

    this.SyncedDelete = function() {
        for (c of _carets) {
            if (!(c.GetPos() + 1 > _runeManager.Count())) {
                _runeManager.RemoveAt(c.GetPos());
            }
        }
    }

    this.SyncedInsert = function(rune, style) {
        for (c of _carets) {
            _runeManager.InsertAt(c.GetPos(), rune);
            c.Move(1);
            c.Render(append(c), style);
        }
    }

    this.GlobalStyle = function(style) {
        style.color && _runeManager.SetGlobalColor(style.color);
        style.backgroundColor && _runeManager.SetGlobalBackgroundColor(style.backgroundColor);
        style.size && _runeManager.SetRangeSize(style.size);
    }

    this.SyncedRangeStyle = function(style) {
        for (c of _carets) {
            style.color && _runeManager.SetRangeColor(style.color, c.GetPos()-1, c.GetPos()-1);
            style.backgroundColor && _runeManager.SetRangeBackgroundColor(style.backgroundColor, c.GetPos()-1, c.GetPos()-1);
            style.size && _runeManager.SetRangeSize(style.size, c.GetPos()-1, c.GetPos()-1);
        }
    }
}