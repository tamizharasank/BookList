
import "@testing-library/jest-dom";

Object.defineProperty(global.Image.prototype, "src", {
  set(src: string) {
    setTimeout(() => {
      if (src && !String(src).includes("BROKEN_IMAGE")) {
        this.onload && this.onload(new Event("load"));
      } else {
        this.onerror && this.onerror(new Event("error"));
      }
    }, 0);
  },
});
