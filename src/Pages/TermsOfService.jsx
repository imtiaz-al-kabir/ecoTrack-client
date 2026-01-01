const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-base-100 py-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>

                <div className="prose prose-lg max-w-none space-y-6 text-base-content">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using EcoTrack, you accept and agree to be bound by the terms and provision of this agreement.
                            If you do not agree to these terms, please do not use our service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily use EcoTrack for personal, non-commercial transitory viewing only.
                            This is the grant of a license, not a transfer of title, and under this license you may not:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Modify or copy the materials</li>
                            <li>Use the materials for any commercial purpose</li>
                            <li>Attempt to decompile or reverse engineer any software contained on EcoTrack</li>
                            <li>Remove any copyright or other proprietary notations from the materials</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">3. User Accounts</h2>
                        <p>
                            When you create an account with us, you must provide accurate, complete, and current information.
                            Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                        </p>
                        <p>
                            You are responsible for safeguarding the password and for all activities that occur under your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">4. User Content</h2>
                        <p>
                            Our service allows you to post, link, store, share and otherwise make available certain information, text,
                            graphics, or other material. You are responsible for the content that you post on or through the service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">5. Privacy Policy</h2>
                        <p>
                            Your use of EcoTrack is also governed by our Privacy Policy. Please review our Privacy Policy,
                            which also governs the site and informs users of our data collection practices.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">6. Prohibited Uses</h2>
                        <p>You may not use EcoTrack:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>In any way that violates any applicable national or international law or regulation</li>
                            <li>To transmit, or procure the sending of, any advertising or promotional material without our prior written consent</li>
                            <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity</li>
                            <li>To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the service</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">7. Limitation of Liability</h2>
                        <p>
                            In no event shall EcoTrack or its suppliers be liable for any damages (including, without limitation,
                            damages for loss of data or profit, or due to business interruption) arising out of the use or inability
                            to use the materials on EcoTrack.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">8. Changes to Terms</h2>
                        <p>
                            We reserve the right to modify these terms at any time. We will notify users of any changes by updating
                            the "Last Updated" date of these Terms of Service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">9. Contact Information</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at{" "}
                            <a href="mailto:support@ecotrack.com" className="text-primary hover:underline">
                                support@ecotrack.com
                            </a>
                        </p>
                    </section>

                    <div className="mt-12 pt-6 border-t border-base-300">
                        <p className="text-sm text-base-content/60">
                            Last Updated: January 1, 2026
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
