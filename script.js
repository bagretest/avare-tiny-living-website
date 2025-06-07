        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        });

        // Scroll to top button
        const scrollTopBtn = document.getElementById('scrollTop');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Investment Calculator
        function calculateInvestment() {
            // Pega o valor selecionado e remove "R$" e pontos
            let valueStr = document.getElementById('value').value.replace('R$', '').replace('.', '').replace(',', '.').trim();
            const tinyHouseValue = parseFloat(valueStr);

            const downPaymentPercent = parseFloat(document.getElementById('downPayment').value);
            const loanTerm = parseInt(document.getElementById('loanTerm').value);
            const monthlyRental = parseFloat(document.getElementById('monthlyRental').value);

            // Valores fixos para simulação
            const interestRate = 10; // 10% ao ano
            const occupancyRate = 70; // 70%
            const monthlyExpenses = 300; // R$ 300

            // Cálculos
            const downPaymentValue = tinyHouseValue * (downPaymentPercent / 100);
            const financedAmount = tinyHouseValue - downPaymentValue;
            const monthlyInterestRate = (interestRate / 100) / 12;
            const numberOfPayments = loanTerm * 12;

            // Cálculo da parcela mensal (fórmula PMT)
            let monthlyPayment = 0;
            if (monthlyInterestRate > 0) {
                monthlyPayment = financedAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                                (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
            } else {
                monthlyPayment = financedAmount / numberOfPayments;
            }

            // Receita e lucro
            const effectiveMonthlyRental = monthlyRental * (occupancyRate / 100);
            const monthlyProfit = effectiveMonthlyRental - monthlyPayment - monthlyExpenses;

            // Atualiza resultados
            document.getElementById('downPaymentValue').textContent = formatCurrency(downPaymentValue);
            document.getElementById('financedAmount').textContent = formatCurrency(financedAmount);
            document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);

            // Mostra resultados
            document.getElementById('results').style.display = 'block';
            }

            // Color coding for profit
            const profitElement = document.getElementById('monthlyProfit');
            const roiElement = document.getElementById('monthlyROI');
            if (monthlyProfit > 0) {
                profitElement.style.color = '#39B54A';
                roiElement.style.color = '#39B54A';
            } else {
                profitElement.style.color = '#dc3545';
                roiElement.style.color = '#dc3545';
            }

        function formatCurrency(value) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(value);
        }

        // Contact form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(function() {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                document.getElementById('contactForm').reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Mobile menu toggle
        const mobileMenu = document.querySelector('.mobile-menu');
        const navMenu = document.querySelector('.nav-menu');

        mobileMenu.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Loading screen
        window.addEventListener('load', function() {
            const loading = document.getElementById('loading');
            loading.style.display = 'none';
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.value-item, .feature-card, .gallery-item').forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'all 0.6s ease';
            observer.observe(item);
        });

        // Dynamic color scheme based on time of day
        function setTimeBasedTheme() {
            const hour = new Date().getHours();
            const root = document.documentElement;
            
            if (hour >= 18 || hour <= 6) {
                // Evening/Night mode - warmer tones
                root.style.setProperty('--primary-cyan', '#008B8B');
                root.style.setProperty('--primary-green', '#2E8B57');
            }
        }

        // Initialize theme
        setTimeBasedTheme();

        // Auto-calculate on input change
        document.querySelectorAll('#tinyHouseValue, #downPayment, #interestRate, #monthlyRental, #occupancyRate, #monthlyExpenses').forEach(input => {
            input.addEventListener('input', function() {
                if (document.getElementById('results').style.display === 'block') {
                    calculateInvestment();
                }
            });
        });

        // Performance optimization: Lazy loading for images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }

        // Initial calculation on page load
        document.addEventListener('DOMContentLoaded', function() {
            calculateInvestment();
        });
        