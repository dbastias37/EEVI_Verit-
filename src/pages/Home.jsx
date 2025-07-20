import React from 'react';
export default function Home() {
  return (
    <main className="p-6">
      {/*  \u2B07\uFE0F  pega aquí el markup original del foro  \u2B07\uFE0F */}
      <h1 className="vforum-title">VFORUM</h1>
      <section className="quote-slider">
        <div className="quote-slide">"Inspiración para creadores"</div>
        <div className="quote-slide">"Comparte y aprende"</div>
      </section>
      <div className="sticky-new-topic top">
        <a href="#" className="btn-new-topic">+ Nuevo Tema</a>
      </div>
      <div className="topic-list">
        <div className="topic-card">
          <h3><a href="#">Tema de ejemplo</a></h3>
          <p className="topic-meta">Categoría • Fecha • Autor</p>
          <p>Descripción del tema...</p>
        </div>
      </div>
    </main>
  );
}
