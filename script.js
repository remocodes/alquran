const requestForm = document.getElementById("requestForm");
// قراءة رابط واتساب من ملف الثوابت.
const linkRequestJoin = window.APP_CONSTANTS ? window.APP_CONSTANTS.linkRequestJoin : "";

if (requestForm) {
  // منع إرسال الفورم بالطريقة الافتراضية.
  requestForm.addEventListener("submit", handleRequestSubmit);
}

// إضافة رسالة خطأ أسفل العنصر المطلوب.
function showError(target, message, type = "field") {
  clearError(target);

  const error = document.createElement("span");
  error.className = type === "choice" ? "choice-error" : "field-error";

  const icon = document.createElement("span");
  icon.className = "error-icon";
  icon.textContent = " ⚠️ ";

  error.appendChild(icon);
  error.appendChild(document.createTextNode(message));

  target.insertAdjacentElement("afterend", error);

  const input = target.querySelector("input") || target;
  if (input instanceof HTMLElement) {
    input.classList.add("input-error");
    input.setAttribute("aria-invalid", "true");
  }
}

// إزالة رسالة الخطأ عند تصحيح البيانات.
function clearError(target) {
  const next = target.nextElementSibling;

  if (
    next &&
    (next.classList.contains("field-error") ||
      next.classList.contains("choice-error"))
  ) {
    next.remove();
  }

  const input = target.querySelector("input") || target;

  if (input && input.classList) {
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
  }
}

// إظهار الخطأ عند ترك الحقول النصية فارغة.
function validateTextField(id, message) {
  const input = document.getElementById(id);
  if (!input) return true;

  clearError(input);

  if (!input.value.trim()) {
    showError(input, message);
    return false;
  }

  return true;
}

// التحقق من اختيار واحد على الأقل في مجموعة.
function validateGroup(selector, container, message) {
  clearError(container);

  const selected = requestForm.querySelector(selector);

  if (!selected) {
    showError(container, message, "group");
    return false;
  }

  return true;
}

// التحقق من مجموعات الاختيارات المتعددة.
function validateMultiple(selector, container, message) {
  clearError(container);

  const selected = requestForm.querySelector(selector);

  if (!selected) {
    showError(container, message, "group");
    return false;
  }

  return true;
}

// تحديث المظهر عند الاختيار.
document
  .querySelectorAll(".choice-card, .day-option")
  .forEach((card) => {
    const input = card.querySelector("input");

    if (!input) return;

    input.addEventListener("change", () => {
      if (input.type === "radio") {
        requestForm
          .querySelectorAll(`input[name="${input.name}"]`)
          .forEach((item) => {
            item.closest(".choice-card")?.classList.toggle(
              "is-selected",
              item.checked
            );
          });
      } else {
        card.classList.toggle("is-selected", input.checked);
      }

      // إزالة تنبيه المجموعة بعد إتمام الاختيار.
      if (input.name === "requestType") {
        const reqEl = requestForm.querySelector('input[name="requestType"]');
        if (reqEl) clearError(reqEl.closest(".question-block"));
      }

      if (input.name === "selectedPackage") {
        const pkgEl = requestForm.querySelector('input[name="selectedPackage"]');
        if (pkgEl) clearError(pkgEl.closest(".question-block"));
      }

      if (input.name === "followMethod") {
        const folEl = requestForm.querySelector('input[name="followMethod"]');
        if (folEl) clearError(folEl.closest(".form-card"));
      }

      if (input.name === "goals") {
        const goalCard = card.closest(".form-card");
        if (goalCard) {
          const grid = goalCard.querySelector(".choice-grid");
          if (grid) clearError(grid);
        }
      }

      if (input.name === "days") {
        const dayBlock = card.closest(".question-block");
        if (dayBlock) {
          const daysGrid = dayBlock.querySelector(".days-grid");
          if (daysGrid) clearError(daysGrid);
        }
      }

      if (input.name === "times") {
        const timeBlock = card.closest(".question-block");
        if (timeBlock) {
          const timeGrid = timeBlock.querySelector(".time-grid");
          if (timeGrid) clearError(timeGrid);
        }
      }
    });
  });

// إزالة تنبيه الحقول النصية بمجرد تعديلها.
["studentName", "studentAge", "studentPhone"].forEach((id) => {
  const input = document.getElementById(id);
  if (input) {
    input.addEventListener("input", () => {
      clearError(input);
    });
  }
});

function handleRequestSubmit(event) {
  event.preventDefault();

  // تنظيف رسائل التحقق القديمة قبل إعادة الفحص.
  requestForm.querySelectorAll(
    ".field-error, .choice-error"
  ).forEach((error) => error.remove());

  requestForm.querySelectorAll(".input-error").forEach((input) => {
    input.classList.remove("input-error");
    input.removeAttribute("aria-invalid");
  });

  let isValid = true;
  let firstInvalidElement = null;

  function check(result, element) {
    if (!result) {
      isValid = false;
      if (!firstInvalidElement) {
        firstInvalidElement = element;
      }
    }
  }

  const nameInput = document.getElementById("studentName");
  const ageInput = document.getElementById("studentAge");
  const phoneInput = document.getElementById("studentPhone");

  const studentName = nameInput ? nameInput.value.trim() : "";
  const studentAge = ageInput ? ageInput.value.trim() : "";
  const studentPhone = phoneInput ? phoneInput.value.trim() : "";

  // 1. الاسم.
  check(
    validateTextField("studentName", "من فضلك اكتب الاسم بالكامل."),
    nameInput
  );

  // 2. السن.
  let ageValid = validateTextField(
    "studentAge",
    "من فضلك أدخل السن."
  );

  if (
    ageValid &&
    (!Number.isFinite(Number(studentAge)) ||
      Number(studentAge) < 4 ||
      Number(studentAge) > 100)
  ) {
    showError(ageInput, "السن يجب أن يكون بين 4 و100 سنة.");
    ageValid = false;
  }

  check(ageValid, ageInput);

  // 3. رقم هاتف الطالب.
  let phoneValid = validateTextField(
    "studentPhone",
    "من فضلك أدخل رقم الهاتف."
  );

  if (
    phoneValid &&
    !/^[0-9+\s()-]{7,20}$/.test(studentPhone)
  ) {
    showError(phoneInput, "من فضلك أدخل رقم هاتف صحيحًا.");
    phoneValid = false;
  }

  check(phoneValid, phoneInput);

  // 4. نوع طلب الالتحاق: اختيار واحد.
  const reqTypeRadio = requestForm.querySelector('input[name="requestType"]');
  if (reqTypeRadio) {
    const requestTypeContainer = reqTypeRadio.closest(".question-block");
    check(
      validateGroup(
        'input[name="requestType"]:checked',
        requestTypeContainer,
        "من فضلك اختر نوع طلب الالتحاق."
      ),
      requestTypeContainer
    );
  }

  // 4.5. اختيار الباقة: اختيار واحد مطلوب.
  const pkgRadio = requestForm.querySelector('input[name="selectedPackage"]');
  if (pkgRadio) {
    const packageContainer = pkgRadio.closest(".question-block");
    check(
      validateGroup(
        'input[name="selectedPackage"]:checked',
        packageContainer,
        "من فضلك اختر الباقة المناسبة."
      ),
      packageContainer
    );
  }

  // 5. أهداف الالتحاق.
  const goalsInput = requestForm.querySelector('input[name="goals"]');
  if (goalsInput) {
    const goalsContainer = goalsInput.closest(".choice-grid");
    check(
      validateMultiple(
        'input[name="goals"]:checked',
        goalsContainer,
        "من فضلك اختر هدفًا واحدًا على الأقل."
      ),
      goalsContainer
    );
  }

  // 6. الأيام.
  const daysContainer = requestForm.querySelector(".days-grid");
  if (daysContainer) {
    check(
      validateMultiple(
        'input[name="days"]:checked',
        daysContainer,
        "من فضلك اختر يومًا واحدًا على الأقل."
      ),
      daysContainer
    );
  }

  // 7. الأوقات.
  const timesContainer = requestForm.querySelector(".time-grid");
  if (timesContainer) {
    check(
      validateMultiple(
        'input[name="times"]:checked',
        timesContainer,
        "من فضلك اختر وقتًا واحدًا على الأقل."
      ),
      timesContainer
    );
  }

  // 8. طريقة المتابعة.
  const followRadio = requestForm.querySelector('input[name="followMethod"]');
  if (followRadio) {
    const followMethodContainer = followRadio.closest(".form-card");
    check(
      validateGroup(
        'input[name="followMethod"]:checked',
        followMethodContainer,
        "من فضلك اختر طريقة المتابعة."
      ),
      followMethodContainer
    );
  }

  // منع الإرسال إذا كانت هناك بيانات ناقصة.
  if (!isValid) {
    firstInvalidElement?.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    if (
      firstInvalidElement instanceof HTMLInputElement
    ) {
      firstInvalidElement.focus({ preventScroll: true });
    }

    return;
  }

  // التحقق من رابط واتساب المحفظ.
  const activeLink = window.APP_CONSTANTS ? window.APP_CONSTANTS.linkRequestJoin : "";
  if (!/^https:\/\/wa\.me\/20\d{10,11}$/.test(activeLink)) {
    alert(
      "من فضلك اضبط رابط واتساب المحفظ في ملف appConstants.js."
    );
    return;
  }

  // جمع الاختيارات.
  const reqChecked = requestForm.querySelector('input[name="requestType"]:checked');
  const requestType = reqChecked ? reqChecked.value : "";

  const pkgChecked = requestForm.querySelector('input[name="selectedPackage"]:checked');
  const selectedPackage = pkgChecked ? pkgChecked.value : "";

  const goals = [
    ...requestForm.querySelectorAll('input[name="goals"]:checked')
  ].map((input) => input.value);

  const days = [
    ...requestForm.querySelectorAll('input[name="days"]:checked')
  ].map((input) => input.value);

  const times = [
    ...requestForm.querySelectorAll('input[name="times"]:checked')
  ].map((input) => input.value);

  const followChecked = requestForm.querySelector('input[name="followMethod"]:checked');
  const followMethod = followChecked ? followChecked.value : "";

  // إنشاء رسالة واتساب منظمة.
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
    `📖 نوع الطلب: ${requestType}`,
    `⭐ الباقة المختارة: ${selectedPackage}`,
    `🎯 أهداف الالتحاق: ${goals.join("، ")}`,
    `📅 الأيام المناسبة: ${days.join("، ")}`,
    `🕒 الأوقات المناسبة: ${times.join("، ")}`,
    `🎧 طريقة المتابعة: ${followMethod}`,
    "",
    "جزاكم الله خيرًا."
  ].join("\n");

  const whatsappURL = `${activeLink}?text=${encodeURIComponent(message)}`;
  
  // فتح واتساب برسالة جاهزة للمراجعة والإرسال.
  const whatsappWindow = window.open(
    whatsappURL,
    "_blank"
  );

  if (!whatsappWindow) {
    alert(
      "تعذر فتح واتساب. اسمحي بفتح النوافذ المنبثقة لهذا الموقع ثم حاولي مرة أخرى."
    );
  }
}