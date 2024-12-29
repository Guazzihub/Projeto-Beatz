document.addEventListener('DOMContentLoaded', () => {
  // Lazy Loading
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
      if ('loading' in HTMLImageElement.prototype) {
          img.loading = 'lazy';
      } else {
          const imageObserver = new IntersectionObserver((entries, observer) => {
              entries.forEach(entry => {
                  if (entry.isIntersecting) {
                      const img = entry.target;
                      img.src = img.dataset.src;
                      observer.unobserve(img);
                  }
              });
          });
          imageObserver.observe(img);
      }
  });

// Dropdown Logic
const dropdownLink = document.querySelector('#empilhadeirasDropdown');
const dropdownContent = document.querySelector('#empilhadeirasDropdownContent');

if (dropdownLink && dropdownContent) {
    dropdownLink.addEventListener('click', (event) => {
        event.preventDefault();
        dropdownContent.classList.toggle('show');
    });

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        // Hover on PC
        dropdownLink.addEventListener('mouseenter', () => {
            dropdownContent.classList.add('show');
        });

        dropdownContent.addEventListener('mouseleave', (event) => {
            if (!dropdownLink.contains(event.relatedTarget)) {
                dropdownContent.classList.remove('show');
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (!dropdownLink.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.classList.remove('show');
        }
    });
}
})