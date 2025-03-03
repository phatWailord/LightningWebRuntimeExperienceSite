import { LightningElement, wire, track } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";
import { loadStyle } from "lightning/platformResourceLoader";
import STYLE from "@salesforce/resourceUrl/portfolioCSS";
import { subscribe, MessageContext } from "lightning/messageService";
import PORTFOLIO_NAVIGATION_CHANNEL from "@salesforce/messageChannel/Portfolio_Navigation__c";

export default class PortfolioHomePage extends NavigationMixin(
  LightningElement
) {
  @track contentKey;
  @track loadedCurrentPageReference;
  renderedCallBackFired = false;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.loadedCurrentPageReference = currentPageReference;
      this.contentKey = currentPageReference.state.c__contentKey;

      console.log(`c__scrollTo = ${this.scrollTo}`);

      if (this.renderedCallBackFired) {
        if (this.scrollTo == "about") {
          //location.reload(true);
          //location.replace(location.href);
        } else if (this.scrollTo == "skill") {
          //location.reload(true);
          //location.replace(location.href);
        }
      }
    }
  }

  @wire(MessageContext)
  messageContext;
  subscribeToMessageChannel() {
    this.subscription = subscribe(
      this.messageContext,
      PORTFOLIO_NAVIGATION_CHANNEL,
      (message) => this.handleMessage(message)
    );
  }
  handleMessage(message) {
    console.log("message received: ", JSON.stringify(message));

    if (message.pageTarget == "Home" && message.scrollToElementId == "about") {
      this.handleAbout(message.scrollBehavior);
    } else if (
      message.pageTarget == "Home" &&
      message.scrollToElementId == "skill"
    ) {
      this.handleSkill(message.scrollBehavior);
    } else {
      console.log("message not for us");
    }
  }
  connectedCallback() {
    this.subscribeToMessageChannel();
  }

  renderedCallback() {
    if (!navigator.userAgent.includes("Chrome")) {
      console.log("were not in chromsis anymore");
      loadStyle(this, STYLE + "/portfolioHero.css");
    } else {
      console.log("were inside chrome");
      loadStyle(this, STYLE + "/portfolioHeroChrome.css");
    }
    var browser = navigator.userAgent;
    console.log("browser: ", browser);

    this.scrollTo = this.loadedCurrentPageReference.state.c__scrollTo;
    console.log(`c__scrollTo = ${this.scrollTo}`);

    if (this.scrollTo == "about") {
      this.renderedCallBackFired = true;
      let chosenContainer = this.template.querySelector(".about");
      console.log("triggered about");
      console.log(chosenContainer);

      setTimeout(function () {
        chosenContainer.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);

      console.log("scroll into view method fired");
    } else if (this.scrollTo == "skill") {
      this.renderedCallBackFired = true;
      let chosenContainer = this.template.querySelector(".skill");
      console.log("triggered skill");
      console.log(chosenContainer);
      setTimeout(function () {
        chosenContainer.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 100);

      console.log("scroll into view method fired");
    }
  }

  handleAbout(behaviorInput) {
    //this.value = event.detail.value;
    let chosenContainer = this.template.querySelector(".about");
    console.log("triggered about");
    console.log(chosenContainer);

    setTimeout(function () {
      chosenContainer.scrollIntoView({
        behavior: behaviorInput,
        block: "start"
      });
    }, 100);
  }
  handleSkill(behaviorInput) {
    //this.value = event.detail.value;
    let chosenContainer = this.template.querySelector(".skill");
    console.log("triggered skill");
    console.log(chosenContainer);
    setTimeout(function () {
      chosenContainer.scrollIntoView({
        behavior: behaviorInput,
        block: "start"
      });
    }, 100);
  }
}