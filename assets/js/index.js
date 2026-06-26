/**
 * Navbar Component Logic
 *
 * WHAT THIS JS DOES:
 * 1. Active link highlighting — adds "active" class to current page link
 * 2. Dropdown backdrop — shows dark overlay when user menu opens
 * 3. Click outside to close — clicking backdrop closes the dropdown
 * 4. Scroll lock — prevents page scroll when dropdown is open
 *
 * FIXES APPLIED:
 * - Auto-initializes on DOM ready (no manual call needed)
 * - Removed manual toggler code (Bootstrap 5 handles collapse natively)
 * - Active-link matching now works with both absolute and relative hrefs
 */

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

// step 0:

//continue button
document
.getElementById("roleContinue")
.addEventListener("click",()=>{

    const selectedRole =
        document.querySelector(
            'input[name="role"]:checked'
        ).value;

    console.log(selectedRole);

    document
        .querySelector(".tuishala-step-0")
        .classList.add("d-none");

    document
        .querySelector(".tuishala-step-1")
        .classList.remove("d-none");

    document.getElementById("step1Footer").style.display="block";

});
function goBackStep0(){

    document
        .querySelector(".tuishala-step-1")
        .classList.add("d-none");

    document
        .querySelector(".tuishala-step-0")
        .classList.remove("d-none");

    // Hide footer again
    document.getElementById("step1Footer").style.display="none";

}

// STEP 1: enable continue when mobile is 10 digits
const phoneInput = document.querySelector(".phone-input");
const step1Btn = document.getElementById("step1Btn");
//phone validation
phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 10);

    if (this.value.length === 10) {
        step1Btn.disabled = false;
    } else {
        step1Btn.disabled = true;
    }
});

//Toggle Phone ↔ Email
let loginMode = "phone";
const toggleLink = document.getElementById("toggleLoginMode");

toggleLink.addEventListener("click", function (e) {

    e.preventDefault();

    const phoneGroup = document.getElementById("phoneGroup");
    const emailGroup = document.getElementById("emailGroup");

    if (loginMode === "phone") {

        loginMode = "email";

        phoneGroup.classList.add("d-none");
        emailGroup.classList.remove("d-none");

        toggleLink.innerText = "Sign up/Login with Phone";

        step1Btn.disabled = true;

    } else {

        loginMode = "phone";

        emailGroup.classList.add("d-none");
        phoneGroup.classList.remove("d-none");

        toggleLink.innerText = "Sign up/Login with Email";

        step1Btn.disabled = true;
    }

});
//email validation
const emailInput = document.querySelector(".email-input");

emailInput.addEventListener("input", () => {

    const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    step1Btn.disabled =
        !emailRegex.test(emailInput.value.trim());

});


// STEP CHANGE
function goToStep2() {
    const otpText = document.querySelector(".tuishala-step-2 .subtext");
    if (loginMode === "phone") {
        otpText.innerHTML =
            `Enter the 6-digit code sent to <strong>+91 ${phoneInput.value}</strong>`;
    }
    else {
        otpText.innerHTML =
            `Enter the verification code sent to <strong>${emailInput.value}</strong>`;
    }

    document.querySelector(".tuishala-step-1").classList.add("d-none");
    document.querySelector(".tuishala-step-2").classList.remove("d-none");

    document.getElementById("step1Footer").style.display = "none";

    initOTP(); // important
}


// STEP 2 OTP LOGIC
function initOTP() {
    const inputs = document.querySelectorAll(".otp-boxes input");
    const otpBtn = document.getElementById("otpBtn");

    inputs.forEach((input, index) => {

        input.addEventListener("input", () => {

            input.value = input.value.replace(/[^0-9]/g, '').slice(0, 1);

            // auto move next
            if (input.value && inputs[index + 1]) {
                inputs[index + 1].focus();
            }

            checkOTP();
        });
    });

    function checkOTP() {
        let filled = 0;

        inputs.forEach(i => {
            if (i.value.length === 1) filled++;
        });

        otpBtn.disabled = filled !== 6;
    }
}


// BACK
function goBackStep1() {
    document.querySelector(".tuishala-step-2").classList.add("d-none");
    document.querySelector(".tuishala-step-1").classList.remove("d-none");

    document.getElementById("step1Footer").style.display = "block";
}

//after otp user detail page 
function goToStep3() {

    document
        .querySelector(".tuishala-step-2")
        .classList.add("d-none");

    document
        .querySelector(".tuishala-step-3")
        .classList.remove("d-none");

}
//Referral Code Toggle
document
.getElementById("showReferral")
.addEventListener("click", function (e) {

    e.preventDefault();

    document
        .getElementById("referralBox")
        .classList.toggle("d-none");

});

// tusishala step-3 user form filling validation
const fullName = document.getElementById("fullName");
const userEmail = document.getElementById("userEmail");
const qualification = document.getElementById("qualification");
const interest = document.getElementById("interest");
const getStartedBtn = document.getElementById("getStartedBtn");
const emailError = document.getElementById("emailError");

function validateStep3() {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let isValid = true;

    // FULL NAME
    if (fullName.value.trim() === "") {
        fullName.classList.add("input-error");
        isValid = false;
    } else {
        fullName.classList.remove("input-error");
    }

    // EMAIL
    if (!emailRegex.test(userEmail.value.trim())) {
        userEmail.classList.add("input-error");
        emailError.classList.remove("d-none");
        isValid = false;
    } else {
        userEmail.classList.remove("input-error");
        emailError.classList.add("d-none");
    }

    // QUALIFICATION
    if (qualification.value === "" || qualification.selectedIndex === 0) {
        qualification.classList.add("input-error");
        isValid = false;
    } else {
        qualification.classList.remove("input-error");
    }

    // INTEREST
    if (interest.value === "" || interest.selectedIndex === 0) {
        interest.classList.add("input-error");
        isValid = false;
    } else {
        interest.classList.remove("input-error");
    }

    getStartedBtn.disabled = !isValid;
}
[
    fullName,
    userEmail,
    qualification,
    interest
].forEach(el => {
    el.addEventListener("input", validateStep3);
    el.addEventListener("change", validateStep3);
});

//tusihala Step4
function goToStep4() {

    document
        .querySelector(".tuishala-step-3")
        .classList.add("d-none");

    document
        .querySelector(".tuishala-step-4")
        .classList.remove("d-none");

}
// step5
function goToStep5() {

    document
        .querySelector(".tuishala-step-4")
        .classList.add("d-none");

    document
        .querySelector(".tuishala-step-5")
        .classList.remove("d-none");

}
//Step5 ← Step4
function goBackStep4() {

    document
        .querySelector(".tuishala-step-5")
        .classList.add("d-none");

    document
        .querySelector(".tuishala-step-4")
        .classList.remove("d-none");

}
//Thank you step-6
function goToStep6(){

    document
        .querySelector(".tuishala-step-5")
        .classList.add("d-none");

    document
        .querySelector(".tuishala-step-6")
        .classList.remove("d-none");

    // auto close 
    setTimeout(() => {

        bootstrap.Modal
            .getInstance(document.getElementById("signInModal"))
            .hide();

    }, 4000);

}

// ==============================
// RESET MODAL WHEN CLOSED
// ==============================

document
    .getElementById("signInModal")
    .addEventListener("hidden.bs.modal", resetModal);

function resetModal() {

    // Hide all steps
    document
        .querySelectorAll(".tuishala-step")
        .forEach(step => step.classList.add("d-none"));

    // Show first step again
    document
        .querySelector(".tuishala-step-0")
        .classList.remove("d-none");

    // Reset complete form
    document.getElementById("signUpForm").reset();

    // Restore footer
    document.getElementById("step1Footer").style.display = "none";

 }
