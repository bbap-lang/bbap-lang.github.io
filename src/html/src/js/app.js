(() => {
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/ts/std.ts
  var delay = function(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // src/ts/code.ts
  var parseAllCode = function() {
    return __async(this, null, function* () {
      let codeLoaded = null;
      for (let i = 0; i < 40; i++) {
        codeLoaded = document.querySelectorAll("code.block");
        if (codeLoaded != null && codeLoaded.length > 0) {
          break;
        }
        yield delay(50);
      }
      if (codeLoaded == null) {
        console.error("Error parsing code!");
        return;
      }
      codeLoaded.forEach((code) => {
        transformCode(code);
      });
    });
  };
  function transformCode(code) {
    const lines = code.innerHTML.split("\n");
    while (lines.length > 0 && lines[0].trim() == "") {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() == "") {
      lines.pop();
    }
    const transformedLines = lines.map(transfromLine);
    const minLeft = Math.min.apply(null, transformedLines.map((line) => line.left).filter(notNull));
    const parsedLines = transformedLines.map((line) => {
      return { text: line.text, left: asNumber(line.left) - minLeft };
    });
    const newCode = parsedLines.map((line) => `<span class="line" style="padding-left: ${line.left * 10 + 5}px">${line.text}</span>`).join("\n");
    code.innerHTML = newCode;
  }
  function notNull(val) {
    return val !== null;
  }
  function asNumber(val) {
    return val == null ? 0 : val;
  }
  function transfromLine(line) {
    line = line.replace("	", "   ");
    const codePart = line.trim();
    if (codePart.length == 0) {
      return { text: "", left: null };
    }
    const whiteSpace = line.split(codePart, 1)[0];
    return { text: codePart, left: whiteSpace.length };
  }

  // src/ts/data/navigation.ts
  var fullNavigation = {
    name: "Home",
    href: "/",
    children: [
      {
        name: "Getting Started",
        href: "/getting-started/",
        children: [
          {
            name: "Start Coding",
            href: "/getting-started/start-coding.html"
          }
        ]
      },
      {
        name: "Keywords",
        children: [
          {
            name: "Alias",
            href: "/keywords/alias.html"
          },
          {
            name: "Extend",
            href: "/keywords/extend.html"
          },
          {
            name: "Struct",
            href: "/keywords/struct.html"
          },
          {
            name: "Func",
            href: "/keywords/func.html"
          },
          {
            name: "Enum",
            href: "/keywords/enum.html"
          },
          {
            name: "Break",
            href: "/keywords/break.html"
          },
          {
            name: "Continue",
            href: "/keywords/continue.html"
          },
          {
            name: "Switch / Case",
            href: "/keywords/switch-case.html"
          },
          {
            name: "Const",
            href: "/keywords/const.html"
          }
        ]
      },
      {
        name: "Values",
        children: [
          {
            name: "String Literals",
            href: "/values/string_literal.html"
          },
          {
            name: "Number Literals",
            href: "/values/number_literals.html"
          }
        ]
      },
      {
        name: "SQL",
        href: "/sql/",
        children: []
      },
      {
        name: "Config",
        href: "/config/",
        children: [
          {
            name: "use-scope",
            href: "/config/use-scope.html"
          },
          {
            name: "abap-dependencies",
            href: "/config/abap-dependencies.html"
          },
          {
            name: "start-file",
            href: "/config/start-file.html"
          }
        ]
      },
      {
        name: "Types",
        children: [
          {
            name: "String",
            href: "/types/string.html"
          },
          {
            name: "Number Types",
            href: "/types/numbers.html"
          },
          {
            name: "Char",
            href: "/types/char.html"
          }
        ]
      },
      {
        name: "Default Functions",
        children: [
          {
            name: "Print",
            href: "/default-functions/print.html"
          },
          {
            name: "Println",
            href: "/default-functions/println.html"
          }
        ]
      }
    ]
  };

  // src/ts/navigation_loader.ts
  var loadNavigation = function() {
    return __async(this, null, function* () {
      let navElementLoaded = null;
      for (let i = 0; i < 40; i++) {
        navElementLoaded = document.querySelector(".navigation");
        if (navElementLoaded != null) {
          break;
        }
        yield delay(50);
      }
      const navElement = navElementLoaded;
      if (navElement == null) {
        console.error("Error creating navigation!");
        return;
      }
      const currentPath = window.location.pathname;
      const currentOpenNav = findCurrentOpenNav(fullNavigation, currentPath);
      renderNav(fullNavigation, navElement, currentOpenNav);
    });
  };
  function findCurrentOpenNav(nav, currentPath) {
    if (nav.href == currentPath) {
      return nav;
    }
    if (nav.children != void 0) {
      for (let i = 0; i < nav.children.length; i++) {
        const child = nav.children[i];
        const result = findCurrentOpenNav(child, currentPath);
        if (result != null) {
          document.title = `BBAP - ${result.name}`;
          return result;
        }
      }
    }
    return null;
  }
  function renderNav(nav, navHtml, currentOpenNav) {
    const container = document.createElement("div");
    container.classList.add("nav-container");
    if (nav.children != void 0 && nav.children.length > 0) {
      const dropDown = generateDropDown(container);
      container.appendChild(dropDown);
      container.classList.add("has-children");
      if (containsNav(nav, currentOpenNav)) {
        container.classList.add("open");
      }
    }
    const headline = generateHeadline(nav);
    container.appendChild(headline);
    if (nav.children != void 0) {
      nav.children.forEach((child) => {
        renderNav(child, container, currentOpenNav);
      });
    }
    navHtml.appendChild(container);
  }
  function containsNav(nav, currentOpenNav) {
    if (currentOpenNav == null) {
      return false;
    }
    if (nav == currentOpenNav) {
      return true;
    }
    if (nav.children != void 0) {
      for (let i = 0; i < nav.children.length; i++) {
        const child = nav.children[i];
        const result = containsNav(child, currentOpenNav);
        if (result) {
          return true;
        }
      }
    }
    return false;
  }
  function generateDropDown(container) {
    const dropDown = document.createElement("span");
    dropDown.classList.add("drop-down");
    dropDown.onclick = () => {
      container.classList.toggle("open");
    };
    return dropDown;
  }
  function generateHeadline(nav) {
    const headlineTagName = nav.href == void 0 ? "span" : "a";
    const headline = document.createElement(headlineTagName);
    headline.innerText = nav.name;
    if (nav.href != void 0) {
      headline.setAttribute("href", nav.href);
    }
    return headline;
  }

  // src/ts/main.ts
  var start = () => __async(void 0, null, function* () {
    console.log("Loading Navigation");
    loadNavigation();
    console.log("Parsing code blocks");
    parseAllCode();
    console.log("Successfully Started!");
    return true;
  });

  // src/ts/browser.ts
  start();
})();
//# sourceMappingURL=app.js.map
