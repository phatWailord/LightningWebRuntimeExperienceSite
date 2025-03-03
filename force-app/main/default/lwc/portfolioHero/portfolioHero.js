/* eslint-disable vars-on-top */
import { LightningElement } from "lwc";
import IMAGES from "@salesforce/resourceUrl/PortfolioImages";

export default class PortfolioHero extends LightningElement {
  imageURL = IMAGES + "/hero.jpeg";

  renderedCallback() {
    if (!navigator.userAgent.includes("Chrome")) {
      console.log("were not in chromsis anymore");
      var browser = navigator.userAgent;
      console.log("browser: ", browser);

      var container = this.template.querySelector(".outer-container-hero");
      var windowHeighth = window.innerHeight;
      const triggerBottom = (window.innerHeight / 5) * 4;

      if (container && container.getBoundingClientRect().top > -200) {
        container.classList.add("show");
      }
      var self = this;

      window.addEventListener("scroll", (event) => {
        var div = self.template.querySelector(".outer-container-hero");
        if (div && container.classList) {
          var rect = div.getBoundingClientRect();
          // calculations here
          if (rect.top > -200) {
            container.classList.add("show");
          } else {
            container.classList.remove("show");
          }
          console.log("div top: ", rect.top);
          console.log("triggerBottom ", triggerBottom);
        }
      });
    }
  }
}