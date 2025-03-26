let isScratching = false;
const canvas = document.getElementById('scratch-canvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

// Inizializza il canvas
function initCanvas() {
    ctx.fillStyle = 'lightblue'; // Colore di sfondo azzurro
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'gold'; // Colore del "gratta e vinci"
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'lightblue'; // Colore del testo in azzurro
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle'; // Centraggio verticale
    ctx.fillText('🎉 VINCI! 🎉', canvas.width / 2, canvas.height / 2);
    
    ctx.globalCompositeOperation = 'destination-out'; // Imposta l'operazione per "grattare"
}

// Inizia a grattare
function startScratch(event) {
    isScratching = true;
    scratch(event);
}

// Ferma il grattare
function endScratch() {
    isScratching = false;
}

// Funzione di grattare
function scratch(event) {
    if (!isScratching) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    ctx.fill();

    // Controlla se il gratta e vinci è completamente grattato
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let scratchedPixels = 0;

    for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) scratchedPixels++; // Conta i pixel trasparenti
    }

    if (scratchedPixels > (canvas.width * canvas.height) * 0.5) {
        // Cambia il colore di sfondo a dopo il grattamento
        ctx.globalCompositeOperation = 'source-over'; // Cambia l'operazione per disegnare sul canvas
        ctx.fillStyle = 'lightblue'; // Colore di sfondo azzurro
        ctx.fillRect(0, 0, canvas.width, canvas.height); // Applica lo sfondo azzurro
        
        // Centra il messaggio "ASPETTIAMO UN BAMBINO!"
        ctx.fillStyle = 'blue'; // Colore del testo in azzurro
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'; // Centraggio verticale
        ctx.fillText('ASPETTIAMO UN BAMBINO!', canvas.width / 2, canvas.height / 2);
        
        message.innerText = ''; // Rimuovi il messaggio di default
    }
}

// Ripristina il gratta e vinci
function resetCard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    initCanvas();
    message.innerText = 'Gratta qui per SCOPRIRLO!';
}

// Aggiungi gli eventi del mouse
canvas.addEventListener('mousedown', startScratch);
canvas.addEventListener('mouseup', endScratch);
canvas.addEventListener('mousemove', scratch);

// Inizializza il gioco
initCanvas();
