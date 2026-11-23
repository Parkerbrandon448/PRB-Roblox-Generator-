const promptInput = document.getElementById('promptInput');
const generateButton = document.getElementById('generateButton');
const modal = document.getElementById('generationModal');
const modalClose = document.getElementById('modalClose');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
const projectList = document.getElementById('projectList');

function showToast(message) {
  toastText.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

document.queryFor

function openModal(title) {
  document.getElementById('modalTitle').textContent = title || 'New Roblox Experience';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.getElementById('exportMenu').classList.remove('open');
}

generateButton.addEventListener('click', () => {
  const prompt = promptInput.value.trim();
  generateButton.disabled = true;
  generateButton.querySelector('span').textContent = 'Creating...';

  window.setTimeout(() => {
    generateButton.disabled = false;
    generateButton.querySelector('span').textContent = 'Generate';
    openModal(prompt ? 'Your New Roblox Experience' : 'New Roblox Experience');
  }, 850);
});

document.querySelectorAll('.template-card').forEach(card => {
  card.addEventListener('click', () => {
    promptInput.value = card.dataset.prompt;
    promptInput.focus();
    promptInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
});

document.getElementById('attachButton').addEventListener('click', () => document.getElementById('fileInput').click());
document.getElementById('fileInput').addEventListener('change', event => {
  if (event.target.files.length) showToast(`${event.target.files[0].name} attached`);
});

document.getElementById('styleButton').addEventListener('click', () => {
  const styles = ['Neon','Pastel','Low-poly','Realistic','Cinematic'];
  const style = styles[Math.floor(Math.random() * styles.length)];
  promptInput.value = promptInput.value ? `${promptInput.value} in a ${style.toLowerCase()} style` : `Create an experience in a ${style.toLowerCase()} style`;
  showToast(`${style} style added`);
});

document.getElementById('mobileButton').addEventListener('click', () => showToast('Mobile controls enabled'));
modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });

document.getElementById('exportButton').addEventListener('click', () => {
  document.getElementById('exportMenu').classList.toggle('open');
});

document.querySelectorAll('#exportMenu button').forEach(button => {
  button.addEventListener('click', () => {
    closeModal();
    showToast(`Export prepared as ${button.dataset.format}`);
  });
});

document.getElementById('saveProject').addEventListener('click', () => {
  const title = document.getElementById('modalTitle').textContent;
  const row = document.createElement('button');
  row.className = 'project-row';
  row.innerHTML = `<div class="project-thumb thumb-one"><div></div></div><div class="project-details"><strong>${title}</strong><span>Created just now</span></div><span class="status"><i></i> Draft</span><span class="project-arrow">•••</span>`;
  projectList.prepend(row);
  closeModal();
  showToast('Project saved to drafts');
});

document.querySelectorAll('.nav-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    item.classList.add('active');
    if (item.dataset.view !== 'Create') showToast(`${item.dataset.view} is ready to explore`);
  });
});

document.querySelector('.mobile-menu').addEventListener('click', () => document.querySelector('.sidebar').classList.toggle('open'));
document.querySelectorAll('#viewAllTemplates,#viewAllProjects').forEach(button => {
  button.addEventListener('click', () => showToast('More coming soon'));
});
