package handlers

import (
	"html/template"
	"log"
	"net/http"
	"os"
)

var l *log.Logger = log.New(os.Stdout, "qol-teditor -> editor -> ", log.Lshortfile)

func Editor(w http.ResponseWriter, r *http.Request, t *template.Template) {
	err := t.ExecuteTemplate(w, "editor.html", "")
	if err != nil {
		l.Println(err)
	}
}
