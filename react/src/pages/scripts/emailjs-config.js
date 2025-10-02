// ================================
// EMAILJS CONFIGURATION
// ================================

export const EMAILJS_CONFIG = {
    serviceID: 'service_c5dy88c',
    templateID: 'template_spcwv72',
    publicKey: 'NSxWkKOS3QpRY6AB1'
};

// Optional: Rate limiting configuration
export const RATE_LIMIT_CONFIG = {
    enabled: true,
    timeWindow: 60000, // 1 minute in milliseconds
    storageKey: 'emailjs_last_sent'
};

// Template parameters mapping (for reference)
export const TEMPLATE_PARAMS = {
    firstName: 'User first name',
    lastName: 'User last name',
    email: 'User email address',
    phone: 'User phone number',
    company: 'User company name',
    service: 'Selected service interest',
    budget: 'Selected budget range',
    message: 'User message/project details',
    newsletter: 'Newsletter subscription (Yes/No)',
    timestamp: 'Form submission timestamp'
};

// Email template suggestion for EmailJS dashboard:
/*
Subject: New Contact Form Submission - {{firstName}} {{lastName}}

Dear StormLab Team,

You have received a new contact form submission:

From: {{firstName}} {{lastName}}
Email: {{email}}
Phone: {{phone}}
Company: {{company}}
Service Interest: {{service}}
Budget Range: {{budget}}

Message:
{{message}}

Newsletter Subscription: {{newsletter}}
Submitted: {{timestamp}}

Best regards,
Contact Form System
*/