window.addEventListener('load', () => {
    // Logika animasi yang sudah ada
    const cardContainer = document.querySelector('.card-container');
    cardContainer.classList.add('loaded');

    // =================================================================
    // === LOGIKA FINAL UNTUK PASSWORD BERBEDA DI SETIAP TOMBOL =========
    // =================================================================

    // --- Pilih semua elemen dari HTML ---
    const semuaTombolProteksi = document.querySelectorAll('.proteksi');
    const modalOverlay = document.getElementById('password-modal-overlay');
    const passwordForm = document.getElementById('password-form');
    const successMessage = document.getElementById('success-message');
    const passwordInput = document.getElementById('password-input');
    const submitBtn = document.getElementById('submit-password-btn');
    const cancelBtn = document.getElementById('cancel-password-btn');
    const errorMessage = document.getElementById('error-message');

    // Variabel untuk menyimpan info dari tombol yang diklik
    let urlTujuanSaatIni = '';
    let passwordBenarSaatIni = ''; // Variabel baru untuk password

    // --- Fungsi untuk menampilkan & menyembunyikan modal ---
    function tampilkanModal() {
        passwordForm.style.display = 'block';
        successMessage.style.display = 'none';
        modalOverlay.classList.remove('modal-hidden');
        setTimeout(() => {
            modalOverlay.classList.add('visible');
            passwordInput.focus();
        }, 10);
    }

    function sembunyikanModal() {
        modalOverlay.classList.remove('visible');
         setTimeout(() => {
            modalOverlay.classList.add('modal-hidden');
            passwordInput.value = '';
            errorMessage.textContent = '';
        }, 300);
    }

    // --- Event Listener ---

    // 1. Loop untuk setiap tombol yang punya kelas .proteksi
    semuaTombolProteksi.forEach(tombol => {
        tombol.addEventListener('click', function(event) {
            event.preventDefault();
            // Ambil URL DAN PASSWORD dari atribut data tombol yang diklik
            urlTujuanSaatIni = tombol.dataset.url;
            passwordBenarSaatIni = tombol.dataset.password; // <-- BARIS BARU
            // Tampilkan modal
            tampilkanModal();
        });
    });

    // 2. Saat tombol "Lanjutkan" di dalam modal diklik
    submitBtn.addEventListener('click', function() {
        const passwordMasukan = passwordInput.value;

        // Bandingkan dengan password dari tombol yang diklik
        if (passwordMasukan === passwordBenarSaatIni) { // <-- PERUBAHAN DI SINI
            // Tampilkan pesan sukses
            passwordForm.style.display = 'none';
            successMessage.style.display = 'block';

            // Tunggu 2 detik, lalu arahkan ke URL yang sesuai
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
    
    // 3. Memungkinkan menekan "Enter"
    passwordInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            submitBtn.click();
        }
    });

    // 4. Saat tombol "Batal" diklik
    cancelBtn.addEventListener('click', sembunyikanModal);

    // 5. Saat area gelap di luar kotak modal diklik
    modalOverlay.addEventListener('click', function(event) {
        if (event.target === modalOverlay) {
            sembunyikanModal();
        }
    });
});