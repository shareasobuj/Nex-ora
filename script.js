
/* =====================================================
   NEXORA
   COMPLETE JAVASCRIPT
   LOCALSTORAGE AUTHENTICATION
===================================================== */


/* =====================================================
   BASIC ELEMENTS
===================================================== */

const body = document.body;

const themeBtn =
    document.getElementById("themeBtn");

const menuBtn =
    document.getElementById("menuBtn");

const navMenu =
    document.getElementById("navMenu");

const header =
    document.getElementById("header");

const backTop =
    document.getElementById("backTop");


/* =====================================================
   THEME
===================================================== */

function loadTheme() {

    const theme =
        localStorage.getItem("nexoraTheme");

    if (theme === "dark") {

        body.classList.add("dark");

        if (themeBtn) {

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        }

    }

}


loadTheme();


if (themeBtn) {

    themeBtn.addEventListener("click", () => {

        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {

            localStorage.setItem(
                "nexoraTheme",
                "dark"
            );

            themeBtn.innerHTML =
                '<i class="fa-solid fa-sun"></i>';

        } else {

            localStorage.setItem(
                "nexoraTheme",
                "light"
            );

            themeBtn.innerHTML =
                '<i class="fa-solid fa-moon"></i>';

        }

    });

}


/* =====================================================
   MOBILE MENU
===================================================== */

if (menuBtn && navMenu) {

    menuBtn.addEventListener("click", () => {

        navMenu.classList.toggle("show");

        const icon =
            menuBtn.querySelector("i");

        if (navMenu.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


document.querySelectorAll(".nav-link")
.forEach(link => {

    link.addEventListener("click", () => {

        if (navMenu) {

            navMenu.classList.remove("show");

        }

        if (menuBtn) {

            const icon =
                menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

});


/* =====================================================
   HEADER SCROLL
===================================================== */

if (header) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 30) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    });

}


/* =====================================================
   BACK TO TOP
===================================================== */

if (backTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {

            backTop.classList.add("show");

        } else {

            backTop.classList.remove("show");

        }

    });


    backTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =====================================================
   REVEAL ANIMATION
===================================================== */

const revealElements =
    document.querySelectorAll(".reveal");


if (revealElements.length > 0) {

    const observer =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });

}


/* =====================================================
   LOCALSTORAGE USER FUNCTIONS
===================================================== */


/*
    Get all registered users
*/

function getUsers() {

    const users =
        localStorage.getItem("nexoraUsers");

    if (!users) {

        return [];

    }

    try {

        return JSON.parse(users);

    } catch (error) {

        return [];

    }

}


/*
    Save users
*/

function saveUsers(users) {

    localStorage.setItem(
        "nexoraUsers",
        JSON.stringify(users)
    );

}


/*
    Get logged-in user
*/

function getCurrentUser() {

    const user =
        localStorage.getItem("nexoraCurrentUser");

    if (!user) {

        return null;

    }

    try {

        return JSON.parse(user);

    } catch (error) {

        return null;

    }

}


/*
    Save logged-in user
*/

function saveCurrentUser(user) {

    localStorage.setItem(
        "nexoraCurrentUser",
        JSON.stringify(user)
    );

}


/*
    Logout
*/

function logoutUser() {

    localStorage.removeItem(
        "nexoraCurrentUser"
    );

    window.location.href =
        "index.html";

}


/* =====================================================
   PASSWORD SHOW / HIDE
===================================================== */

document
.querySelectorAll(".password-toggle")
.forEach(button => {

    button.addEventListener("click", () => {

        const targetId =
            button.getAttribute("data-target");

        const input =
            document.getElementById(targetId);

        if (!input) return;


        const icon =
            button.querySelector("i");


        if (input.type === "password") {

            input.type = "text";

            icon.classList.remove(
                "fa-eye"
            );

            icon.classList.add(
                "fa-eye-slash"
            );

        } else {

            input.type = "password";

            icon.classList.remove(
                "fa-eye-slash"
            );

            icon.classList.add(
                "fa-eye"
            );

        }

    });

});


/* =====================================================
   SIGNUP
===================================================== */

const signupForm =
    document.getElementById("signupForm");


if (signupForm) {

    const password =
        document.getElementById(
            "signupPassword"
        );

    const strengthBar =
        document.getElementById(
            "strengthBar"
        );

    const strengthText =
        document.getElementById(
            "strengthText"
        );


    /* PASSWORD STRENGTH */

    if (password) {

        password.addEventListener(
            "input",
            () => {

                const value =
                    password.value;

                let strength = 0;


                if (value.length >= 6) {

                    strength++;

                }

                if (
                    /[A-Z]/.test(value)
                ) {

                    strength++;

                }

                if (
                    /[0-9]/.test(value)
                ) {

                    strength++;

                }

                if (
                    /[^A-Za-z0-9]/.test(value)
                ) {

                    strength++;

                }


                if (!value) {

                    strengthBar.style.width =
                        "0%";

                    strengthText.textContent =
                        "Password strength";

                }

                else if (strength <= 1) {

                    strengthBar.style.width =
                        "25%";

                    strengthText.textContent =
                        "Weak password";

                }

                else if (strength === 2) {

                    strengthBar.style.width =
                        "50%";

                    strengthText.textContent =
                        "Medium password";

                }

                else if (strength === 3) {

                    strengthBar.style.width =
                        "75%";

                    strengthText.textContent =
                        "Good password";

                }

                else {

                    strengthBar.style.width =
                        "100%";

                    strengthText.textContent =
                        "Strong password";

                }

            }
        );

    }


    /* SIGNUP SUBMIT */

    signupForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "signupName"
                ).value.trim();


            const email =
                document.getElementById(
                    "signupEmail"
                ).value.trim()
                .toLowerCase();


            const passwordValue =
                document.getElementById(
                    "signupPassword"
                ).value;


            const confirmPassword =
                document.getElementById(
                    "confirmPassword"
                ).value;


            const terms =
                document.getElementById(
                    "terms"
                ).checked;


            const message =
                document.getElementById(
                    "signupMessage"
                );


            /* NAME */

            if (name.length < 2) {

                showMessage(
                    message,
                    "Please enter your full name.",
                    "error"
                );

                return;

            }


            /* EMAIL */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showMessage(
                    message,
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /* PASSWORD */

            if (passwordValue.length < 6) {

                showMessage(
                    message,
                    "Password must contain at least 6 characters.",
                    "error"
                );

                return;

            }


            /* CONFIRM PASSWORD */

            if (
                passwordValue !==
                confirmPassword
            ) {

                showMessage(
                    message,
                    "Passwords do not match.",
                    "error"
                );

                return;

            }


            /* TERMS */

            if (!terms) {

                showMessage(
                    message,
                    "Please accept the Terms & Conditions.",
                    "error"
                );

                return;

            }


            /* GET USERS */

            const users =
                getUsers();


            /* DUPLICATE EMAIL */

            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                showMessage(
                    message,
                    "An account with this email already exists.",
                    "error"
                );

                return;

            }


            /* CREATE USER */

            const newUser = {

                id:
                    Date.now(),

                name:
                    name,

                email:
                    email,

                password:
                    passwordValue,

                createdAt:
                    new Date().toISOString()

            };


            users.push(newUser);


            saveUsers(users);


            /*
                Automatically login
                after registration
            */

            saveCurrentUser({

                id:
                    newUser.id,

                name:
                    newUser.name,

                email:
                    newUser.email

            });


            showMessage(
                message,
                "Account created successfully! Redirecting...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 1000);

        }
    );

}


/* =====================================================
   LOGIN
===================================================== */

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                ).value.trim()
                .toLowerCase();


            const password =
                document.getElementById(
                    "loginPassword"
                ).value;


            const rememberMe =
                document.getElementById(
                    "rememberMe"
                ).checked;


            const message =
                document.getElementById(
                    "loginMessage"
                );


            const users =
                getUsers();


            const user =
                users.find(
                    item =>
                        item.email === email &&
                        item.password === password
                );


            if (!user) {

                showMessage(
                    message,
                    "Invalid email or password.",
                    "error"
                );

                return;

            }


            /*
                Save session
            */

            saveCurrentUser({

                id:
                    user.id,

                name:
                    user.name,

                email:
                    user.email

            });


            /*
                Remember me
                is available for demo UI.
                Session is kept in localStorage.
            */

            if (rememberMe) {

                localStorage.setItem(
                    "nexoraRemember",
                    "true"
                );

            } else {

                localStorage.removeItem(
                    "nexoraRemember"
                );

            }


            showMessage(
                message,
                "Login successful! Redirecting...",
                "success"
            );


            setTimeout(() => {

                window.location.href =
                    "dashboard.html";

            }, 800);

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        () => {

            const confirmed =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmed) {

                logoutUser();

            }

        }
    );

}


/* =====================================================
   DASHBOARD AUTH PROTECTION
===================================================== */

if (
    window.location.pathname
        .toLowerCase()
        .includes("dashboard.html")
) {

    const currentUser =
        getCurrentUser();


    if (!currentUser) {

        window.location.href =
            "login.html";

    } else {

        const dashboardName =
            document.getElementById(
                "dashboardName"
            );

        const userEmail =
            document.getElementById(
                "userEmail"
            );

        const accountName =
            document.getElementById(
                "accountName"
            );

        const accountEmail =
            document.getElementById(
                "accountEmail"
            );


        if (dashboardName) {

            dashboardName.textContent =
                currentUser.name;

        }


        if (userEmail) {

            userEmail.textContent =
                currentUser.email;

        }


        if (accountName) {

            accountName.textContent =
                currentUser.name;

        }


        if (accountEmail) {

            accountEmail.textContent =
                currentUser.email;

        }

    }

}


/* =====================================================
   INDEX PAGE AUTH STATUS
===================================================== */

const authLinks =
    document.getElementById("authLinks");


if (authLinks) {

    const currentUser =
        getCurrentUser();


    if (currentUser) {

        authLinks.innerHTML = `

            <a href="dashboard.html"
               class="login-link">

                <i class="fa-solid fa-user"></i>

                Dashboard

            </a>

            <button
                id="navLogout"
                class="nav-button">

                Logout

            </button>

        `;


        const navLogout =
            document.getElementById(
                "navLogout"
            );


        navLogout.addEventListener(
            "click",
            () => {

                logoutUser();

            }
        );

    }

}


/* =====================================================
   FORGOT PASSWORD DEMO
===================================================== */

const forgotPassword =
    document.getElementById(
        "forgotPassword"
    );


if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        event => {

            event.preventDefault();


            const email =
                prompt(
                    "Enter your registered email:"
                );


            if (!email) return;


            const users =
                getUsers();


            const user =
                users.find(
                    item =>
                        item.email ===
                        email.trim().toLowerCase()
                );


            if (!user) {

                alert(
                    "No account found with this email."
                );

                return;

            }


            alert(
                "Demo mode: Password reset email would be sent here."
            );

        }
    );

}


/* =====================================================
   GOOGLE DEMO BUTTON
===================================================== */

const googleDemo =
    document.getElementById(
        "googleDemo"
    );


if (googleDemo) {

    googleDemo.addEventListener(
        "click",
        () => {

            alert(
                "Google authentication requires Google OAuth configuration. This button is UI-only in the localStorage version."
            );

        }
    );

}


const googleSignupDemo =
    document.getElementById(
        "googleSignupDemo"
    );


if (googleSignupDemo) {

    googleSignupDemo.addEventListener(
        "click",
        () => {

            alert(
                "Google authentication requires Google OAuth configuration. This button is UI-only in the localStorage version."
            );

        }
    );

}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "contactName"
                ).value.trim();


            const message =
                document.getElementById(
                    "formMessage"
                );


            showMessage(
                message,
                `Thanks ${name}! Your message has been received.`,
                "success"
            );


            contactForm.reset();


            setTimeout(() => {

                message.textContent = "";

            }, 5000);

        }
    );

}


/* =====================================================
   MESSAGE HELPER
===================================================== */

function showMessage(
    element,
    text,
    type
) {

    if (!element) return;


    element.textContent =
        text;


    if (type === "success") {

        element.style.color =
            "var(--success)";

    } else {

        element.style.color =
            "var(--danger)";

    }

}


/* =====================================================
   SMOOTH SCROLL
===================================================== */

document
.querySelectorAll('a[href^="#"]')
.forEach(anchor => {

    anchor.addEventListener(
        "click",
        function(event) {

            const id =
                this.getAttribute("href");


            if (id === "#") return;


            const target =
                document.querySelector(id);


            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth"
            });

        }
    );

});
