
// LOGIN FUNCTIONS

function showLogin() {
    document.getElementById("home").style.display = "none";
    document.getElementById("login").style.display = "block";
}

function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    if (user === "admin" && pass === "1234") {
        document.getElementById("login").style.display = "none";
        document.getElementById("dashboard").style.display = "flex";
        showSection("overview");
    } else {
        document.getElementById("message").innerHTML =
            "Invalid Username or Password!";
    }
}

function logout() {
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("home").style.display = "block";
}


// SIDEBAR NAVIGATION

function showSection(sectionId) {
    document.querySelectorAll(".page").forEach(page => {
        page.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}


// DEVICE MANAGEMENT

let devices = [];

function addDevice() {
    let name = document.getElementById("deviceName").value.trim();
    let id = document.getElementById("deviceId").value.trim();
    let os = document.getElementById("deviceOS").value;

    if (name === "" || id === "") {
        alert("Enter Device Name and ID!");
        return;
    }

    if (devices.some(device => device.id === id)) {
        alert("Device ID already exists!");
        return;
    }

    devices.push({name, id, os});

    saveData();
    displayDevices();

    document.getElementById("deviceName").value = "";
    document.getElementById("deviceId").value = "";
}

function displayDevices() {
    let list = document.getElementById("deviceList");
    list.innerHTML = "";

    devices.forEach((device, index) => {
        list.innerHTML += `
            <div class="card">
                <h3>${escapeHTML(device.name)}</h3>
                <p>ID: ${escapeHTML(device.id)}</p>
                <p>OS: ${escapeHTML(device.os)}</p>
                <p>Status: Registered (Demo)</p>
                <button onclick="removeDevice(${index})">Remove</button>
            </div>
        `;
    });

    document.getElementById("totalDevices").innerText =
        25 + devices.length;
}

function removeDevice(index) {
    devices.splice(index, 1);
    saveData();
    displayDevices();
}


// APPLICATION MANAGEMENT

let apps = [];

function addApp() {
    let name = document.getElementById("appName").value.trim();
    let id = document.getElementById("appId").value.trim();

    if (name === "" || id === "") {
        alert("Enter Application Name and ID!");
        return;
    }

    if (apps.some(app => app.id === id)) {
        alert("Application ID already exists!");
        return;
    }

    apps.push({name, id});

    saveData();
    displayApps();

    document.getElementById("appName").value = "";
    document.getElementById("appId").value = "";
}

function displayApps() {
    let list = document.getElementById("appList");
    list.innerHTML = "";

    apps.forEach((app, index) => {
        list.innerHTML += `
            <div class="card">
                <h3>${escapeHTML(app.name)}</h3>
                <p>Application ID: ${escapeHTML(app.id)}</p>
                <p>Status: Registered (Demo)</p>
                <button onclick="removeApp(${index})">Remove</button>
            </div>
        `;
    });
}

function removeApp(index) {
    apps.splice(index, 1);
    saveData();
    displayApps();
}


// SAFE DISPLAY OF USER INPUT

function escapeHTML(value) {
    return value.replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


// SECURITY CHECK - DEMO ONLY

function checkSecurity() {
    document.getElementById("threatMessage").innerText =
        "Demo Check Complete: No live device scan performed.";
}


// DOWNLOAD REPORT

function downloadReport() {
    let report = `
CYBERGUARD SECURITY REPORT
--------------------------
Total Devices: ${25 + devices.length}
Newly Registered Devices: ${devices.length}
Managed Applications: ${apps.length}
Security Score: Demo value 95%
Monitoring: Demo Mode
`;

    let file = new Blob([report], {type: "text/plain"});
    let link = document.createElement("a");

    link.href = URL.createObjectURL(file);
    link.download = "Cyberguard_Report.txt";
    link.click();

    URL.revokeObjectURL(link.href);
}


// SAVE DATA IN BROWSER

function saveData() {
    localStorage.setItem(
        "cyberguardDevices",
        JSON.stringify(devices)
    );

    localStorage.setItem(
        "cyberguardApps",
        JSON.stringify(apps)
    );
}


// LOAD SAVED DATA

function loadData() {
    const savedDevices = localStorage.getItem("cyberguardDevices");
    const savedApps = localStorage.getItem("cyberguardApps");

    if (savedDevices) {
        devices = JSON.parse(savedDevices);
        displayDevices();
    }

    if (savedApps) {
        apps = JSON.parse(savedApps);
        displayApps();
    }
}


// LOAD DATA WHEN WEBSITE OPENS

loadData();

