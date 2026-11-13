document.addEventListener('DOMContentLoaded', () => {
    const allCards = document.querySelectorAll('.card');

    // إزالة أي تحديد افتراضي عند فتح الصفحة للتأكد من عدم اختيار أي باقة مسبقاً
    allCards.forEach(card => {
        card.classList.remove('selected');
        card.addEventListener('click', function () {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
            } else {
                allCards.forEach(c => c.classList.remove('selected'));
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