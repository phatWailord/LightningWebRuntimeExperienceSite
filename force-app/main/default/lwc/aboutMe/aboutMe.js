/* eslint-disable vars-on-top */
import { LightningElement, wire, track } from "lwc";
import IMAGES from "@salesforce/resourceUrl/PortfolioImages";
import { CurrentPageReference } from "lightning/navigation";

export default class AboutMe extends LightningElement {
  @wire(CurrentPageReference)
  currentPageRef;

  aboutMeImageURL = IMAGES + "/aboutMeHeadShot.JPG";

  renderedCallback() {
    if (!navigator.userAgent.includes("Chrome")) {
      console.log("were not in chromsis anymore");
      //console.log("browser: ", browser);

      var container = this.template.querySelector(".outer-container-about-me");
      const triggerBottom = (window.innerHeight / 5) * 4;
      container.classList.add("hidden");

      var self = this;
      window.addEventListener("scroll", (event) => {
        var div = self.template.querySelector(".outer-container-about-me");
        if (div && container.classList) {
          var rect = div.getBoundingClientRect();
          // calculations here
          if (rect.top < triggerBottom) {
            container.classList.add("show");
          } else {
            container.classList.remove("show");
          }
          /*console.log("div top: ", rect.top);
        console.log(
          "div top - window: ",
          rect.top - windowHeighth + rect.height / 4
        );*/
        }
      });
    }
  }
}