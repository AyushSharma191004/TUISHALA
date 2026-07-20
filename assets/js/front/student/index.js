
//  * Navbar Component Logic
//  *
//  * WHAT THIS JS DOES:
//  * 1. Active link highlighting — adds "active" class to current page link
//  * 2. Dropdown backdrop — shows dark overlay when user menu opens
//  * 3. Click outside to close — clicking backdrop closes the dropdown
//  * 4. Scroll lock — prevents page scroll when dropdown is open
//  *
//  * FIXES APPLIED:
//  * - Auto-initializes on DOM ready (no manual call needed)
//  * - Removed manual toggler code (Bootstrap 5 handles collapse natively)
//  * - Active-link matching now works with both absolute and relative hrefs
 

function initNavbar(container) {
  if (!container) container = document;

  /* 1. Active link highlighting */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  container.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkPage = href.split('/').pop();
    if (linkPage === currentPage || href === window.location.pathname) {
      link.classList.add('active');
    }
  });

  /* 2. User Dropdown Backdrop Logic */
  const userDropdown = container.querySelector('.nb-user-dropdown');
  const backdrop = document.getElementById('nbPageBackdrop');

  if (userDropdown && backdrop) {
    // When dropdown OPENS → show dark backdrop
    userDropdown.addEventListener('show.bs.dropdown', () => {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    // When dropdown CLOSES → hide backdrop
    userDropdown.addEventListener('hide.bs.dropdown', () => {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    });

    // Click on backdrop → close dropdown
    backdrop.addEventListener('click', () => {
      const dropdownToggle = userDropdown.querySelector('[data-bs-toggle="dropdown"]');
      if (dropdownToggle) {
        bootstrap.Dropdown.getInstance(dropdownToggle)?.hide();
      }
    });
  }

  console.log('✅ Navbar initialized');
}

/* Auto-run when DOM is ready */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => initNavbar(document));
} else {
  initNavbar(document);
}
// navbar component end

// dark stats section number increase 0->50000
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
  const target = +counter.getAttribute('data-target');
  let count = 0;

  const increment = target / 150; // speed control

  const updateCounter = () => {
    count += increment;

    if (count < target) {
      counter.innerText = Math.floor(count).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = target.toLocaleString();
    }
  };

  updateCounter();
});

// phone icon
 (function() {
    // Fully responsive widget control with smooth close/open and localstorage persistence
    const widget = document.getElementById('callWidget');
    const closeBtn = document.getElementById('closeWidgetBtn');
    const speechBubble = document.getElementById('speechBubble');
    const callIcon = document.getElementById('callIconBtn');

    // Check localStorage for widget state (closed or open)
    let isWidgetVisible = true;
    if (localStorage.getItem('supportWidgetClosed') === 'true') {
        isWidgetVisible = false;
        if (speechBubble) speechBubble.style.display = 'none';
    }

    // Function to close widget (hide bubble)
    function closeWidget() {
        if (speechBubble) {
            speechBubble.style.display = 'none';
            localStorage.setItem('supportWidgetClosed', 'true');
            isWidgetVisible = false;
        }
    }

    // Function to reopen widget (show bubble) – optional, triggered by clicking call icon if needed
    function openWidget() {
        if (speechBubble) {
            speechBubble.style.display = 'block';
            localStorage.setItem('supportWidgetClosed', 'false');
            isWidgetVisible = true;
        }
    }

    // Toggle: clicking on call icon reopens the widget if it was closed
    if (callIcon) {
        callIcon.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!isWidgetVisible || (speechBubble && speechBubble.style.display === 'none')) {
                openWidget();
            } else {
                // If bubble is visible, you could also navigate to contact, but we keep as expand.
                // Optionally scroll into view for better UX.
                if (speechBubble) speechBubble.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });
    }

    // Close button action
    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            closeWidget();
        });
    }

    // On window resize, ensure no overlapping issues (just enforce position)
    window.addEventListener('resize', function() {
        // simple reflow guard, but already CSS handles responsiveness.
        if (window.innerWidth <= 576 && speechBubble && speechBubble.style.display !== 'none') {
            // ensure bubble still visible and not offscreen, but default css handles.
        }
    });

})();


//SING IN popup

// =========================
// TUISHALA SIGNUP MODAL JS
// Student & Employer Dual Flow
// =========================

// Global variable to track selected role
let p4SelectedRole = 'student';

// =========================
// STEP 0: Role Selection
// =========================
document.getElementById("roleContinue").addEventListener("click", () => {
    p4SelectedRole = document.querySelector('input[name="role"]:checked').value;
    console.log("Selected Role:", p4SelectedRole);

    // Hide step 0
    document.querySelector(".tuishala-step-0").classList.add("d-none");

    if (p4SelectedRole === 'student') {
        // Show student step 1
        document.querySelector(".tuishala-step-1").classList.remove("d-none");
        document.getElementById("step1Footer").style.display = "block";
    } else {
        // Show employer step 1
        document.querySelector(".p4-employer-step-1").classList.remove("d-none");
    }
});

// =========================
// BACK NAVIGATION
// =========================
function goBackStep0() {
    // Student back from step 1
    document.querySelector(".tuishala-step-1").classList.add("d-none");
    document.querySelector(".tuishala-step-0").classList.remove("d-none");
    document.getElementById("step1Footer").style.display = "none";
}

function p4GoBackToStep0() {
    // Employer back from step 1
    document.querySelector(".p4-employer-step-1").classList.add("d-none");
    document.querySelector(".tuishala-step-0").classList.remove("d-none");
}

function goBackStep1() {
    // Student back from step 2 to step 1
    document.querySelector(".tuishala-step-2").classList.add("d-none");
    document.querySelector(".tuishala-step-1").classList.remove("d-none");
    document.getElementById("step1Footer").style.display = "block";

    // Reset OTP fields when going back
    const otpInputs = document.querySelectorAll(".otp-boxes input");
    otpInputs.forEach(input => input.value = "");
    const otpBtn = document.getElementById("otpBtn");
    if (otpBtn) otpBtn.disabled = true;
}

function p4GoBackEmployerStep1() {
    // Employer back from step 2 to step 1
    document.querySelector(".p4-employer-step-2").classList.add("d-none");
    document.querySelector(".p4-employer-step-1").classList.remove("d-none");

    // Reset employer OTP fields
    const otpInputs = document.querySelectorAll(".p4-otp-input");
    otpInputs.forEach(input => input.value = "");
    const otpBtn = document.getElementById("p4EmployerOtpBtn");
    if (otpBtn) otpBtn.disabled = true;
}

// =========================
// STEP 1: Mobile Input (Student)
// =========================
const mobileInput = document.getElementById("mobileNumber");
const step1Btn = document.getElementById("step1Btn");

if (mobileInput) {
    mobileInput.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 10) {
            step1Btn.disabled = false;
        } else {
            step1Btn.disabled = true;
        }
    });
}

// =========================
// STEP 1: Mobile Input (Employer)
// =========================
const p4EmployerMobile = document.getElementById("p4EmployerMobile");
const p4EmployerStep1Btn = document.getElementById("p4EmployerStep1Btn");

if (p4EmployerMobile) {
    p4EmployerMobile.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
        if (this.value.length === 10) {
            p4EmployerStep1Btn.disabled = false;
        } else {
            p4EmployerStep1Btn.disabled = true;
        }
    });
}

// =========================
// STEP 1 -> STEP 2 (Student)
// =========================
function goToStep2() {
    const mobileValue = mobileInput.value;
    const displayNum = document.getElementById("displayMobile");
    if (displayNum) displayNum.innerText = mobileValue;

    document.querySelector(".tuishala-step-1").classList.add("d-none");
    document.querySelector(".tuishala-step-2").classList.remove("d-none");
    document.getElementById("step1Footer").style.display = "none";

    initOTP();
}

// =========================
// STEP 1 -> STEP 2 (Employer)
// =========================
function p4GoToEmployerStep2() {
    const mobileValue = p4EmployerMobile.value;
    const displayNum = document.getElementById("p4DisplayEmployerMobile");
    if (displayNum) displayNum.innerText = mobileValue;

    document.querySelector(".p4-employer-step-1").classList.add("d-none");
    document.querySelector(".p4-employer-step-2").classList.remove("d-none");

    p4InitEmployerOTP();
}

// =========================
// STEP 2: OTP Logic (Student)
// =========================
function initOTP() {
    const otpInputs = document.querySelectorAll(".otp-boxes input:not(.p4-otp-input)");
    const otpBtn = document.getElementById("otpBtn");

    if (otpBtn) otpBtn.disabled = true;

    otpInputs.forEach((input, index) => {
        input.addEventListener('focus', () => input.select());

        input.addEventListener("input", (e) => {
            input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
            if (input.value !== "" && otpInputs[index + 1]) {
                otpInputs[index + 1].focus();
            }
            validateOTP();
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && otpInputs[index - 1]) {
                otpInputs[index - 1].focus();
            }
        });
    });

    function validateOTP() {
        const isComplete = Array.from(otpInputs).every(input => input.value.length === 1);
        if (otpBtn) otpBtn.disabled = !isComplete;
    }
}

// =========================
// STEP 2: OTP Logic (Employer)
// =========================
function p4InitEmployerOTP() {
    const otpInputs = document.querySelectorAll(".p4-otp-input");
    const otpBtn = document.getElementById("p4EmployerOtpBtn");

    if (otpBtn) otpBtn.disabled = true;

    otpInputs.forEach((input, index) => {
        input.addEventListener('focus', () => input.select());

        input.addEventListener("input", (e) => {
            input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);
            if (input.value !== "" && otpInputs[index + 1]) {
                otpInputs[index + 1].focus();
            }
            p4ValidateEmployerOTP();
        });

        input.addEventListener("keydown", (e) => {
            if (e.key === "Backspace" && !input.value && otpInputs[index - 1]) {
                otpInputs[index - 1].focus();
            }
        });
    });

    function p4ValidateEmployerOTP() {
        const isComplete = Array.from(otpInputs).every(input => input.value.length === 1);
        if (otpBtn) otpBtn.disabled = !isComplete;
    }
}

// Resend OTP (shared)
function resendOTP() {
    console.log("Resending OTP...");
    alert("OTP has been resent!");
}

// =========================
// STEP 2 -> STEP 3 (Student)
// =========================
function goToStep3() {
    document.querySelector(".tuishala-step-2").classList.add("d-none");
    document.querySelector(".tuishala-step-3").classList.remove("d-none");

    // Reset validation states
    document.querySelectorAll(".profile-input-box").forEach(box => {
        box.classList.remove("is-invalid");
    });
    document.querySelectorAll(".gender-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    const genderInput = document.getElementById("gender");
    if (genderInput) genderInput.value = "";

    // Ensure button is disabled on entry
    if (profileContinueBtn) profileContinueBtn.disabled = true;

    // Attach listeners
    attachProfileListeners();
}

// =========================
// STEP 2 -> STEP 3 (Employer)
// =========================
function p4GoToEmployerStep3() {
    document.querySelector(".p4-employer-step-2").classList.add("d-none");
    document.querySelector(".p4-emp-step-3").classList.remove("d-none");

    // Reset validation states
    document.querySelectorAll(".p4-emp-input-box").forEach(box => {
        box.classList.remove("is-invalid");
    });
    document.querySelectorAll(".p4-emp-textarea-box").forEach(box => {
        box.classList.remove("is-invalid");
    });
    const terms = document.getElementById("p4EmpTerms");
    if (terms) terms.checked = false;

    // Ensure button is disabled on entry
    if (p4EmpSubmitBtn) p4EmpSubmitBtn.disabled = true;

    // Attach listeners
    attachEmployerProfileListeners();
}

// =========================
// STEP 3: COMPLETE PROFILE (Student)
// =========================
const profileImageInput = document.getElementById("profileImage");
const profilePreview = document.getElementById("profilePreview");

if (profileImageInput) {
    profileImageInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profilePreview.src = event.target.result;
                profilePreview.style.display = "block";
                validateProfileForm();
            };
            reader.readAsDataURL(file);
        }
    });
}

function selectGender(btn) {
    document.querySelectorAll(".gender-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    const genderInput = document.getElementById("gender");
    if (genderInput) {
        genderInput.value = btn.dataset.value;
    }
    validateProfileForm();
}

const dobInput = document.getElementById("dateOfBirth");

if (dobInput) {
    dobInput.addEventListener("input", function(e) {
        let value = this.value.replace(/[^0-9]/g, '');
        if (value.length >= 2 && value.length < 4) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        } else if (value.length >= 4) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/' + value.slice(4, 8);
        }
        this.value = value.slice(0, 10);
        if (isValidDate(this.value)) {
            this.parentElement.classList.remove("is-invalid");
        }
        validateProfileForm();
    });

    dobInput.addEventListener("blur", function() {
        if (!isValidDate(this.value)) {
            this.parentElement.classList.add("is-invalid");
        } else {
            this.parentElement.classList.remove("is-invalid");
        }
        validateProfileForm();
    });
}

function isValidDate(dateStr) {
    if (!dateStr) return false;
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!regex.test(dateStr)) return false;
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    return date.getDate() === day &&
           date.getMonth() === month - 1 &&
           date.getFullYear() === year &&
           date <= new Date();
}

const profileContinueBtn = document.getElementById("profileContinueBtn");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateProfileForm() {
    let isValid = true;

    const fullName = document.getElementById("fullName");
    const userEmail = document.getElementById("userEmail");
    const gender = document.getElementById("gender");
    const qualification = document.getElementById("qualification");
    const dateOfBirth = document.getElementById("dateOfBirth");
    const experienceLevel = document.getElementById("experienceLevel");

    if (fullName && !fullName.value.trim()) {
        fullName.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (fullName) {
        fullName.parentElement.classList.remove("is-invalid");
    }

    if (userEmail && !emailRegex.test(userEmail.value.trim())) {
        userEmail.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (userEmail) {
        userEmail.parentElement.classList.remove("is-invalid");
    }

    if (gender && !gender.value) {
        const genderGroup = document.querySelector(".gender-toggle-group");
        if (genderGroup) genderGroup.classList.add("is-invalid");
        isValid = false;
    } else {
        const genderGroup = document.querySelector(".gender-toggle-group");
        if (genderGroup) genderGroup.classList.remove("is-invalid");
    }

    if (qualification && (!qualification.value || qualification.selectedIndex === 0)) {
        qualification.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (qualification) {
        qualification.parentElement.classList.remove("is-invalid");
    }

    const dateOfBirthField = document.getElementById("dateOfBirth");
    if (dateOfBirthField && !isValidDate(dateOfBirthField.value)) {
        dateOfBirthField.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (dateOfBirthField) {
        dateOfBirthField.parentElement.classList.remove("is-invalid");
    }

    if (experienceLevel && (!experienceLevel.value || experienceLevel.selectedIndex === 0)) {
        experienceLevel.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (experienceLevel) {
        experienceLevel.parentElement.classList.remove("is-invalid");
    }

    if (profileContinueBtn) {
        profileContinueBtn.disabled = !isValid;
    }

    return isValid;
}

function attachProfileListeners() {
    const fields = ["fullName", "userEmail", "qualification", "experienceLevel"];
    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", validateProfileForm);
            el.addEventListener("change", validateProfileForm);
        }
    });
}

function submitProfileForm() {
    if (!validateProfileForm()) {
        return;
    }

    const fullName = document.getElementById("fullName");
    const userEmail = document.getElementById("userEmail");
    const gender = document.getElementById("gender");
    const qualification = document.getElementById("qualification");
    const dateOfBirth = document.getElementById("dateOfBirth");
    const experienceLevel = document.getElementById("experienceLevel");

    const profileData = {
        role: 'student',
        fullName: fullName ? fullName.value.trim() : "",
        email: userEmail ? userEmail.value.trim() : "",
        gender: gender ? gender.value : "",
        qualification: qualification ? qualification.value : "",
        dateOfBirth: dateOfBirth ? dateOfBirth.value : "",
        experienceLevel: experienceLevel ? experienceLevel.value : "",
        profileImage: profilePreview && !profilePreview.src.includes("user1") ? profilePreview.src : null
    };

    console.log("Student Profile Data:", profileData);

    const modalEl = document.getElementById("signInModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
        modalInstance.hide();
    }

    setTimeout(() => {
        showBootstrapToast();
    }, 500);
}

function showBootstrapToast() {
    const toastEl = document.getElementById('successToast');
    if (toastEl) {
        const toast = new bootstrap.Toast(toastEl, {
            delay: 5000,
            autohide: true
        });
        toast.show();
    }
}

// =========================
// RESET MODAL WHEN CLOSED
// =========================
document.getElementById("signInModal").addEventListener("hidden.bs.modal", resetModal);

function resetModal() {
    // Hide all steps
    document.querySelectorAll(".tuishala-step").forEach(step => step.classList.add("d-none"));

    // Show step 0
    document.querySelector(".tuishala-step-0").classList.remove("d-none");

    // Reset form
    document.getElementById("signUpForm").reset();

    // Reset student footer
    document.getElementById("step1Footer").style.display = "none";

    // Reset student OTP
    const otpInputs = document.querySelectorAll(".otp-boxes input:not(.p4-otp-input)");
    otpInputs.forEach(input => input.value = "");
    const otpBtn = document.getElementById("otpBtn");
    if (otpBtn) otpBtn.disabled = true;

    // Reset employer OTP
    const p4OtpInputs = document.querySelectorAll(".p4-otp-input");
    p4OtpInputs.forEach(input => input.value = "");
    const p4OtpBtn = document.getElementById("p4EmployerOtpBtn");
    if (p4OtpBtn) p4OtpBtn.disabled = true;

    // Reset profile form
    document.querySelectorAll(".gender-btn").forEach(btn => btn.classList.remove("active"));
    const genderInput = document.getElementById("gender");
    if (genderInput) genderInput.value = "";
    if (profilePreview) profilePreview.src = "../assets/icons/front/student/user1.svg";
    if (profileContinueBtn) profileContinueBtn.disabled = true;
    document.querySelectorAll(".profile-input-box").forEach(box => box.classList.remove("is-invalid"));

    // Reset mobile inputs
    if (mobileInput) mobileInput.value = "";
    if (step1Btn) step1Btn.disabled = true;
    if (p4EmployerMobile) p4EmployerMobile.value = "";
    if (p4EmployerStep1Btn) p4EmployerStep1Btn.disabled = true;

    // Reset employer profile form
    document.querySelectorAll(".p4-emp-input-box").forEach(box => box.classList.remove("is-invalid"));
    document.querySelectorAll(".p4-emp-textarea-box").forEach(box => box.classList.remove("is-invalid"));
    const p4EmpTerms = document.getElementById("p4EmpTerms");
    if (p4EmpTerms) p4EmpTerms.checked = false;
    if (p4EmpProfilePreview) p4EmpProfilePreview.src = "../assets/icons/front/student/user1.svg";
    if (p4EmpSubmitBtn) p4EmpSubmitBtn.disabled = true;
    const p4EmpForm = document.getElementById("p4EmpProfileForm");
    if (p4EmpForm) p4EmpForm.reset();

    // Reset role to student
    document.getElementById("student").checked = true;
    p4SelectedRole = 'student';
}

// ===================================
// EMPLOYER STEP 3: COMPLETE COMPANY PROFILE
// All IDs prefixed with p4Emp
// ===================================

// Profile Image Upload & Preview
const p4EmpProfileImageInput = document.getElementById("p4EmpProfileImage");
const p4EmpProfilePreview = document.getElementById("p4EmpProfilePreview");

if (p4EmpProfileImageInput) {
    p4EmpProfileImageInput.addEventListener("change", function(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onload = function(event) {
                p4EmpProfilePreview.src = event.target.result;
                validateEmployerProfileForm();
            };
            reader.readAsDataURL(file);
        }
    });
}

// Employer Email Regex
const p4EmpEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const p4EmpUrlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

// Submit Button
const p4EmpSubmitBtn = document.getElementById("p4EmpSubmitBtn");

function validateEmployerProfileForm() {
    let isValid = true;

    const companyName = document.getElementById("p4EmpCompanyName");
    const hrName = document.getElementById("p4EmpHrName");
    const designation = document.getElementById("p4EmpDesignation");
    const email = document.getElementById("p4EmpEmail");
    const website = document.getElementById("p4EmpWebsite");
    const industry = document.getElementById("p4EmpIndustry");
    const companySize = document.getElementById("p4EmpCompanySize");
    const location = document.getElementById("p4EmpLocation");
    const terms = document.getElementById("p4EmpTerms");

    // Company Name
    if (companyName && !companyName.value.trim()) {
        companyName.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (companyName) {
        companyName.parentElement.classList.remove("is-invalid");
    }

    // HR Name
    if (hrName && !hrName.value.trim()) {
        hrName.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (hrName) {
        hrName.parentElement.classList.remove("is-invalid");
    }

    // Designation
    if (designation && (!designation.value || designation.selectedIndex === 0)) {
        designation.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (designation) {
        designation.parentElement.classList.remove("is-invalid");
    }

    // Official Email
    if (email && !p4EmpEmailRegex.test(email.value.trim())) {
        email.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (email) {
        email.parentElement.classList.remove("is-invalid");
    }

    // Website (optional but validate if filled)
    if (website && website.value.trim() && !p4EmpUrlRegex.test(website.value.trim())) {
        website.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (website) {
        website.parentElement.classList.remove("is-invalid");
    }

    // Industry
    if (industry && (!industry.value || industry.selectedIndex === 0)) {
        industry.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (industry) {
        industry.parentElement.classList.remove("is-invalid");
    }

    // Company Size
    if (companySize && (!companySize.value || companySize.selectedIndex === 0)) {
        companySize.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (companySize) {
        companySize.parentElement.classList.remove("is-invalid");
    }

    // Location
    if (location && !location.value.trim()) {
        location.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (location) {
        location.parentElement.classList.remove("is-invalid");
    }

    // Terms Checkbox
    if (terms && !terms.checked) {
        terms.parentElement.classList.add("is-invalid");
        isValid = false;
    } else if (terms) {
        terms.parentElement.classList.remove("is-invalid");
    }

    // Enable/Disable Submit Button
    if (p4EmpSubmitBtn) {
        p4EmpSubmitBtn.disabled = !isValid;
    }

    return isValid;
}

// Attach input listeners to all employer profile fields
function attachEmployerProfileListeners() {
    const fields = [
        "p4EmpCompanyName",
        "p4EmpHrName",
        "p4EmpDesignation",
        "p4EmpEmail",
        "p4EmpWebsite",
        "p4EmpIndustry",
        "p4EmpCompanySize",
        "p4EmpLocation",
        "p4EmpAbout"
    ];

    fields.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener("input", validateEmployerProfileForm);
            el.addEventListener("change", validateEmployerProfileForm);
        }
    });

    // Terms checkbox
    const terms = document.getElementById("p4EmpTerms");
    if (terms) {
        terms.addEventListener("change", validateEmployerProfileForm);
    }
}

// Submit Employer Profile Form
function p4SubmitEmployerProfile() {
    if (!validateEmployerProfileForm()) {
        return;
    }

    const companyName = document.getElementById("p4EmpCompanyName");
    const hrName = document.getElementById("p4EmpHrName");
    const designation = document.getElementById("p4EmpDesignation");
    const email = document.getElementById("p4EmpEmail");
    const website = document.getElementById("p4EmpWebsite");
    const industry = document.getElementById("p4EmpIndustry");
    const companySize = document.getElementById("p4EmpCompanySize");
    const location = document.getElementById("p4EmpLocation");
    const about = document.getElementById("p4EmpAbout");

    const employerData = {
        role: 'employer',
        companyName: companyName ? companyName.value.trim() : "",
        hrName: hrName ? hrName.value.trim() : "",
        designation: designation ? designation.value : "",
        email: email ? email.value.trim() : "",
        website: website ? website.value.trim() : "",
        industry: industry ? industry.value : "",
        companySize: companySize ? companySize.value : "",
        location: location ? location.value.trim() : "",
        about: about ? about.value.trim() : "",
        profileImage: p4EmpProfilePreview && !p4EmpProfilePreview.src.includes("user1") ? p4EmpProfilePreview.src : null
    };

    console.log("Employer Profile Data:", employerData);

    // Close the Modal
    const modalEl = document.getElementById("signInModal");
    const modalInstance = bootstrap.Modal.getInstance(modalEl);
    if (modalInstance) {
        modalInstance.hide();
    }

    // Trigger Success Toast
    setTimeout(() => {
        showEmployerBootstrapToast();
    }, 500);
}

// Employer Success Toast
function showEmployerBootstrapToast() {
    const toastEl = document.getElementById('successToast');
    if (toastEl) {
        // Update toast content for employer
        const toastBody = toastEl.querySelector('.toast-body');
        if (toastBody) {
            toastBody.innerHTML = 'Welcome to <b>Tuishala</b>. Your employer account has been created successfully.';
        }
        const toastTitle = toastEl.querySelector('.toast-title');
        if (toastTitle) {
            toastTitle.textContent = 'Account Created Successfully!';
        }

        const toast = new bootstrap.Toast(toastEl, {
            delay: 5000,
            autohide: true
        });
        toast.show();
    }
}