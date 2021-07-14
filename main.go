package main

import (
	"context"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/signal"
	"qol-teditor/handlers"
	"time"

	"github.com/gorilla/mux"
)

var t *template.Template

func redirectToHTTPS(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if os.Getenv("APP_ENV") == "production" { // If in production environment
			if r.Header.Get("x-forwarded-proto") != "https" { // If this was not a https request
				urlHTTPS := "https://" + r.Host + r.RequestURI // Reconstruct https url and redirect client
				http.Redirect(w, r, urlHTTPS, http.StatusPermanentRedirect)
				return // Don't serve default handler
			}
		}
		// Serve default handler
		handler.ServeHTTP(w, r)
	})
}

func init() {
	// Create html tmeplates
	t = template.Must(template.ParseGlob("./html/*.html"))
}

func main() {
	// Create main logger
	l := log.New(os.Stdout, "qol-teditor -> main -> ", log.Lshortfile)
	l.Println("Hello World")

	// Setup routes using gorilla/mux package
	r := mux.NewRouter()

	// Serve static files
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	// Serve routes
	r.HandleFunc("/", EditorHandler)

	// Grab standard port
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	// Create new server
	s := &http.Server{
		Addr:         ":" + port,
		Handler:      redirectToHTTPS(r),
		IdleTimeout:  120 * time.Second,
		ReadTimeout:  1 * time.Second,
		WriteTimeout: 1 * time.Second,
	}

	// Start server
	go func() {
		l.Println("Starting server on port " + port)

		err := s.ListenAndServe()

		if err != nil {
			l.Fatal(err)
		}
	}()

	// Graceful shutdown with interrupt or kill signals
	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, os.Interrupt)
	signal.Notify(sigChan, os.Kill)

	sig := <-sigChan
	l.Println("Recieved terminate, graceful shutdown", sig)

	tc, cancelFunc := context.WithTimeout(context.Background(), 30*time.Second)
	cancelFunc()
	s.Shutdown(tc)
}

func EditorHandler(w http.ResponseWriter, r *http.Request) {
	handlers.Editor(w, r, t)
}
