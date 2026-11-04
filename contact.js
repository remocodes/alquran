
// رابط واتساب التجريبي
const CONTACT_WHATSAPP_URL = "https://wa.me/201065155293";

// عناصر الفورم
const contactForm = document.getElementById("contactForm");

const contactName = document.getElementById("contactName");
const contactEmail = document.getElementById("contactEmail");
const contactPhone = document.getElementById("contactPhone");
const contactMessage = document.getElementById("contactMessage");


// ==============================
// إظهار رسالة التحذير
// ==============================

function showContactError(input, message) {

    // إزالة التحذير القديم أولاً
    clearContactError(input);

    // إضافة شكل الحقل غير الصحيح
    input.classList.add("invalid");
    input.setAttribute("aria-invalid", "true");

    // إنشاء رسالة التحذير
    const error = document.createElement("span");

    error.className = "contact-error";

    // إنشاء أيقونة التحذير
    const icon = document.createElement("span");

    icon.className = "contact-error-icon";
    icon.textContent = "⚠️";

    // إنشاء نص الرسالة
    const errorText = document.createElement("span");

    errorText.textContent = message;

    // إضافة الأيقونة والنص
    error.appendChild(icon);
    error.appendChild(errorText);

    // وضع التحذير أسفل الحقل مباشرة
    input.insertAdjacentElement("afterend", error);
}


// ==============================
// إزالة رسالة التحذير
// ==============================

function clearContactError(input) {

    input.classList.remove("invalid");
    input.removeAttribute("aria-invalid");

    const next = input.nextElementSibling;

    if (next && next.classList.contains("contact-error")) {
        next.remove();
    }
}


// ==============================
// التحقق من صحة الحقول
// ==============================

function validateContactField(input, message) {

    const value = input.value.trim();

    // التحقق من أن الحقل ليس فارغاً
    if (!value) {

        showContactError(input, message);
        return false;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!input.checkValidity()) {

        showContactError(input, message);
        return false;
    }

    // إزالة التحذير إذا كانت البيانات صحيحة
    clearContactError(input);

    return true;
}


// ==============================
// إزالة التحذير أثناء الكتابة
// ==============================

[contactName, contactEmail, contactMessage].forEach(input => {

    input.addEventListener("input", function () {

        const value = input.value.trim();

        if (value && input.checkValidity()) {
            clearContactError(input);
        }

    });

});


// ==============================
// عند إرسال الرسالة
// ==============================

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    let isValid = true;

    // التحقق من الاسم
    if (!validateContactField(
        contactName,
        "من فضلك اكتبي اسمك بالكامل."
    )) {

        isValid = false;
    }


    // التحقق من البريد الإلكتروني
    if (!validateContactField(
        contactEmail,
        "من فضلك أدخلي بريدًا إلكترونيًا صحيحًا."
    )) {

        isValid = false;
    }


    // التحقق من نص الرسالة
    if (!validateContactField(
        contactMessage,
        "من فضلك اكتبي نص الرسالة."
    )) {

        isValid = false;
    }


    // إيقاف الإرسال عند وجود أخطاء
    if (!isValid) {

        const firstError = contactForm.querySelector(".invalid");

        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        return;
    }


    // ==============================
    // قراءة البيانات
    // ==============================

    const name = contactName.value.trim();
    const email = contactEmail.value.trim();
    const phone = contactPhone.value.trim();
    const message = contactMessage.value.trim();


    // ==============================
    // تجهيز رسالة واتساب
    // ==============================

    const whatsappMessage = `
السلام عليكم ورحمة الله وبركاته 🌿

رسالة جديدة من صفحة تواصل معنا - صُحبة القرآن

الاسم: ${name}

البريد الإلكتروني: ${email}

رقم الهاتف: ${phone || "لم يتم إدخاله"}

نص الرسالة:
${message}

نسعد بخدمتكم 🤍
    `;


    // ==============================
    // تجهيز رابط واتساب
    // ==============================

    const whatsappURL =
        `${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(whatsappMessage)}`;


    // ==============================
    // فتح واتساب
    // ==============================

    window.open(whatsappURL, "_blank");

});
