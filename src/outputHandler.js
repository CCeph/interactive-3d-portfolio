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
  const $aboutPage = document.querySelector("[data-about-page]");
  const $educationPage = document.querySelector("[data-education-page]");
  const $contactPage = document.querySelector("[data-contact-page]");
  const $projectsHomeButton = document.querySelector(
    "[data-projects-home-button]"
  );
  const $educationHomeButton = document.querySelector(
    "[data-education-home-button]"
  );
  const $aboutHomeButton = document.querySelector("[data-about-home-button]");
  const $contactHomeButton = document.querySelector(
    "[data-contact-home-button]"
  );
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
    $aboutPage,
    $educationPage,
    $contactPage,
    $projectsHomeButton,
    $educationHomeButton,
    $aboutHomeButton,
    $contactHomeButton,
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
  let touchDragging = false;

  let initialMousePosition = {};
  let initialPosition = {};
  let initialMobilePosition = {};
  let initialMobileBackupPosition = {};
  let initialRotation = {};

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

    initialMousePosition = {
      x: e.pageX,
      y: e.pageY,
    };

    initialRotation = getInitialBoxRotation();
  }

  function initTouchDragRotate(e) {
    touchDragging = true;

    try {
      initialMobilePosition = {
        x: e.targetTouches[0].pageX,
        y: e.targetTouches[0].pageY,
      };
    } catch (error) {
      initialMobilePosition = {
        x: null,
        y: null,
      };
    }

    try {
      initialMobileBackupPosition = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      };
    } catch (error) {
      initialMobileBackupPosition = {
        x: null,
        y: null,
      };
    }

    initialRotation = getInitialBoxRotation();
  }

  function dragRotate(e) {
    if (!dragging) {
      return;
    }
    const currentPosition = {
      x: e.pageX,
      y: e.pageY,
    };

    const delta = {
      x:
        ((currentPosition.x - initialMousePosition.x) / window.innerWidth) *
        360,
      y:
        ((initialMousePosition.y - currentPosition.y) / window.innerHeight) *
        360,
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

  function touchDragRotate(e) {
    if (!touchDragging) {
      return;
    }
    let currentPosition = {};
    let currentMobilePosition = {};
    let currentMobileBackupPosition = {};

    try {
      currentMobilePosition = {
        x: e.targetTouches[0].pageX,
        y: e.targetTouches[0].pageY,
      };
    } catch (error) {
      currentMobilePosition = {
        x: null,
        y: null,
      };
    }

    try {
      currentMobileBackupPosition = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      };
    } catch (error) {
      currentMobileBackupPosition = {
        x: null,
        y: null,
      };
    }

    // Checks if mobile or mouse input is being used, then sets the data accordingly.
    if (
      !(
        currentMobilePosition.x === null ||
        currentMobilePosition.y === null ||
        initialMobilePosition.x === null ||
        initialMobilePosition.y === null
      )
    ) {
      currentPosition = currentMobilePosition;
      initialPosition = initialMobilePosition;
    } else {
      currentPosition = currentMobileBackupPosition;
      initialPosition = initialMobileBackupPosition;
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

  function endTouchDragRotate() {
    if (!touchDragging) {
      return;
    }

    touchDragging = false;
  }

  container.addEventListener("mousedown", initDragRotate);
  container.addEventListener("touchstart", initTouchDragRotate);

  container.addEventListener("mousemove", dragRotate);
  container.addEventListener("touchmove", touchDragRotate);

  container.addEventListener("mouseup", endDragRotate);
  container.addEventListener("touchend", endTouchDragRotate);

  return {
    initDragRotate,
    initTouchDragRotate,
    dragRotate,
    touchDragRotate,
    endDragRotate,
    endTouchDragRotate,
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

function showEducationPage() {
  const { $educationPage } = cachedDOM;
  $educationPage.classList.remove("hide");
  triggerReflowOnElement($educationPage);
  $educationPage.classList.add("active");
}

function hideEducationPage() {
  const { $educationPage } = cachedDOM;
  $educationPage.classList.remove("active");
  triggerReflowOnElement($educationPage);
  $educationPage.classList.add("hide");
}

function showAboutPage() {
  const { $aboutPage } = cachedDOM;
  $aboutPage.classList.remove("hide");
  triggerReflowOnElement($aboutPage);
  $aboutPage.classList.add("active");
}

function hideAboutPage() {
  const { $aboutPage } = cachedDOM;
  $aboutPage.classList.remove("active");
  triggerReflowOnElement($aboutPage);
  $aboutPage.classList.add("hide");
}

function showContactPage() {
  const { $contactPage } = cachedDOM;
  $contactPage.classList.remove("hide");
  triggerReflowOnElement($contactPage);
  $contactPage.classList.add("active");
}

function hideContactPage() {
  const { $contactPage } = cachedDOM;
  $contactPage.classList.remove("active");
  triggerReflowOnElement($contactPage);
  $contactPage.classList.add("hide");
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

  function setBoxRotateValuesTo(x, y) {
    const rootElement = cachedDOM.$root;
    rootElement.style.setProperty("--initialRotateX", `${x}deg`);
    rootElement.style.setProperty("--initialRotateY", `${y}deg`);
  }

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

  cachedDOM.$projectsHomeButton.addEventListener("click", () => {
    hideProjectsPage();
    removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$box.classList.add("closed");
    cachedDOM.$projectsGroup.classList.remove("open");
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$projectsGroup.classList.add("closed");
    showNavMessage();
    setBoxRotateValuesTo(0, 0);
  });

  cachedDOM.$educationFace.addEventListener("click", (event) => {
    const doubleClicked = checkDoubleClick(event, "educationDoubleClicked");
    if (doubleClicked) {
      removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
      cachedDOM.$box.classList.add("educationActive");
      cachedDOM.$educationGroup.classList.remove("closed");
      triggerReflowOnElement(cachedDOM.$box);
      cachedDOM.$educationGroup.classList.add("open");
      hideNavMessage();
      showEducationPage();
    }
  });
  cachedDOM.$educationHomeButton.addEventListener("click", () => {
    hideEducationPage();
    removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$box.classList.add("closed");
    cachedDOM.$educationGroup.classList.remove("open");
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$educationGroup.classList.add("closed");
    showNavMessage();
    setBoxRotateValuesTo(0, -90);
  });

  cachedDOM.$aboutFace.addEventListener("click", (event) => {
    const doubleClicked = checkDoubleClick(event, "aboutDoubleClicked");
    if (doubleClicked) {
      removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
      cachedDOM.$box.classList.add("aboutActive");
      cachedDOM.$aboutGroup.classList.remove("closed");
      triggerReflowOnElement(cachedDOM.$box);
      cachedDOM.$aboutGroup.classList.add("open");
      hideNavMessage();
      showAboutPage();
    }
  });
  cachedDOM.$aboutHomeButton.addEventListener("click", () => {
    hideAboutPage();
    removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$box.classList.add("closed");
    cachedDOM.$aboutGroup.classList.remove("open");
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$aboutGroup.classList.add("closed");
    showNavMessage();
    setBoxRotateValuesTo(0, -180);
  });

  cachedDOM.$contactFace.addEventListener("click", (event) => {
    const doubleClicked = checkDoubleClick(event, "contactDoubleClicked");
    if (doubleClicked) {
      removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
      cachedDOM.$box.classList.add("contactActive");
      cachedDOM.$contactGroup.classList.remove("closed");
      triggerReflowOnElement(cachedDOM.$box);
      cachedDOM.$contactGroup.classList.add("open");
      hideNavMessage();
      showContactPage();
    }
  });
  cachedDOM.$contactHomeButton.addEventListener("click", () => {
    hideContactPage();
    removeClassesFromElement(additionalClassesArray, cachedDOM.$box);
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$box.classList.add("closed");
    cachedDOM.$contactGroup.classList.remove("open");
    triggerReflowOnElement(cachedDOM.$box);
    cachedDOM.$contactGroup.classList.add("closed");
    showNavMessage();
    setBoxRotateValuesTo(0, 90);
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
