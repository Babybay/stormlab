// ================================
// OPTIONAL: SERVER-SIDE CONTACT API
// ================================
// This is an alternative to EmailJS if you want server-side processing
// You can use this with Astro's API routes

export const prerender = false;

export async function POST({ request }) {
    try {
        const data = await request.json();
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'message'];
        for (const field of requiredFields) {
            if (!data[field] || !data[field].trim()) {
                return new Response(JSON.stringify({
                    success: false,
                    message: `${field} is required`
                }), {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return new Response(JSON.stringify({
                success: false,
                message: 'Invalid email address'
            }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }

        // Here you can integrate with your preferred email service:
        // - Resend
        // - SendGrid  
        // - Nodemailer
        // - AWS SES
        // etc.

        // Example with console log (replace with actual email sending)
        console.log('Contact Form Submission:', {
            name: `${data.firstName} ${data.lastName}`,
            email: data.email,
            phone: data.phone || 'Not provided',
            company: data.company || 'Not provided',
            service: data.service || 'Not specified',
            budget: data.budget || 'Not specified',
            message: data.message,
            newsletter: data.newsletter ? 'Yes' : 'No',
            timestamp: new Date().toISOString()
        });

        // Simulate email sending success
        // Replace this with your actual email service integration
        const emailSent = true; // Replace with actual email sending result

        if (emailSent) {
            return new Response(JSON.stringify({
                success: true,
                message: 'Message sent successfully'
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } else {
            throw new Error('Failed to send email');
        }

    } catch (error) {
        console.error('Contact API Error:', error);
        
        return new Response(JSON.stringify({
            success: false,
            message: 'Internal server error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Handle unsupported methods
export async function GET() {
    return new Response(JSON.stringify({
        success: false,
        message: 'Method not allowed'
    }), {
        status: 405,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}