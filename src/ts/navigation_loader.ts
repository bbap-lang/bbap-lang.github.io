import {fullNavigation, NavigationElement} from "./data/navigation";
import {delay} from "./std";

export const loadNavigation = async function () {

  let navElementLoaded: Element | null = null;

  for (let i = 0; i < 40; i++) {
    navElementLoaded = document.querySelector(".navigation");
    if (navElementLoaded != null) {
      break;
    }
    await delay(50);
  }

  const navElement = navElementLoaded;

  if (navElement == null) {
    console.error("Error creating navigation!");
    return;
  }

  const currentPath = window.location.pathname;
  const currentOpenNav = findCurrentOpenNav(fullNavigation, currentPath);


  renderNav(fullNavigation, navElement as HTMLElement, currentOpenNav);
}

function findCurrentOpenNav(nav: NavigationElement, currentPath: string): NavigationElement | null{
  if(nav.href == currentPath){
    return nav;
  }

  if(nav.children != undefined){
    for(let i = 0; i < nav.children.length; i++){
      const child = nav.children[i];
      const result = findCurrentOpenNav(child, currentPath);
      if(result != null){
        document.title = `BBAP - ${result.name}`;
        return result;
      }
    }
  }

  return null;
}

function renderNav(nav: NavigationElement, navHtml: HTMLElement, currentOpenNav: NavigationElement | null){
  const container = document.createElement("div");
  container.classList.add("nav-container");

  if(nav.children != undefined && nav.children.length > 0){
    const dropDown = generateDropDown(container);
    container.appendChild(dropDown);
    container.classList.add("has-children");

    if(containsNav(nav, currentOpenNav)){
      container.classList.add("open");
    }
  }

  const headline = generateHeadline(nav);
  container.appendChild(headline);

  if(nav.children != undefined){
    nav.children.forEach(child => {
      renderNav(child, container, currentOpenNav);
    });
  }

  navHtml.appendChild(container);
}

function containsNav(nav: NavigationElement, currentOpenNav: NavigationElement | null) {
  if(currentOpenNav == null){
    return false;
  }

  if(nav == currentOpenNav){
    return true;
  }

  if(nav.children != undefined){
    for(let i = 0; i < nav.children.length; i++){
      const child = nav.children[i];
      const result = containsNav(child, currentOpenNav);
      if(result){
        return true;
      }
    }
  }

  return false;
}

function generateDropDown(container: HTMLElement){
  const dropDown = document.createElement("span");
  dropDown.classList.add("drop-down");
  // dropDown.innerText = "▼";
  dropDown.onclick = () => {
    container.classList.toggle("open");
  }
  return dropDown;
}

function generateHeadline(nav: NavigationElement){
  const headlineTagName = nav.href == undefined ? "span" : "a";
  const headline = document.createElement(headlineTagName);
  headline.innerText = nav.name;
  if(nav.href != undefined){
    headline.setAttribute("href", nav.href);
  }

  return headline;
}
