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
                    <p class="motivation-text">"${member.motivation}"</p>
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
            `;
            
            memberGrid.appendChild(card);
        });
    }

    // 2. Modal Logic for Certificates
    const modal = document.getElementById("cert-modal");
    const modalImg = document.getElementById("cert-image");
    const captionText = document.getElementById("cert-caption");
    const closeModal = document.querySelector(".modal-close");

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
