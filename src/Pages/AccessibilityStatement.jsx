const AccessibilityStatement = () => {
    return (
        <div className="min-h-screen bg-base-100 py-16">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl font-bold text-primary mb-8">Accessibility Statement</h1>

                <div className="prose prose-lg max-w-none space-y-6 text-base-content">
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Our Commitment</h2>
                        <p>
                            EcoTrack is committed to ensuring digital accessibility for people with disabilities. We are continually
                            improving the user experience for everyone and applying the relevant accessibility standards.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Conformance Status</h2>
                        <p>
                            The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to
                            improve accessibility for people with disabilities. It defines three levels of conformance: Level A,
                            Level AA, and Level AAA.
                        </p>
                        <p>
                            EcoTrack is partially conformant with WCAG 2.1 level AA. Partially conformant means that some parts
                            of the content do not fully conform to the accessibility standard.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Accessibility Features</h2>
                        <p>Our website includes the following accessibility features:</p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Semantic HTML markup for better screen reader compatibility</li>
                            <li>Keyboard navigation support throughout the site</li>
                            <li>Alternative text for images and icons</li>
                            <li>Color contrast ratios that meet WCAG AA standards</li>
                            <li>Responsive design that works across different devices and screen sizes</li>
                            <li>Clear focus indicators for interactive elements</li>
                            <li>ARIA labels for enhanced screen reader support</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Known Limitations</h2>
                        <p>
                            Despite our best efforts to ensure accessibility, there may be some limitations. Below is a description
                            of known limitations and potential solutions:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                <strong>Third-party content:</strong> Some embedded content from third-party services may not be
                                fully accessible
                            </li>
                            <li>
                                <strong>Complex data visualizations:</strong> Some charts and graphs may have limited accessibility
                                features
                            </li>
                            <li>
                                <strong>Older browsers:</strong> Some accessibility features may not work properly on outdated browsers
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Assistive Technologies</h2>
                        <p>
                            EcoTrack is designed to be compatible with the following assistive technologies:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
                            <li>Screen magnification software</li>
                            <li>Speech recognition software</li>
                            <li>Keyboard-only navigation</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Feedback and Contact</h2>
                        <p>
                            We welcome your feedback on the accessibility of EcoTrack. Please let us know if you encounter
                            accessibility barriers:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>
                                Email:{" "}
                                <a href="mailto:accessibility@ecotrack.com" className="text-primary hover:underline">
                                    accessibility@ecotrack.com
                                </a>
                            </li>
                            <li>
                                Phone:{" "}
                                <a href="tel:+15551234567" className="text-primary hover:underline">
                                    +1 (555) 123-4567
                                </a>
                            </li>
                        </ul>
                        <p className="mt-4">
                            We try to respond to accessibility feedback within 5 business days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Technical Specifications</h2>
                        <p>
                            Accessibility of EcoTrack relies on the following technologies to work with the particular combination
                            of web browser and any assistive technologies or plugins installed on your computer:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>HTML5</li>
                            <li>CSS3</li>
                            <li>JavaScript</li>
                            <li>ARIA (Accessible Rich Internet Applications)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-4">Assessment Approach</h2>
                        <p>
                            EcoTrack assessed the accessibility of this website by the following approaches:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Self-evaluation</li>
                            <li>Automated testing tools</li>
                            <li>Manual testing with assistive technologies</li>
                        </ul>
                    </section>

                    <div className="mt-12 pt-6 border-t border-base-300">
                        <p className="text-sm text-base-content/60">
                            This statement was last updated on January 1, 2026.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccessibilityStatement;
