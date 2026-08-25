const dropzone = document.getElementById('dropzone');
const fileInput = document.getElementById('fileInput');
const errorBox = document.getElementById('error');
const previewArea = document.getElementById('previewArea');

const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

dropzone.addEventListener('click', () => fileInput.click());

dropzone.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') fileInput.click();
});

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');
  handleFile(e.dataTransfer.files[0]);
});

fileInput.addEventListener('change', (e) => {
  handleFile(e.target.files[0]);
});

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function handleFile(file) {
  errorBox.style.display = 'none';
  if (!file) return;

  if (!allowedTypes.includes(file.type)) {
    errorBox.textContent = 'That file type isn\'t supported. Please upload a JPG, PNG, or GIF.';
    errorBox.style.display = 'block';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const dataUrl = e.target.result;
    showPreview(file.name, formatSize(file.size), dataUrl);
    localStorage.setItem('uploadedImage', dataUrl);
    localStorage.setItem('uploadedImageMeta', JSON.stringify({
      name: file.name,
      size: formatSize(file.size)
    }));
  };
  reader.readAsDataURL(file);
}

function showPreview(name, size, dataUrl) {
  previewArea.innerHTML = `
    <div class="preview-item">
      <img src="${dataUrl}" alt="preview">
      <div class="preview-info">
        <div class="preview-top">
          <div>
            <div class="preview-name">${name}</div>
            <div class="preview-size">${size}</div>
          </div>
          <button class="remove-btn" id="removeBtn" title="Remove">&times;</button>
        </div>
        <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
        <div class="progress-label" id="progressLabel">Uploading…</div>
      </div>
    </div>
  `;

  document.getElementById('removeBtn').addEventListener('click', () => {
    previewArea.innerHTML = '';
    fileInput.value = '';
    localStorage.removeItem('uploadedImage');
    localStorage.removeItem('uploadedImageMeta');
  });

  let percent = 0;
  const fill = document.getElementById('progressFill');
  const label = document.getElementById('progressLabel');

  function tick() {
    percent += Math.floor(Math.random() * 18) + 12;
    if (percent >= 100) {
      percent = 100;
      fill.style.width = '100%';
      label.textContent = 'Upload complete';
      return;
    }
    fill.style.width = percent + '%';
    label.textContent = 'Uploading… ' + percent + '%';
    setTimeout(tick, 250);
  }
  setTimeout(tick, 250);
}

window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('uploadedImage');
  const meta = JSON.parse(localStorage.getItem('uploadedImageMeta') || 'null');
  if (saved && meta) {
    showPreview(meta.name, meta.size, saved);
  }
});