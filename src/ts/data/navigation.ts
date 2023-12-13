export const fullNavigation: NavigationElement = {
  name: "Home",
  href: "/",
  children: [
    {
      name: "Getting Started",
      href: "/getting-started/",
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
}

export interface NavigationElement {
  name: string;
  href?: string;
  children?: NavigationElement[];
}
