/* eslint-disable vars-on-top */
import { LightningElement } from "lwc";
import IMAGES from "@salesforce/resourceUrl/PortfolioImages";
export default class SkillCards extends LightningElement {
  adminImageURL = IMAGES + "/workExperience.jpeg";
  trainingImageURL = IMAGES + "/techDemos.jpeg";
  serviceImageURL = IMAGES + "/aboutMe.jpeg";

  renderedCallback() {
    if (!navigator.userAgent.includes("Chrome")) {
      console.log("were not in chromsis anymore");
      var self = this;
      var container = this.template.querySelector(".intro");
      var container1 = this.template.querySelector(".first");
      var container2 = this.template.querySelector(".second");
      var container3 = this.template.querySelector(".third");
      const triggerBottom = (window.innerHeight / 5) * 4;

      window.addEventListener("scroll", (event) => {
        var div = self.template.querySelector(".intro");
        if (div && container.classList) {
          var rect = div.getBoundingClientRect();
          // calculations here
          if (rect.top > -200 && rect.top < triggerBottom) {
            container.classList.add("show");
          } else {
            container.classList.remove("show");
          }
          //console.log("div top: ", rect.top);
          //console.log("triggerBottom ", triggerBottom);
        }
      });

      window.addEventListener("scroll", (event) => {
        var div = self.template.querySelector(".first");
        if (div && container.classList) {
          var rect = div.getBoundingClientRect();
          // calculations here
          if (rect.top > -200 && rect.top < triggerBottom) {
            container1.classList.add("show");
          } else {
            container1.classList.remove("show");
          }
          //console.log("div top: ", rect.top);
          //console.log("triggerBottom ", triggerBottom);
        }
      });

      window.addEventListener("scroll", (event) => {
        var div = self.template.querySelector(".second");
        if (div && container.classList) {
          var rect = div.getBoundingClientRect();
          // calculations here
          if (rect.top > -200 && rect.top < triggerBottom) {
            container2.classList.add("show");
          } else {
            container2.classList.remove("show");
          }
          //console.log("div top: ", rect.top);
          //console.log("triggerBottom ", triggerBottom);
        }
      });

      window.addEventListener("scroll", (event) => {
        var div = self.template.querySelector(".third");
        if (div && container.classList) {
          var rect = div.getBoundingClientRect();
          // calculations here
          if (rect.top > -200 && rect.top < triggerBottom) {
            container3.classList.add("show");
          } else {
            container3.classList.remove("show");
          }
          //console.log("div top: ", rect.top);
          //console.log("triggerBottom ", triggerBottom);
        }
      });
    }
  }
}