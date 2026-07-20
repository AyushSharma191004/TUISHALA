/**
 * Profile Dashboard Page Logic
 */

let pdEditModal = null;

document.addEventListener('DOMContentLoaded', () => {
  pdEditModal = new bootstrap.Modal(document.getElementById('pdPersonalDetailsModal'));
});

// Open modal (called from any "Add" button or Edit icon)
function pdOpenEditModal() {
  if (pdEditModal) pdEditModal.show();
}

// Apply Referral Code
function pdApplyReferral(e) {
  e.preventDefault();
  const input = document.querySelector('[name="referralCode"]');
  const code = input.value.trim();
  
  if (!code) {
    input.style.borderColor = '#dc3545';
    input.focus();
    return;
  }
  
  // Demo: Show applying state
  const link = e.target;
  const originalText = link.textContent;
  link.textContent = 'Applying...';
  link.style.color = 'var(--pd-primary)';
  
  setTimeout(() => {
    link.textContent = 'Applied!';
    link.style.color = '#22c55e';
    input.style.borderColor = '#22c55e';
    
    setTimeout(() => {
      link.textContent = originalText;
      link.style.color = '';
    }, 2000);
  }, 800);
  
  console.log('Applying referral code:', code);
}

// Save Personal Details
function pdSavePersonalDetails() {
  const form = document.getElementById('pdPersonalDetailsForm');
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  
  // Validation
  const requiredFields = ['firstName', 'lastName', 'dob', 'timezone'];
  let isValid = true;
  let firstError = null;
  
  requiredFields.forEach(field => {
    const input = form.querySelector(`[name="${field}"]`);
    if (!input.value.trim()) {
      input.closest('.pd-form-group').querySelector('.pd-form-control, .pd-form-select').style.borderColor = '#dc3545';
      isValid = false;
      if (!firstError) firstError = input;
    }
  });
  
  if (!isValid) {
    firstError.focus();
    return;
  }
  
  // Demo success
  const saveBtn = document.querySelector('.pd-save-btn');
  saveBtn.textContent = 'Saved!';
  saveBtn.style.background = '#22c55e';
  
  setTimeout(() => {
    saveBtn.textContent = 'Save Changes';
    saveBtn.style.background = '';
    pdEditModal.hide();
    alert('Profile updated successfully!');
  }, 800);
}

// Clear validation on input
document.addEventListener('input', (e) => {
  if (e.target.matches('.pd-form-control, .pd-form-select')) {
    e.target.style.borderColor = '';
  }
});