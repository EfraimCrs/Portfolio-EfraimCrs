

// Função para abrir projeto em nova aba
function openProject(url) {
  window.open(url, '_blank');
}

// Sistema de filtros para projetos
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.projects-section .filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter projects
      filterProjects(filter, projectCards);
      
      // Adiciona efeito de feedback visual
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });
  
  // Adicionar animação hover aos cards de projeto
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Adicionar efeito de clique nos ícones de ação
  const actionIcons = document.querySelectorAll('.project-actions .action-icon');
  actionIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
      e.stopPropagation();
      
      // Efeito de pulso
      this.style.transform = 'scale(1.3)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // Adicionar efeito de partículas
      createParticleEffect(this);
    });
  });
  
  // Intersection Observer para animação de entrada
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  projectCards.forEach(card => {
    observer.observe(card);
  });
});

// Função para filtrar projetos
function filterProjects(filter, cards) {
  cards.forEach(card => {
    const categories = card.getAttribute('data-category').split(' ');
    
    if (filter === 'all' || categories.includes(filter)) {
      card.classList.remove('hidden');
      card.style.display = 'block';
      
      // Animação de entrada
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
      }, 100);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px) scale(0.9)';
      
      setTimeout(() => {
        card.style.display = 'none';
        card.classList.add('hidden');
      }, 300);
    }
  });
  
  // Reorganizar grid após filtro
  setTimeout(reorganizeGrid, 350);
}

// Função para reorganizar o grid
function reorganizeGrid() {
  const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
  
  visibleCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    card.style.animation = 'slideInUp 0.5s ease forwards';
  });
}

// Função para criar efeito de partículas
function createParticleEffect(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  
  for (let i = 0; i < 6; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: #dc3545;
      border-radius: 50%;
      pointer-events: none;
      z-index: 1000;
      left: ${centerX}px;
      top: ${centerY}px;
    `;
    
    document.body.appendChild(particle);
    
    const angle = (i / 6) * Math.PI * 2;
    const distance = 30 + Math.random() * 20;
    const duration = 500 + Math.random() * 300;
    
    const animation = particle.animate([
      { 
        transform: 'translate(0, 0) scale(1)',
        opacity: 1 
      },
      { 
        transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
        opacity: 0 
      }
    ], {
      duration: duration,
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.addEventListener('finish', () => {
      particle.remove();
    });
  }
}

// Função para lazy loading das imagens
function lazyLoadImages() {
  const images = document.querySelectorAll('.project-image[data-src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add('loaded');
        imageObserver.unobserve(img);
      }
    });
  });
  
  images.forEach(img => imageObserver.observe(img));
}

// Adicionar contador de visualizações (simulado)
function addViewCounter() {
  const projects = document.querySelectorAll('.project-card');
  
  projects.forEach(project => {
    const viewCount = Math.floor(Math.random() * 500) + 50;
    const viewElement = document.createElement('div');
    viewElement.className = 'view-count';
    viewElement.innerHTML = `<i class="fas fa-eye"></i> ${viewCount} visualizações`;
    viewElement.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 10px;
      border-radius: 15px;
      font-size: 0.8rem;
      backdrop-filter: blur(5px);
    `;
    
    project.style.position = 'relative';
    project.appendChild(viewElement);
  });
}

// Inicializar funcionalidades extras
document.addEventListener('DOMContentLoaded', function() {
  lazyLoadImages();
  addViewCounter();
});

// Adicionar CSS adicional para animações
const projectsStyle = document.createElement('style');
projectsStyle.textContent = `
  .project-image.loaded {
    opacity: 1;
    transition: opacity 0.3s ease;
  }
  
  .project-image:not(.loaded) {
    opacity: 0.5;
  }
  
  .view-count {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .project-card:hover .view-count {
    opacity: 1;
  }
  
  @media (max-width: 768px) {
    .view-count {
      opacity: 1;
      position: relative;
      top: auto;
      right: auto;
      display: inline-block;
      margin-top: 10px;
      background: rgba(220, 53, 69, 0.2);
      border: 1px solid rgba(220, 53, 69, 0.3);
    }
  }
`;
document.head.appendChild(projectsStyle);