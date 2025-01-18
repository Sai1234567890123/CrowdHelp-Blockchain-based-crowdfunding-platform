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
    if (!web3.utils.isAddress(campaignId)) {
      throw new Error("Invalid campaignId");
    }
    console.log("Campaign ID being passed to constructor:", campaignId);
    const summary = await Campaign(campaignId).methods.getCampaignSummary().call();
    console.log(summary);
    return formatSummary(summary, campaignId);
  } catch (err) {
    console.error("[ERROR] occurred in getting a campaign summary");
    console.error("Campaign ID:", campaignId);
    console.error("Error message:", err.message);
    throw err;
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
