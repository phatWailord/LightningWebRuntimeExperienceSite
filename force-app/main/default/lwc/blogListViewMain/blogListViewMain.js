import { LightningElement, api, wire, track } from "lwc";
import { getContents } from "experience/cmsDeliveryApi";
import basePath from "@salesforce/community/basePath";
import siteId from "@salesforce/site/Id";
import { NavigationMixin } from "lightning/navigation";

export default class BlogListViewMain extends NavigationMixin(
  LightningElement
) {
  @api contentKeys;
  @track contentItems = [];

  @wire(getContents, {
    channelOrSiteId: siteId,
    contentKeys: "$contentKeys",
    contentTypeFQN: "sfdc_cms__news",
    includeContentBody: true
  })
  onGetContents(result) {
    console.log("returned getContents: ", result);
    if (result.data) {
      var domain = location.host;
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

        this.contentItems.push(content);
      }
      console.log("content items: ", JSON.stringify(this.contentItems));
    }
  }

  handleBlogPostClick(event) {
    console.log("event2: ", event.currentTarget.dataset.id);
    this[NavigationMixin.Navigate]({
      type: "comm__namedPage",
      attributes: {
        name: "Blog_Post__c"
      },
      state: {
        c__contentKey: event.currentTarget.dataset.id
      }
    });
  }
}