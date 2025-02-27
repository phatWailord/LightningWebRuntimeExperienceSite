import { LightningElement, wire } from "lwc";
import ICONS from "@salesforce/resourceUrl/Icons";
import { loadStyle } from "lightning/platformResourceLoader";

import { NavigationMixin } from "lightning/navigation";

import { publish, MessageContext } from "lightning/messageService";

import PORTFOLIO_NAVIGATION_CHANNEL from "@salesforce/messageChannel/Portfolio_Navigation__c";

export default class PortfolioFooter extends NavigationMixin(LightningElement) {
  renderedCallback() {
    loadStyle(this, ICONS + "/style.css");
  }

  @wire(MessageContext)
  messageContext;

  navigateToAboutHome() {
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
      scrollBehavior: "instant"
    };
    publish(this.messageContext, PORTFOLIO_NAVIGATION_CHANNEL, payload);
  }

  navigateToSkillHome() {
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
      scrollBehavior: "instant"
    };
    publish(this.messageContext, PORTFOLIO_NAVIGATION_CHANNEL, payload);
  }

  navigateToInteractiveResume() {
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Interactive_Resume__c"
      }
    });
  }

  navigateToBlogList() {
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Blog_List__c"
      }
    });
  }
}