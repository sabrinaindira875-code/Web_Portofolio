document.addEventListener("DOMContentLoaded", () => {
    const memberGrid = document.getElementById("member-grid");
    
    // 1. Render Member Cards
    if (memberGrid && typeof membersData !== 'undefined') {
        membersData.forEach(member => {
            const card = document.createElement('article');
            card.className = 'member-card';
            
            // Build Certificates HTML
            let certsHTML = '';
            if (member.certificates && member.certificates.length > 0) {
                certsHTML = member.certificates.map(cert => `
                    <img class="cert-thumb" src="${cert.thumb}" data-full="${cert.url}" data-title="${cert.title}" alt="${cert.title}" title="Lihat Sertifikat">
                `).join('');
            }

            // Build Card HTML
            card.innerHTML = `
                <div class="member-card-inner">
                    <div class="member-card-front">
                        <div class="card-header">
                            <img src="${member.photo}" alt="Foto ${member.name}" class="profile-img">
                            <div class="profile-info">
                                <h2>${member.name}</h2>
                                <span class="profile-role">${member.role}</span>
                            </div>
                        </div>
                        
                        <div class="card-body">
                            <h3 class="section-title">Tentang Saya</h3>
                            <p class="about-text" title="${member.about}">${member.about}</p>
                            
                            <h3 class="section-title">Motivasi</h3>
                            <p class="motivation-preview">"${member.motivation}"</p>
                            <button class="flip-hint" type="button">Klik kartu untuk melihat motivasi lengkap</button>
                        </div>
                        
                        <div class="card-footer">
                            <div class="social-links">
                                ${member.socials.github ? `<a href="${member.socials.github}" target="_blank" class="social-icon" title="GitHub"><i class="fa-brands fa-github"></i></a>` : ''}
                                ${member.socials.linkedin ? `<a href="${member.socials.linkedin}" target="_blank" class="social-icon" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>` : ''}
                                ${member.socials.instagram ? `<a href="${member.socials.instagram}" target="_blank" class="social-icon" title="Instagram"><i class="fa-brands fa-instagram"></i></a>` : ''}
                            </div>
                            <div class="cert-gallery">
                                ${certsHTML}
                            </div>
                        </div>
                    </div>
                    <div class="member-card-back">
                        <span class="back-label">Motivasi</span>
                        <blockquote>"${member.motivation}"</blockquote>
                        <span class="back-name">— ${member.name}</span>
                        <button class="flip-hint back-hint" type="button">Klik untuk kembali</button>
                    </div>
                </div>
            `;
            card.setAttribute("role", "button");
            card.setAttribute("tabindex", "0");
            card.setAttribute("aria-label", `Balik kartu ${member.name}`);
            
            memberGrid.appendChild(card);
        });
    }

    // 2. Modal Logic for Certificates
    const modal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("cert-image");
    const captionText = document.getElementById("cert-caption");
    const closeModal = document.querySelector(".modal-close");

    // Group photo slideshow
    const groupShowcase = document.querySelector(".group-showcase");
    if (groupShowcase) {
        const slides = Array.from(groupShowcase.querySelectorAll(".group-slide"));
        const dots = Array.from(groupShowcase.querySelectorAll(".group-dot"));
        let currentSlide = 0;
        let slideshowTimer;

        const showSlide = (index) => {
            currentSlide = (index + slides.length) % slides.length;
            slides.forEach((slide, slideIndex) => {
                slide.classList.toggle("active", slideIndex === currentSlide);
            });
            dots.forEach((dot, dotIndex) => {
                dot.classList.toggle("active", dotIndex === currentSlide);
            });
        };

        const startSlideshow = () => {
            clearInterval(slideshowTimer);
            slideshowTimer = setInterval(() => showSlide(currentSlide + 1), 4500);
        };

        groupShowcase.querySelector(".group-prev")?.addEventListener("click", () => {
            showSlide(currentSlide - 1);
            startSlideshow();
        });

        groupShowcase.querySelector(".group-next")?.addEventListener("click", () => {
            showSlide(currentSlide + 1);
            startSlideshow();
        });

        dots.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                showSlide(index);
                startSlideshow();
            });
        });

        groupShowcase.addEventListener("mouseenter", () => clearInterval(slideshowTimer));
        groupShowcase.addEventListener("mouseleave", startSlideshow);
        startSlideshow();
    }

    // Flip whole member cards
    document.addEventListener("click", function(e) {
        if (e.target.closest(".cert-thumb")) {
            return;
        }

        if (e.target.closest(".social-icon, .flip-hint")) {
            if (e.target.closest(".flip-hint")) {
                const card = e.target.closest(".member-card");
                card?.classList.toggle("is-flipped");
            }
            return;
        }

        const card = e.target.closest(".member-card");
        if (card) {
            card.classList.toggle("is-flipped");
        }
    });

    document.addEventListener("keydown", function(e) {
        if ((e.key === "Enter" || e.key === " ") && e.target.classList.contains("member-card")) {
            e.preventDefault();
            e.target.classList.toggle("is-flipped");
        }
    });

    // Open Modal (Event Delegation for dynamic elements)
    document.addEventListener("click", function(e) {
        if (e.target && e.target.classList.contains("cert-thumb")) {
            modal.style.display = "block";
            // Small delay to allow display:block to apply before adding class for opacity transition
            setTimeout(() => {
                modal.classList.add("show");
            }, 10);
            
            modalImg.src = e.target.getAttribute("data-full");
            captionText.innerHTML = e.target.getAttribute("data-title");
        }
    });

    // Close Modal on Button Click
    if (closeModal) {
        closeModal.onclick = function() {
            closeModalHandler();
        }
    }

    // Close Modal on Outside Click
    window.onclick = function(event) {
        if (event.target === modal) {
            closeModalHandler();
        }
    }

    function closeModalHandler() {
        modal.classList.remove("show");
        // Wait for fade out animation before hiding completely
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
});
