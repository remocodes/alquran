
const requestForm = document.getElementById("requestForm");

// استبدلي الرقم التالي برقم واتساب الاستقبال الحقيقي.
// مثال تنسيقي لمصر: 2010XXXXXXXX
const WHATSAPP_NUMBER = "201XXXXXXXXX";

// تحديث شكل الاختيارات عند الضغط عليها.
// لا يوجد أي اختيار محدد افتراضيًا.
document.querySelectorAll(".choice-card, .day-option").forEach((card) => {
  const input = card.querySelector("input");

  input.addEventListener("change", () => {
    const groupName = input.name;

    // في radio: اختيار واحد فقط داخل المجموعة.
    if (input.type === "radio") {
      document
        .querySelectorAll(`input[name="${groupName}"]`)
        .forEach((item) => {
          item.closest(".choice-card")?.classList.toggle(
            "is-selected",
            item.checked
          );
        });
    } else {
      // في checkbox: كل اختيار مستقل.
      card.classList.toggle("is-selected", input.checked);
    }
  });
});

// تحديث شكل أيام الأسبوع.
document.querySelectorAll(".day-option input").forEach((input) => {
  input.addEventListener("change", () => {
    input.closest(".day-option").classList.toggle(
      "is-selected",
      input.checked
    );
  });
});

requestForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const studentName = document
    .getElementById("studentName").value.trim();

  const studentAge = document
    .getElementById("studentAge").value.trim();

  const studentPhone = document
    .getElementById("studentPhone").value.trim();

  const requestType = requestForm.querySelector(
    'input[name="requestType"]:checked'
  );

  const goals = [
    ...requestForm.querySelectorAll('input[name="goals"]:checked')
  ].map((input) => input.value);

  const days = [
    ...requestForm.querySelectorAll('input[name="days"]:checked')
  ].map((input) => input.value);

  const times = [
    ...requestForm.querySelectorAll('input[name="times"]:checked')
  ].map((input) => input.value);

  const followMethod = requestForm.querySelector(
    'input[name="followMethod"]:checked'
  );

  // التحقق من الحقول المطلوبة.
  if (
    !studentName ||
    !studentAge ||
    !studentPhone ||
    !requestType ||
    !followMethod
  ) {
    alert("من فضلك أكمل البيانات المطلوبة واختر نوع الطلب وطريقة المتابعة.");
    return;
  }

  if (goals.length === 0) {
    alert("من فضلك اختر هدفًا واحدًا على الأقل من الالتحاق.");
    return;
  }

  if (days.length === 0) {
    alert("من فضلك اختر يومًا واحدًا على الأقل يناسبك.");
    return;
  }

  if (times.length === 0) {
    alert("من فضلك اختر وقتًا واحدًا على الأقل يناسبك.");
    return;
  }

  if (!/^[0-9+\s()-]{7,20}$/.test(studentPhone)) {
    alert("من فضلك أدخل رقم هاتف صحيحًا.");
    return;
  }

  // التأكد من تغيير رقم واتساب الافتراضي.
  if (!/^20\d{10,11}$/.test(WHATSAPP_NUMBER)) {
    alert("يجب ضبط رقم واتساب الاستقبال داخل ملف script.js أولًا.");
    return;
  }

  // تجهيز رسالة الطلب.
  const message = [
    "السلام عليكم ورحمة الله وبركاته 🌿",
    "",
    "أرغب في تقديم طلب التحاق بصُحبة القرآن.",
    "",
    "📋 بيانات الطالب:",
    `الاسم: ${studentName}`,
    `السن: ${studentAge}`,
    `رقم الهاتف: ${studentPhone}`,
    "",
    `📖 نوع الطلب: ${requestType.value}`,
    `🎯 أهداف الالتحاق: ${goals.join("، ")}`,
    `📅 الأيام المناسبة: ${days.join("، ")}`,
    `🕒 الأوقات المناسبة: ${times.join("، ")}`,
    `🎧 طريقة المتابعة: ${followMethod.value}`,
    "",
    "جزاكم الله خيرًا."
  ].join("\n");

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  // فتح واتساب مرة واحدة برسالة جاهزة.
  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
