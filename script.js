
/* =====================================
   1. اختيار نوع الطلب من الكروت
===================================== */
function selectCard(element, inputId, value) {
    // إزالة التحديد من جميع كروت نوع الطلب
    document.querySelectorAll('.choice-card').forEach(card => {
        card.classList.remove('selected');
        card.setAttribute('aria-pressed', 'false');
    });

    // تحديد الكارت الذي تم الضغط عليه
    element.classList.add('selected');
    element.setAttribute('aria-pressed', 'true');

    // تحديث قيمة نوع الطلب
    const input = document.getElementById(inputId);

    if (input) {
        input.value = value;
    } else {
        console.error('لم يتم العثور على الحقل:', inputId);
    }
}


/* =====================================
   2. اختيار طريقة التسميع
===================================== */
function selectMethod(element, value) {
    // إزالة التحديد من جميع طرق التسميع
    document.querySelectorAll('.method-card').forEach(card => {
        card.classList.remove('selected');
        card.setAttribute('aria-pressed', 'false');
    });

    // تحديد الطريقة المختارة
    element.classList.add('selected');
    element.setAttribute('aria-pressed', 'true');

    // تحديث قيمة طريقة التسميع
    const input = document.getElementById('method_type');

    if (input) {
        input.value = value;
    } else {
        console.error('لم يتم العثور على الحقل: method_type');
    }
}


/* =====================================
   3. إرسال طلب الالتحاق إلى واتساب
===================================== */
function sendToWhatsApp(e) {
    if (e) {
        e.preventDefault();
    }

    // البيانات الشخصية
    const name = document.getElementById('fullname')?.value.trim() || '';
    const age = document.getElementById('age')?.value.trim() || '';
    const phone = document.getElementById('phone')?.value.trim() || '';

    // المستوى الحالي
    const selectedLevel = document.querySelector('input[name="level"]:checked');
    const level = selectedLevel ? selectedLevel.value : '';

    // مقدار الحفظ الحالي
    const currentHifz =
        document.getElementById('current_hifz')?.value.trim() || 'لا يوجد';

    // نوع الطلب
    const requestType =
        document.getElementById('request_type')?.value || '';

    // الأيام والأوقات المناسبة
    const days = document.getElementById('days')?.value.trim() || '';
    const times = document.getElementById('times')?.value.trim() || '';

    // طريقة التسميع
    const method =
        document.getElementById('method_type')?.value || '';

    // التأكد من ملء البيانات المطلوبة
    if (!name || !age || !phone || !level || !days || !times) {
        alert('برجاء ملء جميع الحقول المطلوبة أولاً!');
        return;
    }

    if (!requestType) {
        alert('برجاء اختيار نوع الطلب أولاً!');
        return;
    }

    if (!method) {
        alert('برجاء اختيار طريقة التسميع أولاً!');
        return;
    }

    // رقم واتساب المسؤول، غيّريه إلى الرقم الصحيح
    // اكتبي الرقم بكود الدولة من غير + أو مسافات
    const targetPhone = '201000000000';

    // تكوين رسالة الطلب
    const message =
        `*طلب التحاق جديد - صُحبة القرآن* 📖\n\n` +
        `*1. البيانات الشخصية:*\n` +
        `• الاسم: ${name}\n` +
        `• السن: ${age}\n` +
        `• رقم الهاتف: ${phone}\n` +
        `• المستوى: ${level}\n` +
        `• المقدار الحالي: ${currentHifz}\n\n` +
        `*2. نوع الطلب:*\n` +
        `• ${requestType}\n\n` +
        `*3. الوقت المناسب:*\n` +
        `• الأيام: ${days}\n` +
        `• الأوقات: ${times}\n\n` +
        `*4. طريقة التسميع:*\n` +
        `• ${method}`;

    // ترميز الرسالة بطريقة صحيحة للرابط
    const whatsappUrl =
        `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

    // فتح واتساب بالرسالة
    window.open(whatsappUrl, '_blank');
}
