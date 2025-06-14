$(document).ready(function () {
    // Load navbar from external partial
    $("#header").load("partials/navbar.html");

    // Dummy user credentials for demo login
    const demoUser = {
        email: "admin@example.com",
        username: "admin",
        password: "123456",
    };

    /**
     * Shows a fake progress bar animation
     * @param {Function} callback - Function to run after progress ends
     */
    function showProgress(callback) {
        $("#progressBar").css("width", "0%").show();

        setTimeout(() => {
            $("#progressBar").css("width", "50%");
        }, 1000);

        setTimeout(() => {
            $("#progressBar").css("width", "100%");
            setTimeout(() => {
                $("#progressBar").fadeOut(200, function () {
                    $("#progressBar").css("width", "0%");
                    if (callback) callback();
                });
            }, 300);
        }, 300);
    }

    // ========================
    // LOGIN FORM HANDLER
    // ========================
    $("#loginForm").submit(function (e) {
        e.preventDefault();
        const username = $("#username").val().trim();
        const password = $("#password").val();

        const rememberMe = $("#rememberMe").is(":checked");

        // Check credentials against demo user
        if ((username === demoUser.username || username === demoUser.email) && password === demoUser.password) {
            if (rememberMe) {
                localStorage.setItem("rememberedUsername", username);
            } else {
                localStorage.removeItem("rememberedUsername");
            }
            $("#successModal").fadeIn();

            $("#password").val("");
            $("#loginMessage").hide();
            // Optional: You can redirect the user here
        } else {
            $("#loginMessage").text("Invalid username or password.").css("color", "red");
        }
    });
    const remembered = localStorage.getItem("rememberedUsername");
    if (remembered) {
        $("#username").val(remembered);
        $("#rememberMe").prop("checked", true);
    }

    // ========================
    // REGISTER FORM HANDLER (Dummy)
    // ========================
    $("#registerForm").submit(function (e) {
        e.preventDefault();

        const email = $("#regEmail").val().trim();
        const username = $("#regUsername").val().trim();
        const password = $("#regPassword").val();

        if (email && username && password) {
            $("#registerModal").fadeIn();
            $("#registerForm").hide();
            $("#loginForm").fadeIn();
        }
    });

    // ========================
    // SWITCH TO REGISTER FORM
    // ========================
    $("#showRegister").click(function (e) {
        e.preventDefault();
        showProgress(() => {
            $("#loginForm").hide();
            $("#registerForm").fadeIn();
        });
    });

    // ========================
    // SWITCH TO LOGIN FORM
    // ========================
    $("#showLogin").click(function (e) {
        e.preventDefault();
        showProgress(() => {
            $("#registerForm").hide();
            $("#loginForm").fadeIn();
        });
    });

    // ========================
    // CLOSE SUCCESS MODAL
    // ========================
    $("#closeModal").click(function () {
        $("#successModal").fadeOut();
    });

    // ========================
    // CLOSE REGISTER MODAL
    // ========================
    $("#closeRegisterModal").click(function () {
        $("#registerModal").fadeOut();
        $("#username").val("");
        $("#password").val("");
        showProgress(() => {
            $("#registerForm").hide();
            $("#loginForm").fadeIn();
        });
    });

    // ========================
    // THEME HANDLING
    // ========================
    /**
     * Apply theme to body element and update toggle state
     * @param {string} theme - "light" or "dark"
     */
    function applyTheme(theme) {
        $("body").removeClass("light-theme dark-theme").addClass(`${theme}-theme`);
        $("#themeToggle").prop("checked", theme === "dark");
        $(".theme-label").text(theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode");
    }

    // Load theme from localStorage on page load
    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);

    // Handle toggle change
    $("#themeToggle").change(function () {
        const newTheme = this.checked ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        applyTheme(newTheme);
    });
});
