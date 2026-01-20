# Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it to us as follows:

1. **Do not** create a public GitHub issue
2. Email security concerns to: [Your security contact email]
3. Include detailed information about the vulnerability
4. Allow reasonable time for us to respond and fix the issue before public disclosure

## Security Measures Implemented

This application includes several security measures:

### Headers and CSP

- Content Security Policy (CSP) headers
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict-Transport-Security (HSTS)
- Referrer-Policy
- Permissions-Policy

### Rate Limiting

- IP-based rate limiting (100 requests per minute)
- Automatic blocking of suspicious traffic

### Input Validation

- XSS prevention through input sanitization
- Query parameter validation
- Sensitive file path blocking

### Environment Security

- Environment variables properly configured
- Sensitive files excluded from version control
- X-Powered-By header disabled

### Dependencies

- Regular security audits with `npm audit`
- Dependencies kept up to date

## Best Practices for Contributors

1. **Never commit sensitive data** (API keys, passwords, tokens)
2. **Use environment variables** for configuration
3. **Validate all inputs** on both client and server side
4. **Keep dependencies updated** and review changes
5. **Run security audits** before deployment

## Security Checklist

Before deploying to production:

- [ ] Run `npm audit` and resolve high/critical vulnerabilities
- [ ] Ensure all environment variables are set
- [ ] Verify CSP headers are working
- [ ] Test rate limiting functionality
- [ ] Confirm HTTPS is enabled
- [ ] Check that sensitive routes are protected
