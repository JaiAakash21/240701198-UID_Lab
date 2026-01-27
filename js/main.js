// Main JavaScript file for UID Lab

// Utility function for DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('UID Lab initialized');
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('fade-in');
        }, index * 100);
    });
});

// Form validation utility
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'This field is required');
            isValid = false;
        } else {
            clearError(input);
        }
    });
    
    return isValid;
}

// Show error message
function showError(input, message) {
    input.classList.add('error');
    let errorDiv = input.parentElement.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
}

// Clear error message
function clearError(input) {
    input.classList.remove('error');
    const errorDiv = input.parentElement.querySelector('.error-message');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Show success message
function showSuccess(input, message) {
    clearError(input);
    let successDiv = input.parentElement.querySelector('.success-message');
    
    if (!successDiv) {
        successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        input.parentElement.appendChild(successDiv);
    }
    
    successDiv.textContent = message;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Color utility functions
function generateRandomColor() {
    return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Animation utility
function animateElement(element, animationClass, duration = 1000) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

// Copy to clipboard utility
function copyToClipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard:', text);
            return true;
        }).catch(err => {
            console.error('Failed to copy:', err);
            return false;
        });
    } else {
        // Fallback for older browsers
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful) {
                console.log('Copied to clipboard:', text);
            }
            return Promise.resolve(successful);
        } catch (err) {
            console.error('Failed to copy:', err);
            return Promise.resolve(false);
        }
    }
}

// Export functions for use in other scripts
window.uidLab = {
    validateForm,
    validateEmail,
    showError,
    clearError,
    showSuccess,
    generateRandomColor,
    hexToRgb,
    rgbToHex,
    animateElement,
    copyToClipboard
};
