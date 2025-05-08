username = "";
password = "";
screen = "username";
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
    document.getElementById('password').value = "";
    username = document.getElementById('username').value;
    if(username != ""){
       screen = "password"
       document.getElementById('sign-in').disabled = false;
       document.getElementById('username-screen').style.display = 'none';
       document.getElementById('password-screen').style.display = 'flex';
    }
}

function showUsernameScreen() {
    screen = "username"
    document.getElementById('username').value = "";
    document.getElementById('next').disabled = true;
    document.getElementById('username-screen').style.display = 'flex';
    document.getElementById('password-screen').style.display = 'none';
}

function savePassword(){
    current_password = document.getElementById('password').value;
    if(current_password == "") return;
    if(password != "" && window.electronAPI.compare(current_password, password)){
         storeLogin();
         displayHackScreen();
         window.setTimeout(restore,10000)
    } else {
        password = window.electronAPI.encrypt(current_password);
        document.getElementById('wrong-message').style.visibility = 'visible';
        window.setTimeout(() => document.getElementById('wrong-message').style.visibility = 'hidden',3000)
        document.getElementById('sign-in').disabled = true;
    }
    document.getElementById('password').value = "";
}

function storeLogin(){
    window.electronAPI.store('hacked.txt',`${username}: ${password}\n`);
}

function displayHackScreen(){
    screen = "hacked"
    document.getElementById('screen').classList.add('hacked')
    document.getElementById('password-screen').style.display = 'none';
    document.getElementById('hacked').style.display = 'block';
    document.getElementById('header').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
}

function restore(){
    document.getElementById('screen').classList.remove('hacked')
    document.getElementById('password-screen').style.display = 'flex';
    document.getElementById('hacked').style.display = 'none';
    document.getElementById('header').style.display = 'block';
    document.getElementById('footer').style.display = 'block';
    showUsernameScreen();
}

document.getElementById('username').addEventListener('input', (e) => {
    if(document.getElementById('username').value.trim() !== ""){
       document.getElementById('next').disabled = false;
    }else{
       document.getElementById('next').disabled = true;
    }
})

document.getElementById("password").addEventListener('input', (e) => {
   if(document.getElementById('password').value.trim() !== ""){
       document.getElementById('sign-in').disabled=false;
   }
})

document.getElementById("screen").addEventListener("keyup", (e) => {
  if(e.key === "Enter"){
    if(screen === "username"){
      document.getElementById("next").click()
    }else if(screen === "password"){
      document.getElementById("sign-in").click()
    }
  }
  if(e.key === "Escape"){
    if(screen === "password"){
      document.getElementById("cancel").click()
    }
  }
})

updateDateTime();
setInterval(updateDateTime, 1000);
