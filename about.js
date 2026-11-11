  document.addEventListener('DOMContentLoaded', () => {
            const allCards = document.querySelectorAll('.card');

            allCards.forEach(card => {
                card.addEventListener('click', function () {
                    if (this.classList.contains('selected')) {
                        this.classList.remove('selected');
                    } else {
                        allCards.forEach(c => c.classList.remove('selected'));
                        this.classList.add('selected');
                    }
                });
            });
        });