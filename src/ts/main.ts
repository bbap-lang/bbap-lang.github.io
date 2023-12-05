import {parseAllCode} from "./code";
import {loadNavigation} from "./navigation_loader";

export const start = async (): Promise<boolean> => {
  console.log("Loading Navigation");
  loadNavigation();

  console.log("Parsing code blocks")
  parseAllCode();

  console.log("Successfully Started!");

  return true;
}
