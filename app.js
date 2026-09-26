async function genererImage() {
  const apiKey = document.getElementById('apiKey').value;
  const prompt = document.getElementById('prompt').value;
  const status = document.getElementById('status');
  const img = document.getElementById('imageResult');
  const btn = document.getElementById('btn');

  if (!apiKey || !prompt) {
    alert('Renseigne ta clé API et un prompt.');
    return;
  }

  btn.disabled = true;
  status.innerText = 'Génération en cours...';
  img.style.display = 'none';

  try {
    // Appel à un modèle open-source sans filtre (ex: Flux / Stable Diffusion via Fal)
    const response = await fetch('https://fal.run/fal-ai/flux/schnell', {
      method: 'POST',
      headers: {
        'Authorization': `Key ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt: prompt })
    });

    const data = await response.json();

    if (data.images && data.images.length > 0) {
      img.src = data.images[0].url;
      img.style.display = 'block';
      status.innerText = '';
    } else {
      status.innerText = 'Erreur lors de la génération.';
    }
  } catch (err) {
    console.error(err);
    status.innerText = 'Une erreur est survenue.';
  } finally {
    btn.disabled = false;
  }
}
