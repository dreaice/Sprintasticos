// Cargar componentes navbar y footer
document.addEventListener("DOMContentLoaded", () => {
    // Cargar navbar con ruta relativa desde ourCreations/
    fetch("../../components/navbar.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("navbar-container").innerHTML = html;
        })
        .catch(error => {
            console.error('Error cargando navbar:', error);
        });

    // Cargar footer con ruta relativa desde ourCreations/
    fetch("../../components/footer.html")
        .then(res => res.text())
        .then(html => {
            document.getElementById("footer-container").innerHTML = html;
        })
        .catch(error => {
            console.error('Error cargando footer:', error);
        });

    // Inicializar funcionalidades después de cargar los componentes
    setTimeout(() => {
        initializeScrollAnimations();
        initializeJewelryActions();
        initializeHeroAnimations();
    }, 100);
});

// Animaciones al hacer scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observar las tarjetas de joyería
    const jewelryCards = document.querySelectorAll('.jewelry-card');
    jewelryCards.forEach((card, index) => {
        // Añadir un delay escalonado para efecto de cascada
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observar elementos del hero
    const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle');
    heroElements.forEach(element => {
        observer.observe(element);
    });
}

// Funcionalidad de las acciones de joyería
function initializeJewelryActions() {
    const actionButtons = document.querySelectorAll('.action-btn');

    actionButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.stopPropagation();

            const icon = this.querySelector('i');
            const jewelryCard = this.closest('.jewelry-card');
            const jewelryTitle = jewelryCard.querySelector('.jewelry-title').textContent;

            // Añadir animación de click
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }, 100);

            // Manejar diferentes acciones
            if (icon.classList.contains('bi-heart')) {
                handleFavorite(jewelryTitle, this);
            } else if (icon.classList.contains('bi-eye')) {
                handleViewDetails(jewelryTitle);
            } else if (icon.classList.contains('bi-share')) {
                handleShare(jewelryTitle);
            }
        });

        // Efecto hover mejorado
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.1)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
}

// Manejar favoritos
function handleFavorite(jewelryTitle, button) {
    const icon = button.querySelector('i');
    const isFavorited = icon.classList.contains('bi-heart-fill');

    if (isFavorited) {
        icon.classList.remove('bi-heart-fill');
        icon.classList.add('bi-heart');
        showNotification(`💔 ${jewelryTitle} removido de favoritos`, 'info');
    } else {
        icon.classList.remove('bi-heart');
        icon.classList.add('bi-heart-fill');
        button.style.background = '#FDCBC9';
        showNotification(`💖 ${jewelryTitle} agregado a favoritos`, 'success');
    }
}

// Ver detalles de la joya
function handleViewDetails(jewelryTitle) {
    showNotification(`👁️ Viendo detalles de: ${jewelryTitle}`, 'info');

    // Aquí podrías abrir un modal o redirigir a una página de detalles
    console.log(`Mostrando detalles de: ${jewelryTitle}`);

    // Ejemplo de scroll suave a la card específica
    const allCards = document.querySelectorAll('.jewelry-card');
    allCards.forEach(card => {
        const title = card.querySelector('.jewelry-title').textContent;
        if (title === jewelryTitle) {
            card.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // Efecto de highlight temporal
            card.style.boxShadow = '0 0 30px rgba(116, 3, 84, 0.4)';
            setTimeout(() => {
                card.style.boxShadow = '';
            }, 2000);
        }
    });
}

// Compartir joya
function handleShare(jewelryTitle) {
    if (navigator.share) {
        navigator.share({
            title: `${jewelryTitle} - Nuestras Creaciones`,
            text: `Mira esta hermosa joya: ${jewelryTitle}`,
            url: window.location.href
        }).then(() => {
            showNotification(`📤 ${jewelryTitle} compartido exitosamente`, 'success');
        }).catch(err => {
            console.log('Error al compartir:', err);
            fallbackShare(jewelryTitle);
        });
    } else {
        fallbackShare(jewelryTitle);
    }
}

// Compartir alternativo (copiar al portapapeles)
function fallbackShare(jewelryTitle) {
    const shareText = `Mira esta hermosa joya: ${jewelryTitle} - ${window.location.href}`;

    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification(`📋 Enlace de ${jewelryTitle} copiado al portapapeles`, 'success');
        }).catch(err => {
            console.log('Error al copiar:', err);
            showNotification(`❌ Error al compartir ${jewelryTitle}`, 'error');
        });
    } else {
        // Fallback para navegadores más antiguos
        const textArea = document.createElement('textarea');
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification(`📋 Enlace de ${jewelryTitle} copiado`, 'success');
    }
}

// Animaciones del hero
function initializeHeroAnimations() {
    const floatingGems = document.querySelectorAll('.floating-gem');

    // Añadir movimiento aleatorio adicional a las gemas
    floatingGems.forEach((gem, index) => {
        gem.addEventListener('mouseenter', () => {
            gem.style.transform = 'scale(1.5)';
            gem.style.opacity = '0.6';
        });

        gem.addEventListener('mouseleave', () => {
            gem.style.transform = 'scale(1)';
            gem.style.opacity = '0.3';
        });
    });
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Remover notificaciones existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    // Crear nueva notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Colores según tu paleta
    const colors = {
        success: '#740354', // color-primario
        error: '#BD5877',   // color-terciario
        info: '#B99FC1'     // color-secundario
    };

    // Estilos
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: colors[type] || colors.info,
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '15px',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
        zIndex: '9999',
        fontSize: '0.9rem',
        fontWeight: '500',
        fontFamily: 'var(--fuente-cuerpo)',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease',
        maxWidth: '300px',
        wordWrap: 'break-word'
    });

    document.body.appendChild(notification);

    // Animar entrada
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Animar salida
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// Efecto parallax suave en el hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroSection = document.querySelector('.hero-section');
    const floatingGems = document.querySelectorAll('.floating-gem');

    if (heroSection) {
        const rate = scrolled * -0.5;
        heroSection.style.transform = `translateY(${rate}px)`;
    }

    // Movimiento diferencial de las gemas
    floatingGems.forEach((gem, index) => {
        const rate = scrolled * (0.2 + index * 0.1);
        gem.style.transform = `translateY(${rate}px)`;
    });
});

// Smooth scroll para anclas
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Preloader (opcional)
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Animar entrada de elementos después de que todo esté cargado
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';

        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 200);
    }
});