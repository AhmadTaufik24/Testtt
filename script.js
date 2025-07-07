// --- Fungsi Perbaikan Tinggi Layar di HP ---
const setAppHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
};
window.addEventListener('resize', setAppHeight);
setAppHeight();



const card = document.querySelector('.card-container');

if (card) {
    card.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = card.getBoundingClientRect();
        
        const x = clientX - left;
        const y = clientY - top;

        const rotateX = (y - height / 2) / (height / 2) * -7; // Rotasi sumbu X (maks 7 derajat)
        const rotateY = (x - width / 2) / (width / 2) * 7; // Rotasi sumbu Y (maks 7 derajat)

        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0deg) rotateY(0deg)'; // Kembali ke posisi normal
    });
}


// --- Kode Lama Anda (untuk animasi, modal, dll) ---
window.addEventListener('load', () => {
    // Fungsi Animasi Awal
    const cardContainer = document.querySelector('.card-container');
    if (cardContainer) {
        cardContainer.classList.add('loaded');
    }

    // Fungsi Modal Password
    const semuaTombolProteksi = document.querySelectorAll('.proteksi');
    const modalOverlay = document.getElementById('password-modal-overlay');
    const passwordForm = document.getElementById('password-form');
    const successMessage = document.getElementById('success-message');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-password-btn');
    const cancelBtn = document.getElementById('cancel-password-btn');
    const errorMessage = document.getElementById('error-message');

    let urlTujuanSaatIni = '';
    let passwordBenarSaatIni = '';

    function tampilkanModal() {
        if (!modalOverlay) return;
        passwordForm.style.display = 'block';
        successMessage.style.display = 'none';
        modalOverlay.classList.remove('modal-hidden');
        setTimeout(() => {
            modalOverlay.classList.add('visible');
            passwordInput.focus();
        }, 10);
    }

    function sembunyikanModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('visible');
        setTimeout(() => {
            modalOverlay.classList.add('modal-hidden');
            passwordInput.value = '';
            errorMessage.textContent = '';
        }, 300);
    }

    semuaTombolProteksi.forEach(tombol => {
        tombol.addEventListener('click', function(event) {
            event.preventDefault();
            urlTujuanSaatIni = tombol.dataset.url;
            passwordBenarSaatIni = tombol.dataset.password;
            tampilkanModal();
        });
    });

    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const passwordMasukan = passwordInput.value;
            if (passwordMasukan === passwordBenarSaatIni) {
                passwordForm.style.display = 'none';
                successMessage.style.display = 'block';
                setTimeout(() => {
                    sembunyikanModal();
                    setTimeout(() => {
                        window.location.href = urlTujuanSaatIni;
                    }, 300);
                }, 2000);
            } else {
                errorMessage.textContent = 'Password salah, coba lagi.';
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }

    if (passwordInput) {
        passwordInput.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                submitBtn.click();
            }
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', sembunyikanModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', function(event) {
            if (event.target === modalOverlay) {
                sembunyikanModal();
            }
        });
    }
});  