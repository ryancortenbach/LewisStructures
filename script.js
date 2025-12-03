// Lewis Structures Interactive Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initNavigation();
    initPracticeProblems();
    initExampleCards();
    initModal();
    initScrollAnimations();
});

// Smooth Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');

    // Highlight active section on scroll
    window.addEventListener('scroll', () => {
        // Add shadow to navbar on scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        // Update active nav link
        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Practice Problems - Reveal Answers
function initPracticeProblems() {
    const revealButtons = document.querySelectorAll('.reveal-btn');

    revealButtons.forEach(button => {
        button.addEventListener('click', function() {
            const answer = this.nextElementSibling;

            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                this.textContent = 'Hide Answer';
                this.style.background = '#6b7280';
            } else {
                answer.classList.add('hidden');
                this.textContent = 'Show Answer';
                this.style.background = '';
            }
        });
    });
}

// Example Cards - Click to show detailed info
function initExampleCards() {
    const exampleCards = document.querySelectorAll('.example-card');

    exampleCards.forEach(card => {
        card.addEventListener('click', function() {
            const molecule = this.dataset.molecule;
            showMoleculeDetails(molecule);
        });
    });
}

// Modal functionality
function initModal() {
    const modal = document.getElementById('example-modal');
    const closeBtn = document.querySelector('.close-modal');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
}

// Molecule details data
const moleculeData = {
    h2o: {
        name: 'Water',
        formula: 'H₂O',
        totalElectrons: 8,
        steps: [
            'Count valence electrons: H(1) × 2 + O(6) = 8',
            'Oxygen is the central atom (more electronegative than H)',
            'Draw single bonds: H—O—H (uses 4 electrons)',
            'Remaining electrons: 8 - 4 = 4',
            'Place remaining electrons on oxygen as 2 lone pairs',
            'Check: O has 8 electrons (2 bonds + 2 lone pairs), H has 2 each'
        ],
        bonding: '2 single bonds',
        lonePairs: '2 lone pairs on oxygen',
        geometry: 'Bent (due to lone pair repulsion)',
        notes: 'The lone pairs on oxygen cause the H-O-H bond angle to be 104.5°, less than the ideal tetrahedral angle of 109.5°.'
    },
    co2: {
        name: 'Carbon Dioxide',
        formula: 'CO₂',
        totalElectrons: 16,
        steps: [
            'Count valence electrons: C(4) + O(6) × 2 = 16',
            'Carbon is the central atom (less electronegative)',
            'Draw single bonds: O—C—O (uses 4 electrons)',
            'Remaining: 16 - 4 = 12 electrons',
            'Complete octets on outer oxygen atoms (3 lone pairs each = 12 e⁻)',
            'Carbon only has 4 electrons - needs more!',
            'Convert lone pairs to bonding pairs: O=C=O',
            'Now all atoms have octets'
        ],
        bonding: '2 double bonds',
        lonePairs: '2 lone pairs on each oxygen',
        geometry: 'Linear',
        notes: 'CO₂ is a linear molecule because there are no lone pairs on the central carbon atom to cause repulsion.'
    },
    nh3: {
        name: 'Ammonia',
        formula: 'NH₃',
        totalElectrons: 8,
        steps: [
            'Count valence electrons: N(5) + H(1) × 3 = 8',
            'Nitrogen is the central atom',
            'Draw single bonds to 3 hydrogens (uses 6 electrons)',
            'Remaining: 8 - 6 = 2 electrons',
            'Place remaining pair on nitrogen as lone pair',
            'Check: N has 8 electrons (3 bonds + 1 lone pair)'
        ],
        bonding: '3 single bonds',
        lonePairs: '1 lone pair on nitrogen',
        geometry: 'Trigonal pyramidal',
        notes: 'The lone pair on nitrogen causes the H-N-H bond angles to be 107°, slightly less than tetrahedral.'
    },
    ch4: {
        name: 'Methane',
        formula: 'CH₄',
        totalElectrons: 8,
        steps: [
            'Count valence electrons: C(4) + H(1) × 4 = 8',
            'Carbon is the central atom',
            'Draw single bonds to 4 hydrogens (uses 8 electrons)',
            'All electrons used, all atoms satisfied',
            'Check: C has 8 electrons (4 bonds), each H has 2'
        ],
        bonding: '4 single bonds',
        lonePairs: 'None',
        geometry: 'Tetrahedral',
        notes: 'Methane has perfect tetrahedral geometry with H-C-H bond angles of 109.5°. Carbon uses all 4 valence electrons for bonding.'
    },
    n2: {
        name: 'Nitrogen Gas',
        formula: 'N₂',
        totalElectrons: 10,
        steps: [
            'Count valence electrons: N(5) × 2 = 10',
            'Draw single bond between N atoms (uses 2 electrons)',
            'Remaining: 10 - 2 = 8 electrons',
            'Distribute to complete octets (4 each as lone pairs)',
            'Each N has only 4 electrons - not enough!',
            'Convert lone pairs to bonds until both have octets',
            'Result: N≡N with 1 lone pair on each N'
        ],
        bonding: '1 triple bond',
        lonePairs: '1 lone pair on each nitrogen',
        geometry: 'Linear',
        notes: 'The triple bond in N₂ is one of the strongest bonds in chemistry, making nitrogen gas very stable and unreactive.'
    },
    hcl: {
        name: 'Hydrogen Chloride',
        formula: 'HCl',
        totalElectrons: 8,
        steps: [
            'Count valence electrons: H(1) + Cl(7) = 8',
            'Draw single bond between H and Cl (uses 2 electrons)',
            'Remaining: 8 - 2 = 6 electrons',
            'Place remaining electrons on Cl as 3 lone pairs',
            'Check: H has 2, Cl has 8'
        ],
        bonding: '1 single bond',
        lonePairs: '3 lone pairs on chlorine',
        geometry: 'Linear (diatomic)',
        notes: 'HCl is a polar molecule due to the electronegativity difference between H and Cl.'
    },
    o3: {
        name: 'Ozone',
        formula: 'O₃',
        totalElectrons: 18,
        steps: [
            'Count valence electrons: O(6) × 3 = 18',
            'Central oxygen with 2 outer oxygens',
            'Draw single bonds: O—O—O (uses 4 electrons)',
            'Remaining: 18 - 4 = 14 electrons',
            'Distribute to complete octets',
            'Central O needs more electrons - form double bond',
            'Result has resonance: O=O—O ↔ O—O=O'
        ],
        bonding: '1 single + 1 double (resonance)',
        lonePairs: 'Multiple (see resonance forms)',
        geometry: 'Bent',
        notes: 'Ozone has two equivalent resonance structures. The actual O-O bonds are equivalent with a bond order of 1.5.'
    },
    hno3: {
        name: 'Nitric Acid',
        formula: 'HNO₃',
        totalElectrons: 24,
        steps: [
            'Count valence electrons: H(1) + N(5) + O(6) × 3 = 24',
            'N is central, one O bonds to H',
            'Draw skeleton: H—O—N with 2 other O attached to N',
            'Use remaining electrons to complete octets',
            'Form double bond to one oxygen',
            'Has resonance structures'
        ],
        bonding: '1 N-O single, 1 N=O double, 1 O-H single',
        lonePairs: 'Multiple on oxygen atoms',
        geometry: 'Trigonal planar around N',
        notes: 'Nitric acid has resonance structures. The two N-O bonds (not bonded to H) have partial double bond character.'
    }
};

// Show molecule details in modal
function showMoleculeDetails(moleculeKey) {
    const molecule = moleculeData[moleculeKey];
    if (!molecule) return;

    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
        <div class="molecule-detail">
            <h2>${molecule.formula}</h2>
            <h3>${molecule.name}</h3>

            <div class="detail-section">
                <h4>Total Valence Electrons: ${molecule.totalElectrons}</h4>
            </div>

            <div class="detail-section">
                <h4>Step-by-Step Process</h4>
                <ol class="steps-list">
                    ${molecule.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>

            <div class="detail-grid">
                <div class="detail-item">
                    <strong>Bonding:</strong>
                    <p>${molecule.bonding}</p>
                </div>
                <div class="detail-item">
                    <strong>Lone Pairs:</strong>
                    <p>${molecule.lonePairs}</p>
                </div>
                <div class="detail-item">
                    <strong>Molecular Geometry:</strong>
                    <p>${molecule.geometry}</p>
                </div>
            </div>

            <div class="detail-notes">
                <strong>Notes:</strong>
                <p>${molecule.notes}</p>
            </div>
        </div>
    `;

    // Add styles for modal content
    const style = document.createElement('style');
    style.textContent = `
        .molecule-detail h2 {
            font-size: 2rem;
            color: #2563eb;
            margin-bottom: 4px;
        }
        .molecule-detail h3 {
            color: #6b7280;
            font-weight: 400;
            margin-bottom: 24px;
        }
        .detail-section {
            margin-bottom: 24px;
        }
        .detail-section h4 {
            color: #1f2937;
            margin-bottom: 12px;
        }
        .steps-list {
            padding-left: 20px;
        }
        .steps-list li {
            color: #4b5563;
            margin-bottom: 8px;
            line-height: 1.5;
        }
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 16px;
            margin-bottom: 24px;
        }
        .detail-item {
            background: #f3f4f6;
            padding: 16px;
            border-radius: 8px;
        }
        .detail-item strong {
            display: block;
            color: #2563eb;
            margin-bottom: 4px;
        }
        .detail-item p {
            color: #4b5563;
            margin: 0;
        }
        .detail-notes {
            background: linear-gradient(135deg, #eff6ff, #f0fdf4);
            padding: 16px;
            border-radius: 8px;
            border-left: 4px solid #2563eb;
        }
        .detail-notes strong {
            color: #1f2937;
        }
        .detail-notes p {
            color: #4b5563;
            margin-top: 8px;
            margin-bottom: 0;
        }
    `;

    // Remove old style if exists
    const oldStyle = document.getElementById('modal-styles');
    if (oldStyle) oldStyle.remove();

    style.id = 'modal-styles';
    document.head.appendChild(style);

    document.getElementById('example-modal').classList.add('active');
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll('.step, .example-card, .group-card, .exception-card, .practice-problem');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Add active class styling for nav links
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .nav-links a.active {
        color: #2563eb;
    }
`;
document.head.appendChild(styleSheet);
