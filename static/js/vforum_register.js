document.querySelector('#register-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    username: e.target.username.value,
    email:    e.target.email.value,
    password: e.target.password.value
  };

  try {
    const res = await fetch('/forum/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(payload)
    });
    const json = await res.json();
    if (json.success) {
      window.location.href = '/forum';
    } else {
      alert(json.error || 'Error');
    }
  } catch (err) {
    alert('Error de conexión');
  }
});
