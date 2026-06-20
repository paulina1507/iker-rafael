document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("rsvpForm");

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("rsvpName")?.value.trim();
    const asistencia = document.getElementById("rsvpAttendance")?.value;
    const mensaje = document.getElementById("rsvpMessage")?.value.trim();

    if (!nombre) {
      alert("Por favor escribe tu nombre 😊");
      return;
    }

    if (!asistencia) {
      alert("Selecciona tu respuesta 😊");
      return;
    }

    const numeroFiesta = window.invitationData?.rsvp?.phone;

    if (!numeroFiesta) {
      alert("No hay número de WhatsApp configurado.");
      return;
    }

    const nombreEvento =
      document.getElementById("heroNames")?.textContent.trim() ||
      "Iker Rafael";

    let textoWA = "";

    if (asistencia === "Sí asistiré") {
      textoWA = `Hola
Soy ${nombre}.

Con mucha alegría confirmo mi asistencia al Bautizo de ${nombreEvento}.

${mensaje ? `Mi mensaje: ${mensaje}` : "Nos vemos pronto"}`;
    } else {
      textoWA = `Hola
Soy ${nombre}.

Lamentablemente no podré acompañarlos al Bautizo de ${nombreEvento}.

${mensaje ? `Mi mensaje: ${mensaje}` : "Les mando un abrazo con cariño"}`;
    }

    const url = `https://wa.me/${numeroFiesta}?text=${encodeURIComponent(textoWA)}`;

    window.open(url, "_blank");

    const ok = document.getElementById("rsvpSuccess");

    if (ok) {
      ok.classList.remove("hidden");

      ok.textContent =
        asistencia === "Sí asistiré"
          ? `¡Gracias ${nombre}! Tu confirmación fue enviada`
          : `Gracias ${nombre} por avisarnos`;
    }

    form.reset();
  });
});