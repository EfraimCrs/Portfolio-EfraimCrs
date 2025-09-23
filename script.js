// Sistema de filtros
const filterButtons = document.querySelectorAll('.filter-btn');
const certificateCards = document.querySelectorAll('.certificate-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active de todos os botões
    filterButtons.forEach(b => b.classList.remove('active'));
    // Adiciona active ao clicado
    btn.classList.add('active');
    
    const filter = btn.dataset.filter;
    
    certificateCards.forEach(card => {
      if (filter === 'all' || card.dataset.category.includes(filter)) {
        card.style.display = 'block';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 100);
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 300);
      }
    });
  });
});

// Modal de visualização
function viewCertificate(imageSrc) {
  const modal = document.getElementById('certificateModal');
  const modalImage = document.getElementById('modalImage');
  
  // Aqui você substituirá pelo link do Google Drive
  modalImage.src = `assets/certificates/${imageSrc}`;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('certificateModal');
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Fechar modal clicando fora
document.getElementById('certificateModal').addEventListener('click', (e) => {
  if (e.target.id === 'certificateModal') {
    closeModal();
  }
});

// Fechar modal com ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeModal();
  }
});

// Animação de entrada dos cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

certificateCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  observer.observe(card);
});