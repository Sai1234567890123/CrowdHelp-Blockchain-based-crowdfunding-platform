import crowdHelp from "./contract/crowdHelp";
import web3 from "./web3";
import Campaign from "./contract/campaign";

export const getDeployedCampaigns = async () => {
  console.log("get deployed campaigns called");
  const campaignsList = await crowdHelp.methods.returnDeployedCampaigns().call();
  console.log("deployed: " + campaignsList);
  return campaignsList;
};

export const getCampaignsSummary = async (campaigns) => {
  console.log("Called with..");
  console.log(campaigns);
  try {
    const campaignsSummary = await Promise.all(
      campaigns.map((campaign, idx) =>
        Campaign(campaigns[idx]).methods.getCampaignSummary().call()
      )
    );
    console.log(campaignsSummary);
    var formattedSummaries = [];
    campaignsSummary.forEach((summary, idx) => {
      formattedSummaries.push(formatSummary(summary, campaigns[idx]));
    });
    return formattedSummaries;
  } catch (err) {
    console.error("[ERROR] occurred in getting campaigns summary");
    console.error(err);
  }
};

export const getCampaignDetails = async (campaignId) => {
  try {
    if (!campaignId) {
      console.error("Invalid campaignId provided.");
      return null;
    }
    if (!web3.utils.isAddress(campaignId)) {
      console.error("Invalid campaignId provided.");
      return null;
    }
    console.log("Campaign ID being passed to constructor:", campaignId);
    const summary = await Campaign(campaignId).methods.getCampaignSummary().call();
    console.log(summary);
    return formatSummary(summary, campaignId);
  } catch (err) {
    if (err.message.includes("gas")) {
      console.error("Gas issue encountered:", err.message);
    } else if (err.message.includes("network")) {
      console.error("Network connection problem:", err.message);
    } else {
      console.error("Error getting campaign summary:", err.message);
    }
    console.error("Error getting campaign summary: ", err);
    return null;
  }
};

function formatSummary(summary, campaignId) {
  const formattedSummary = {
    id: campaignId,
    title: summary["title"],
    description: summary["desc"],
    ethRaised: web3.utils.fromWei(summary["goalAmount"], "ether"),
    ethFunded: web3.utils.fromWei(summary["currentAmount"], "ether"),
    minContribAmount: web3.utils.fromWei(summary["minContribution"], "ether"),
    createdBy: summary["projectStarter"],
    bannerUrl: summary["imageUrl"],
    deadline: parseInt(summary["projectDeadline"]),
    campaignStatus: cvtIntStatusToEnum(summary["currentState"]),
    backersCount: summary["numBackers"],
  };
  return formattedSummary;
}

function cvtIntStatusToEnum(status) {
  var str = "";
  switch (status) {
    case "0":
      str = "ACTIVE";
      break;
    case "1":
      str = "SUCCESS";
      break;
    case "2":
      str = "EXPIRED";
      break;
    case "3":
      str = "ABORTED";
      break;
    default:
      str = "UNKNOWN";
  }
  return str;
}
