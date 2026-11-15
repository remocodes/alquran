document.addEventListener('DOMContentLoaded', () => {
    // استهداف كروت الباقات فقط (.pricing-card, .ind-card) لتجنب التأثير على الكروت العلوية من نحن/رسالتنا
    const packageCards = document.querySelectorAll('.pricing-card, .ind-card');

    packageCards.forEach(card => {
        card.classList.remove('selected');
        card.addEventListener('click', function () {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                packageCards.forEach(c => c.classList.remove('selected'));
                this.classList.add('selected');
            }
        });
    });

    // ربط زر مبادرة صحبة القرآن في صفحة about برابط واتساب الإدارة مباشرة
    const initiativeBtn = document.getElementById('initiativeWhatsAppBtn');
    if (initiativeBtn && window.APP_CONSTANTS && window.APP_CONSTANTS.linkRequestJoin) {
        initiativeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const message = "السلام عليكم ورحمة الله وبركاته 🌿\nأرغب في الاستفسار بخصوص مبادرة صحبة القرآن للاشتراكات المجانية لغير القادرين ماديًا.\nجزاكم الله خيرًا.";
            const whatsappURL = `${window.APP_CONSTANTS.linkRequestJoin}?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    }
});