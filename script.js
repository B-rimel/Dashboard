// import { projects } from "./projects.js";
import { ideasData } from "./ideas.js";
import { resourceData } from "./resources.js";

const user = {
  name: "Luca",
  location: "Aurillac",
};

window.onload = getWeather;
async function getWeather() {
  const url = `http://api.weatherapi.com/v1/current.json?key=10bc3031c1e341d683495754250105&q=${user.location}&aqi=no`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const temperature = document.getElementById("temperature");
    const icon = document.getElementById("icon");
    temperature.innerText = `${data.current.temp_c}°C`;
    icon.src = data.current.condition.icon;
  } catch (error) {
    console.log(error);
  }
}
getWeather();

class listInput {
  constructor(name) {
    (this.name = name), (this.finished = false);
  }
}

const username = document.getElementById("username");
username.innerText = user.name;

// const todoInput = document.getElementById('todoInput');
// const todoInputBtn = document.getElementById('todoForm');
// const todoContent = [] ;
// const todoList = document.getElementById('todoList');

// todoInputBtn.addEventListener('submit', function(e) {
//     e.preventDefault();
//     console.log(todoInput.value);
//     todoContent.push(new listInput(todoInput.value));
//     console.log(todoContent);

//     const li = document.createElement('li');
//     li.innerText = todoInput.value;
//     todoList.appendChild(li);
//     todoInput.finished ? li.classList.add('finished') : li.classList.remove('finished');
//     todoInput.value = '';
// });

// const ideaInput = document.getElementById('ideaInput');
// const ideaInputBtn = document.getElementById('ideaForm');
// const ideaContent = [] ;
// const ideaList = document.getElementById('ideaList');

// ideaInputBtn.addEventListener('submit', function(e) {
//     e.preventDefault();
//     console.log(ideaInput.value);
//     ideaContent.push(new listInput(todoInput.value));

//     const li = document.createElement('li');
//     li.innerText = ideaInput.value;
//     ideaList.appendChild(li);
//     ideaInput.value = '';
// });

const timeContent = document.getElementById("time");
function updateTime() {
  const currentHour = new Date().getHours();
  const currentMinute = new Date().getMinutes();
  const currentSecond = new Date().getSeconds();
  const hourString = currentHour < 10 ? `0${currentHour}` : currentHour;
  const minuteString = currentMinute < 10 ? `0${currentMinute}` : currentMinute;
  const secondString = currentSecond < 10 ? `0${currentSecond}` : currentSecond;
  timeContent.innerText = `${hourString}:${minuteString}:${secondString}`;
}
updateTime();
setInterval(updateTime, 1000);

document.addEventListener("keydown", function (event) {
  const modals = {
    u: "converterModal",
    i: "favoriteModal",
    o: "paramsModal",
    p: "projectsModal",
  };
  console.log(event);
  if (event.altKey && event.key in modals) {
    const key = modals[event.key];
    if (key) {
      event.preventDefault();
      console.log(event);
      const modal = document.getElementById(key);
      console.log(modal);
      modal.classList.toggle("active");
    }
  }
});

const ideas = document.getElementById("ideasList");
for (let idea of ideasData.ideas) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = idea.name;
  li.appendChild(span);
  ideas.appendChild(li);
}

const resources = document.getElementById("resourcesList");

for (let resource of resourceData.resources) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = resource.url;
  const img = document.createElement("img");
  img.src = resource.icon;
  img.alt = resource.name; // add alt text for accessibility
  a.appendChild(img);
  const span = document.createElement("span");
  span.textContent = resource.name;
  a.appendChild(span);
  li.appendChild(a);
  resources.appendChild(li);
}
const nameForm = document.getElementById("nameForm");
nameForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameInput = document.getElementById("nameInput");
  user.name = nameInput.value;
  nameInput.value = "";
  username.innerText = user.name;
  hideModal();
});

const locationForm = document.getElementById("locationForm");
locationForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const locationInput = document.getElementById("locationInput");
  user.location = locationInput.value;
  locationInput.value = "";
  getWeather();
  hideModal();
});
