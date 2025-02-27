import { LightningElement, wire, track, api } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { getContents } from "experience/cmsDeliveryApi";
import basePath from "@salesforce/community/basePath";
import siteId from "@salesforce/site/Id";
import { NavigationMixin } from "lightning/navigation";

export default class BlogPostViewMain extends NavigationMixin(
  LightningElement
) {
  @track contentKey;
  @track loadedCurrentPageReference;
  renderedCallBackFired = false;
  @track contentItems = [];
  @track finalContent;

  @wire(CurrentPageReference)
  getStateParameters(currentPageReference) {
    if (currentPageReference) {
      this.loadedCurrentPageReference = currentPageReference;
      if (currentPageReference.state.c__contentKey) {
        this.contentKey = new Array(currentPageReference.state.c__contentKey);
        console.log("content key: ", this.contentKey);
      }
    }
  }

  @wire(getContents, {
    channelOrSiteId: siteId,
    contentKeys: "$contentKey",
    contentTypeFQN: "sfdc_cms__news",
    includeContentBody: true
  })
  onGetContents(result) {
    var domain;
    console.log("returned getContents: ", result);
    if (result.data) {
      domain = location.host;
      if (domain.includes("live-preview.salesforce-experience")) {
        console.log("domain includes live-preview");
        domain = domain.replace(
          "live-preview.salesforce-experience",
          "my.site"
        );
      }

      for (var item of result.data.contents) {
        console.log("item before conversion: ", JSON.stringify(item));

        const content = {
          key: item.contentKey,
          title: item.title,
          excerpt: item.contentBody.excerpt,
          body: item.contentBody.body,
          url:
            "https://" +
            domain +
            basePath +
            "vforcesite/sfsites/c" +
            item.contentBody.bannerImage.url
        };
        console.log("content before push: ", content);

        this.contentItems.push(content);
      }
      console.log("content items: ", JSON.stringify(this.contentItems));
      this.finalContent = this.contentItems[0];
    }
  }

  navigateToBlogList(event) {
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Blog_List__c"
      }
    });
  }
}