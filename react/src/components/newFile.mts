document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const contactItems = document.querySelectorAll('.contact-item');
    const submitButton = document.getElementById('submitButton');
    const successMessage = document.getElementById('successMessage');

    // Animate contact items on scroll
    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, delay);
            }
        });
    });

    contactItems.forEach(item => {
        contactObserver.observe(item);
    });

    // Form validation functions
    function validateEmail(email: string) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone: string) {
        const re = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return !phone || re.test(phone);
    }

    function showError(fieldName: string, message: string | null) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.querySelector(`[name="${fieldName}"]`);

        if (errorElement) {
            errorElement.textContent = message;
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }

    function clearError(fieldName: any) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        const inputElement = document.querySelector(`[name="${fieldName}"]`);

        if (errorElement) {
            errorElement.textContent = '';
        }
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }

    function clearAllErrors() {
        const errorElements = document.querySelectorAll('.form-error');
        const inputElements = document.querySelectorAll('.form-input, .form-textarea');

        errorElements.forEach(el => el.textContent = '');
        inputElements.forEach(el => el.classList.remove('error'));
    }

    function validateForm(formData: FormData) {
        let isValid = true;
        clearAllErrors();

        // Required field validation
        const requiredFields = ['firstName', 'lastName', 'email', 'message'];

        requiredFields.forEach(field => {
            if (!formData.get(field)?.trim()) {
                showError(field, 'This field is required');
                isValid = false;
            }
        });

        // Email validation
        const email = formData.get('email');
        if (email && !validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }

        // Phone validation
        const phone = formData.get('phone');
        if (phone && !validatePhone(phone)) {
            showError('phone', 'Please enter a valid phone number');
            isValid = false;
        }

        // Privacy policy validation
        if (!formData.get('privacy')) {
            showError('privacy', 'You must accept the privacy policy to continue');
            isValid = false;
        }

        return isValid;
    }

    function setButtonState(state: string) {
        const submitText = submitButton.querySelector('.submit-text');
        const submitLoading = submitButton.querySelector('.submit-loading');
        const submitSuccess = submitButton.querySelector('.submit-success');

        // Reset all states
        submitText.style.display = 'none';
        submitLoading.style.display = 'none';
        submitSuccess.style.display = 'none';

        submitButton.classList.remove('success');
        submitButton.disabled = false;

        switch (state) {
            case 'loading':
                submitLoading.style.display = 'flex';
                submitButton.disabled = true;
                break;
            case 'success':
                submitSuccess.style.display = 'flex';
                submitButton.classList.add('success');
                submitButton.disabled = true;
                break;
            case 'error':
                submitText.style.display = 'flex';
                submitText.textContent = 'Try Again';
                break;
            default:
                submitText.style.display = 'flex';
                submitText.textContent = 'Send Message';
        }
    }

    // Form submission handler
    contactForm?.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        // Validate form
        if (!validateForm(formData)) {
            return;
        }

        // Set loading state
        setButtonState('loading');

        try {
            // Prepare data for Resend
            const emailData = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                phone: formData.get('phone') || 'Not provided',
                company: formData.get('company') || 'Not provided',
                service: formData.get('service') || 'Not specified',
                budget: formData.get('budget') || 'Not specified',
                message: formData.get('message'),
                newsletter: formData.get('newsletter') ? 'Yes' : 'No',
                timestamp: new Date().toISOString()
            };

            // Send email via API route
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData)
            });

            const result = await response.json();

            if (response.ok && result.success) {
                // Show success state
                setButtonState('success');

                // Show success message after delay
                setTimeout(() => {
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'flex';
                }, 1500);

                // Track conversion (if analytics enabled)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submit', {
                        event_category: 'Contact',
                        event_label: 'Contact Form'
                    });
                }

            } else {
                throw new Error(result.message || 'Failed to send message');
            }

        } catch (error) {
            console.error('Form submission error:', error);
            setButtonState('error');

            // Show user-friendly error message
            alert('Sorry, there was an error sending your message. Please try again or contact us directly.');

            // Reset button after delay
            setTimeout(() => {
                setButtonState('default');
            }, 3000);
        }
    });

    // Real-time validation
    const formInputs = contactForm?.querySelectorAll('.form-input, .form-textarea');
    formInputs?.forEach(input => {
        input.addEventListener('blur', function () {
            const name = this.getAttribute('name');
            const value = this.value.trim();

            clearError(name);

            if (this.hasAttribute('required') && !value) {
                showError(name, 'This field is required');
            } else if (name === 'email' && value && !validateEmail(value)) {
                showError(name, 'Please enter a valid email address');
            } else if (name === 'phone' && value && !validatePhone(value)) {
                showError(name, 'Please enter a valid phone number');
            }
        });

        input.addEventListener('input', function () {
            clearError(this.getAttribute('name'));
        });
    });

    // Global reset function
    window.resetForm = function () {
        contactForm.reset();
        contactForm.style.display = 'flex';
        successMessage.style.display = 'none';
        setButtonState('default');
        clearAllErrors();
    };
});
