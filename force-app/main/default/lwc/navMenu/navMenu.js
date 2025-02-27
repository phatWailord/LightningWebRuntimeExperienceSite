import { LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import ICONS from "@salesforce/resourceUrl/Icons";
import { loadStyle } from "lightning/platformResourceLoader";

import { publish, MessageContext } from "lightning/messageService";

import PORTFOLIO_NAVIGATION_CHANNEL from "@salesforce/messageChannel/Portfolio_Navigation__c";

export default class NavMenu extends NavigationMixin(LightningElement) {
  url;
  about;
  burgerClicked = false;
  homeDropDownClicked = false;

  renderedCallback() {
    loadStyle(this, ICONS + "/style.css");
  }

  @wire(MessageContext)
  messageContext;

  navigateToAboutHome() {
    if (this.burgerClicked) {
      this.burgerClicked = false;
      const navMenu = this.template.querySelector(".topnav");
      navMenu.classList.toggle("responsive");
    }
    if (this.homeDropDownClicked) {
      this.homeDropDownClicked = false;
      const navMenu = this.template.querySelector(".dropdown-content");
      navMenu.classList.toggle("responsive");
    }
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Home"
      },
      state: {
        c__scrollTo: "about"
      }
    });
    const payload = {
      scrollToElementId: "about",
      pageTarget: "Home",
      scrollBehavior: "smooth"
    };
    publish(this.messageContext, PORTFOLIO_NAVIGATION_CHANNEL, payload);
  }

  navigateToSkillHome() {
    if (this.burgerClicked) {
      this.burgerClicked = false;
      const navMenu = this.template.querySelector(".topnav");
      navMenu.classList.toggle("responsive");
    }
    if (this.homeDropDownClicked) {
      this.homeDropDownClicked = false;
      const navMenu = this.template.querySelector(".dropdown-content");
      navMenu.classList.toggle("responsive");
    }
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Home"
      },
      state: {
        c__scrollTo: "skill"
      }
    });
    const payload = {
      scrollToElementId: "skill",
      pageTarget: "Home",
      scrollBehavior: "smooth"
    };
    publish(this.messageContext, PORTFOLIO_NAVIGATION_CHANNEL, payload);
  }

  navigateToInteractiveResume() {
    if (this.burgerClicked) {
      this.burgerClicked = false;
      const navMenu = this.template.querySelector(".topnav");
      navMenu.classList.toggle("responsive");
    }
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Interactive_Resume__c"
      }
    });
  }

  navigateToBlogList() {
    if (this.burgerClicked) {
      this.burgerClicked = false;
      const navMenu = this.template.querySelector(".topnav");
      navMenu.classList.toggle("responsive");
    }

    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Blog_List__c"
      }
    });
  }

  handleHamburgerClicked() {
    const navMenu = this.template.querySelector(".topnav");
    this.burgerClicked = !this.burgerClicked;
    navMenu.classList.toggle("responsive");
  }

  handleHomeClicked() {
    const navMenu = this.template.querySelector(".dropdown-content");
    this.homeDropDownClicked = !this.homeDropDownClicked;
    navMenu.classList.toggle("responsive");
  }
}