export default function PrivacyPage() {
    return (
        <section id="privacyPage" className="relative min-h-screen px-4 py-16">
            <div className="max-w-4xl mx-auto bg-white p-8 shadow-[8px_8px_0_0_var(--primary)] border-4 border-(--border-color)">
                <h1 className="text-4xl font-bold mb-8 text-center pixelTitle">Privacy Policy</h1>
                <div className="prose prose-lg mx-auto">
                    <p className="mb-4">
                        This privacy policy sets out how we use and protect any information that you give us when you use this website.
                    </p>
                    <h2 className="text-2xl font-bold italic font-dark tracking-tighter mb-4">Information We Collect</h2>
                    <p className="mb-4">
                        We may collect the following information:
                    </p>
                    <ul className="mb-4 list-disc pl-6">
                        <li>Name and contact information</li>
                        <li>Demographic information</li>
                        <li>Other information relevant to customer surveys and/or offers</li>
                    </ul>
                    <h2 className="text-2xl font-bold italic font-dark tracking-tighter mb-4">How We Use the Information</h2>
                    <p className="mb-4">
                        We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:
                    </p>
                    <ul className="mb-4 list-disc pl-6">
                        <li>Internal record keeping</li>
                        <li>Improving our products and services</li>
                        <li>Sending promotional emails about new products, special offers or other information which we think you may find interesting</li>
                    </ul>
                    <h2 className="text-2xl font-bold italic font-dark tracking-tighter mb-4">Security</h2>
                    <p className="mb-4">
                        We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online.
                    </p>
                    <h2 className="text-2xl font-bold italic font-dark tracking-tighter mb-4">Cookies</h2>
                    <p className="mb-4">
                        A cookie is a small file which asks permission to be placed on your computer`s hard drive. Once you agree, the file is added and the cookie helps analyze web traffic or lets you know when you visit a particular site.
                    </p>
                    <h2 className="text-2xl font-bold italic font-dark tracking-tighter mb-4">Links to Other Websites</h2>
                    <p className="mb-4">
                        Our website may contain links to other websites of interest. However, once you have used these links to leave our site, you should note that we do not have any control over that other website.
                    </p>
                </div>
            </div>
        </section>
    )
}
