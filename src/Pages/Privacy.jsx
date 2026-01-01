const Privacy = () => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-16">
            <div className="max-w-4xl mx-auto px-5">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
                <div className="prose prose-emerald lg:prose-lg max-w-none text-gray-600">
                    <p>Last updated: October 26, 2024</p>
                    <p>
                        At EcoTrack, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">1. Information We Collect</h3>
                    <p>
                        We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website, or otherwise when you contact us.
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>Personal Data: Name, email address, and profile picture (via Google Login).</li>
                        <li>Activity Data: Challenges you join, progress you track, and content you create.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">2. How We Use Your Information</h3>
                    <p>
                        We use the information we collect or receive:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 mt-4">
                        <li>To facilitate account creation and logon process.</li>
                        <li>To allow you to participate in eco-challenges.</li>
                        <li>To improve our services and user experience.</li>
                    </ul>

                    <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">3. Sharing Your Information</h3>
                    <p>
                        We do not sell, trade, or otherwise transfer to outside parties your Personally Identifiable Information unless we provide users with advance notice. This does not include website hosting partners and other parties who assist us in operating our website, conducting our business, or serving our users.
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">4. Security</h3>
                    <p>
                        We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable.
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-8 mb-4">5. Contact Us</h3>
                    <p>
                        If you have questions or comments about this policy, you may email us at privacy@ecotrack.com or by post to:
                    </p>
                    <p className="mt-4 font-semibold">
                        EcoTrack Inc.<br />
                        123 Eco Avenue, Green City<br />
                        Planet Earth 10101
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
