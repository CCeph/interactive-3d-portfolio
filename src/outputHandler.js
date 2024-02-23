import triggerReflowOnElement from "./commonUtils";

function createDOMCache() {
  const $container = document.querySelector("[data-container]");
  const $box = document.querySelector("[data-box]");
  const $root = document.querySelector(":root");
  const $educationFace = document.querySelector("[data-education-face]");
  const $educationGroup = document.querySelector("[data-education-group]");
  const $projectsFace = document.querySelector("[data-projects-face]");
  const $projectsGroup = document.querySelector("[data-projects-group]");
  const $aboutFace = document.querySelector("[data-about-face]");
  const $aboutGroup = document.querySelector("[data-about-group]");
  const $contactFace = document.querySelector("[data-contact-face]");
  const $contactGroup = document.querySelector("[data-contact-group]");
  const $navMessage = document.querySelector("[data-nav-message]");
  const $projectsPage = document.querySelector("[data-projects-page]");
  const $homeButton = document.querySelector("[data-home-button]");
  return {
    $container,
    $box,
    $root,
    $educationFace,
    $educationGroup,
    $projectsFace,
    $projectsGroup,
    $aboutFace,
    $aboutGroup,
    $contactFace,
    $contactGroup,
    $navMessage,
    $projectsPage,
    $homeButton,
  };
}

const cachedDOM = createDOMCache();

function createRotateController(
  root,
  container,
  cube,
  cssRotXVarName,
  cssRotYVarName
) {
  let dragging = false;
  let initialPosition = {};
  let initialRotation = {};

  function isAndroid() {
    if ((navigator.userAgent || window.opera).match(/Android/i)) {
      return true;
    }
    return false;
  }

  function getInitialBoxRotation() {
    const rootElement = root;
    const rootStyles = getComputedStyle(rootElement);
    const xString = rootStyles.getPropertyValue(cssRotXVarName);
    const yString = rootStyles.getPropertyValue(cssRotYVarName);
    const rotX = Number(xString.slice(0, -3));
    const rotY = Number(yString.slice(0, -3));
    return { rotX, rotY };
  }

  function initDragRotate(e) {
    dragging = true;
    if (isAndroid()) {
      initialPosition = {
        x: e.targetTouches[0].pageX,
        y: e.targetTouches[0].pageY,
      };
    } else {
      initialPosition = {
        x: e.pageX,
        y: e.pageY,
      };
    }
    initialRotation = getInitialBoxRotation();
  }

  function dragRotate(e) {
    if (!dragging) {
      return;
    }
    let currentPosition = {};

    if (isAndroid()) {
      currentPosition = {
        x: e.targetTouches[0].pageX,
        y: e.targetTouches[0].pageY,
      };
    } else {
      currentPosition = {
        x: e.pageX,
        y: e.pageY,
      };
    }
    const delta = {
      x: ((currentPosition.x - initialPosition.x) / window.innerWidth) * 360,
      y: ((initialPosition.y - currentPosition.y) / window.innerHeight) * 360,
    };

    const rootElement = root;
    rootElement.style.setProperty(
      cssRotXVarName,
      `${delta.y + initialRotation.rotX}deg`
    );
    rootElement.style.setProperty(
      cssRotYVarName,
      `${delta.x + initialRotation.rotY}deg`
    );

    let rotateParam = "";
    rotateParam += ` rotateX(${delta.y + initialRotation.rotX}deg)`;
    rotateParam += ` rotateY(${delta.x + initialRotation.rotY}deg)`;
    const cubeElement = cube;
    cubeElement.style.transform = rotateParam;
  }

  function endDragRotate() {
    if (!dragging) {
      return;
    }

    dragging = false;
  }

  container.addEventListener("mousedown", initDragRotate);
  container.addEventListener("touchstart", initDragRotate);

  container.addEventListener("mousemove", dragRotate);
  container.addEventListener("touchmove", dragRotate);

  container.addEventListener("mouseup", endDragRotate);
  container.addEventListener("touchend", endDragRotate);

  return {
    initDragRotate,
    dragRotate,
    endDragRotate,
  };
}

// eslint-disable-next-line no-unused-vars
const mainBoxRotateController = createRotateController(
  cachedDOM.$root,
  cachedDOM.$container,
  cachedDOM.$box,
  "--initialRotateX",
  "--initialRotateY"
);

function showNavMessage() {
  const { $navMessage } = cachedDOM;
  $navMessage.classList.remove("hide");
  $navMessage.classList.add("active");
}

function hideNavMessage() {
  const { $navMessage } = cachedDOM;
  $navMessage.classList.remove("active");
  $navMessage.classList.add("hide");
}

function showProjectsPage() {
  const { $projectsPage } = cachedDOM;
  $projectsPage.classList.remove("hide");
  triggerReflowOnElement($projectsPage);
  $projectsPage.classList.add("active");
}

function hideProjectsPage() {
  const { $projectsPage } = cachedDOM;
  $projectsPage.classList.remove("active");
  triggerReflowOnElement($projectsPage);
  $projectsPage.classList.add("hide");
}

function removeClassesFromElement(classNameArray, element) {
  classNameArray.forEach((className) => {
    element.classList.remove(className);
  });
}

function createNavListeners() {
  const additionalClassesArray = [
    "projectsActive",
    "educationActive",
    "aboutActive",
    "contactActive",
    "closed",
  ];

  const doubleClickStates = {
    projectsDoubleClicked: false,
    aboutDoubleClicked: false,
    contactDoubleClicked: false,
    educationDoubleClicked: false,
  };

  function checkDoubleClick(event, elementDoubleClicked) {
    if (!doubleClickStates[elementDoubleClicked]) {
      doubleClickStates[elementDoubleClicked] = true;
      setTimeout(() => {
        doubleClickStates[elementDoubleClicked] = false;
      }, 300);
      return false;
    }
    event.preventDefault();
    return true;
  }

  cachedDOM.$projectsFace.addEventListener("click", (event) => {
    const doubleClicked = checkDoubleClick(event, "projectsDoubleClicked");
    if (doubleClicked) {
      removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
      cachedDOM.$box.classList.add("projectsActive");
      cachedDOM.$projectsGroup.classList.remove("closed");
      triggerReflowOnElement(cachedDOM.$box);
      cachedDOM.$projectsGroup.classList.add("open");
      hideNavMessage();
      showProjectsPage();
    }
  });

  cachedDOM.$homeButton.addEventListener("click", () => {
    hideProjectsPage();
    removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$box.classList.add("closed");
    cachedDOM.$projectsGroup.classList.remove("open");
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$projectsGroup.classList.add("closed");
    showNavMessage();
  });

  /* cachedDOM.$aboutFace.addEventListener("click", (event) => {
    const doubleClicked = checkDoubleClick(event, "aboutDoubleClicked");
    if (doubleClicked) {
      removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
      cachedDOM.$box.classList.add("aboutActive");
      cachedDOM.$aboutGroup.classList.remove("closed");
      triggerReflowOnElement(cachedDOM.$box);
      cachedDOM.$aboutGroup.classList.add("open");
      hideNavMessage();
      showProjectsPage();
    }
  }); */

  cachedDOM.$aboutFace.addEventListener("dblclick", () => {
    console.log("About");
  });

  cachedDOM.$contactFace.addEventListener("dblclick", () => {
    console.log("Contact");
  });

  cachedDOM.$box.addEventListener(
    "animationend",
    () => {
      showNavMessage();

      /* The following style element sets the box's default coordinates. If the user does
      not drag the box before double clicking a page, these will be the starting coordinates
      for rotating the box. */
      cachedDOM.$box.style.transform =
        "rotateX(var(--initialRotateX)) rotateY(var(--initialRotateY))";
    },
    {
      once: true,
    }
  );
}

createNavListeners();
