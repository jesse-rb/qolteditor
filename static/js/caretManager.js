function caretManager(parentElement) {
    let _carets = [];
    let _runeManager = new runesManager(parentElement);
    let _parentElement = parentElement;

    let append = function(c) {
        return (c.GetPos() > _runeManager.Count());
    }

    this.Add = function(pos, rune, color) {
        let c = new caret(_parentElement, pos, rune, color)
        _carets.push(c)
        c.Render(append(c));
    }

    this.SyncedMove = function(amount) {
        for (c of _carets) {
            if (!(c.GetPos() + amount < 0) && !(c.GetPos() + amount > _runeManager.Count())) {
                c.Move(amount);
                c.Render(append(c));
            }
        }
    }

    this.SyncedBackspace = function() {
        for (c of _carets) {
            _runeManager.RemoveAt(c.GetPos()-1);
            c.Move(-1);
            c.Render(append(c));
            
        }
    }

    this.SyncedInsert = function(rune) {
        for (c of _carets) {
            _runeManager.InsertAt(c.GetPos(), rune);
            c.Move(1);
            c.Render(append(c));
        }
    }
}