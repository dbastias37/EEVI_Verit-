// --- Profesiones dinámicas ---
const rolesContainer = document.querySelector('#roles-container');
const addRoleBtn     = document.querySelector('#add-role');

function addRoleCard(role='') {
  const div = document.createElement('div');
  div.className = 'role-card flex items-center bg-slate-700 px-2 py-1 rounded-lg mb-2';
  div.innerHTML = `
     <input type="text" class="flex-1 bg-transparent outline-none text-white" value="${role}" placeholder="Profesión">
     <button class="remove text-red-400 ml-2">✕</button>
  `;
  div.querySelector('.remove').onclick = () => div.remove();
  rolesContainer.appendChild(div);
}

addRoleBtn.onclick = () => addRoleCard();

// Si llega uno por defecto
addRoleCard();

// Al enviar formulario:
const roles = Array.from(document.querySelectorAll('.role-card input'))
                   .map(i=>i.value.trim())
                   .filter(Boolean);
payload.roles = roles;

// --- Switch de Moneda ---
const currencySwitch = document.querySelector('#currency-switch'); // checkbox
const budgetSelect   = document.querySelector('#presupuesto');

currencySwitch.onchange = () => {
  const isUSD = currencySwitch.checked;
  budgetSelect.innerHTML = isUSD
     ? `<option>$0 - $500 USD</option><option>$500 - $2000 USD</option>`
     : `<option>$0 - $500.000 CLP</option><option>$500.000 - $2.000.000 CLP</option>`;
};
