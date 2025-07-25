// Master Association Guide - Interactive JavaScript (Bug-fix version)

class MasterAssociationGuide {
    constructor() {
        this.init();
    }

    init() {
        this.setupTabNavigation();
        this.setupInteractiveCards();
        this.setupKeyboardNavigation();
    }

    /* ----------------------------------------------------
       TAB NAVIGATION
    ---------------------------------------------------- */
    setupTabNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = e.currentTarget.getAttribute('data-tab');
                this.switchTab(targetTab, tabButtons, tabContents);
            });
        });
    }

    switchTab(targetTab, tabButtons, tabContents) {
        // Reset active states
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate selected tab & content
        const activeButton = document.querySelector(`.tab-btn[data-tab="${targetTab}"]`);
        const activeContent = document.getElementById(targetTab);

        if (activeButton) activeButton.classList.add('active');
        if (activeContent) activeContent.classList.add('active');
    }

    /* ----------------------------------------------------
       INTERACTIVE ELEMENTS
    ---------------------------------------------------- */
    setupInteractiveCards() {
        this.setupPointCards();
        this.setupHierarchyLevels();
        this.setupResponsibilityCategories();
        this.setupFeeTypes();
        this.setupGovernanceElements();
        this.setupLegalElements();
    }

    /* ---------- Overview Cards ---------- */
    setupPointCards() {
        const pointCards = document.querySelectorAll('.point-card[data-point]');
        const pointDetails = [
            "Master associations serve as the overarching governing body that coordinates between multiple sub-associations, ensuring consistent community standards and shared resource management.",
            "These areas include pools, clubhouses, parks, walking trails, and other amenities that benefit all residents regardless of their specific sub-association.",
            "Community-wide rules ensure consistency across all neighborhoods, covering architectural standards, noise policies, pet regulations, and general conduct guidelines.",
            "Services include maintenance coordination, vendor management, insurance procurement, financial oversight, and communication between different community segments.",
            "Large developments with 500+ homes often require this dual-level structure to effectively manage the complexity of multiple neighborhoods and housing types."
        ];

        pointCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.showTooltip(card, pointDetails[index]);
            });
        });
    }

    /* ---------- Structure Levels ---------- */
    setupHierarchyLevels() {
        const levelCards = document.querySelectorAll('.level-card[data-level]');

        levelCards.forEach(card => {
            card.addEventListener('click', () => {
                const details = card.querySelector('.level-details');
                if (!details) return;

                const isOpening = details.classList.contains('hidden');
                // Close all
                document.querySelectorAll('.level-details').forEach(d => d.classList.add('hidden'));

                if (isOpening) {
                    details.classList.remove('hidden');
                    this.animateSlideDown(details);
                }
            });
        });
    }

    /* ---------- Responsibilities ---------- */
    setupResponsibilityCategories() {
        const categoryCards = document.querySelectorAll('.responsibility-category[data-category]');

        categoryCards.forEach(card => {
            card.addEventListener('click', () => {
                const items = card.querySelector('.category-items');
                if (!items) return;

                const isOpening = items.classList.contains('hidden');
                document.querySelectorAll('.category-items').forEach(i => i.classList.add('hidden'));
                if (isOpening) {
                    items.classList.remove('hidden');
                    this.animateSlideDown(items);
                }
            });
        });
    }

    /* ---------- Financial ---------- */
    setupFeeTypes() {
        const feeCards = document.querySelectorAll('.fee-type[data-fee]');

        feeCards.forEach(card => {
            card.addEventListener('click', () => {
                const details = card.querySelector('.fee-details');
                if (!details) return;

                const isOpening = details.classList.contains('hidden');
                document.querySelectorAll('.fee-details').forEach(d => d.classList.add('hidden'));
                if (isOpening) {
                    details.classList.remove('hidden');
                    this.animateSlideDown(details);
                }
            });
        });
    }

    /* ---------- Governance ---------- */
    setupGovernanceElements() {
        const governanceCards = document.querySelectorAll('[data-governance]');

        governanceCards.forEach(card => {
            card.addEventListener('click', () => {
                const details = card.querySelector('.governance-details');
                if (!details) return;

                const isOpening = details.classList.contains('hidden');
                document.querySelectorAll('.governance-details').forEach(d => d.classList.add('hidden'));
                if (isOpening) {
                    details.classList.remove('hidden');
                    this.animateSlideDown(details);
                }
            });
        });
    }

    /* ---------- Legal ---------- */
    setupLegalElements() {
        const legalCards = document.querySelectorAll('[data-legal]');

        legalCards.forEach(card => {
            card.addEventListener('click', () => {
                const details = card.querySelector('.docs-list, .powers-list');
                if (!details) return;

                const isOpening = details.classList.contains('hidden');
                document.querySelectorAll('.docs-list, .powers-list').forEach(d => d.classList.add('hidden'));
                if (isOpening) {
                    details.classList.remove('hidden');
                    this.animateSlideDown(details);
                }
            });
        });
    }

    /* ----------------------------------------------------
       ACCESSIBILITY / KEYBOARD NAV
    ---------------------------------------------------- */
    setupKeyboardNavigation() {
        const tabButtons = document.querySelectorAll('.tab-btn');

        tabButtons.forEach((button, index) => {
            button.setAttribute('tabindex', '0');
            button.addEventListener('keydown', (e) => {
                let targetIndex = index;
                switch (e.key) {
                    case 'ArrowRight':
                        targetIndex = (index + 1) % tabButtons.length;
                        break;
                    case 'ArrowLeft':
                        targetIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                        break;
                    case 'Home':
                        targetIndex = 0;
                        break;
                    case 'End':
                        targetIndex = tabButtons.length - 1;
                        break;
                    default:
                        return; // Exit for other keys
                }
                e.preventDefault();
                tabButtons[targetIndex].focus();
                tabButtons[targetIndex].click();
            });
        });

        // Make all interactive cards focusable
        document.querySelectorAll('.interactive-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    card.click();
                }
            });
        });
    }

    /* ----------------------------------------------------
       UTILITY METHODS
    ---------------------------------------------------- */
    animateSlideDown(element) {
        // Reset any inline height to calculate
        element.style.maxHeight = '0px';
        element.style.overflow = 'hidden';
        element.classList.remove('hidden');

        const targetHeight = element.scrollHeight;
        element.style.transition = 'max-height 0.3s ease-out';
        requestAnimationFrame(() => {
            element.style.maxHeight = targetHeight + 'px';
        });
        // Cleanup after animation
        setTimeout(() => {
            element.style.maxHeight = '';
            element.style.overflow = '';
            element.style.transition = '';
        }, 350);
    }

    showTooltip(element, message) {
        // Remove existing tooltip
        document.querySelectorAll('.custom-tooltip').forEach(t => t.remove());

        const tooltip = document.createElement('div');
        tooltip.className = 'custom-tooltip';
        tooltip.textContent = message;
        document.body.appendChild(tooltip);

        // Styling via inline (uses design system vars)
        Object.assign(tooltip.style, {
            position: 'absolute',
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-base)',
            padding: 'var(--space-12)',
            fontSize: 'var(--font-size-sm)',
            lineHeight: 'var(--line-height-normal)',
            maxWidth: '300px',
            zIndex: '1000',
            opacity: '0',
            transform: 'translateY(10px)',
            transition: 'opacity 0.25s var(--ease-standard), transform 0.25s var(--ease-standard)'
        });

        // Position
        const rect = element.getBoundingClientRect();
        requestAnimationFrame(() => {
            const tooltipRect = tooltip.getBoundingClientRect();
            let left = rect.left + (rect.width - tooltipRect.width) / 2;
            let top = rect.bottom + 10;

            // Horizontal bounds
            left = Math.max(10, Math.min(left, window.innerWidth - tooltipRect.width - 10));
            // Vertical bounds
            if (top + tooltipRect.height > window.innerHeight - 10) {
                top = rect.top - tooltipRect.height - 10;
            }
            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateY(0)';
        });

        // Auto-remove after 3s
        setTimeout(() => {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateY(10px)';
            setTimeout(() => tooltip.remove(), 300);
        }, 3000);
    }
}

// Bootstrap when DOM ready
document.addEventListener('DOMContentLoaded', () => new MasterAssociationGuide());