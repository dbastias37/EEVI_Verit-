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

// --- Switch de Moneda y opciones de presupuesto ---
const USD_OPTIONS = [
  "$0 – $500 USD",
  "$500 – $2 000 USD",
  "$2 000 – $10 000 USD",
  "+ $10 000 USD"
];
const CLP_OPTIONS = [
  "$0 – $500 000 CLP",
  "$500 000 – $2 000 000 CLP",
  "$2 000 000 – $10 000 000 CLP",
  "+ $10 000 000 CLP"
];

const currencySwitch = document.querySelector('#currency-switch');
const budgetSelect   = document.querySelector('#presupuesto');

function renderBudgetOptions(isUSD) {
  budgetSelect.innerHTML = (isUSD ? USD_OPTIONS : CLP_OPTIONS)
    .map(o => `<option>${o}</option>`).join('');
}

renderBudgetOptions(false); // CLP por defecto
currencySwitch.onchange = () => renderBudgetOptions(currencySwitch.checked);
