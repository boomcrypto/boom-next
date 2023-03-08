export default class NFT {
  constructor(options = {}) {
    this.name =
      options.name ||
      `${options.contractAddress}.${options.contractName}` ||
      "UNKNOWN";
    this.image = options.image || "/appicons/unknown.svg";
    this.description = options.description || "";
    this.collection = options.collection || "";
    this.video = options.video || null;
    this.audio = options.audio || null;
    this.animation_url = options.animation_url || null;
    this.asset_type = options.asset_type || "";
    this.metadata = options.metadata || {};
    this.properties = options.properties || {};
    this.attributes = options.attributes || [];
    this.userActions = options.userActions || {};
    this.contractId = options.contractId;
    this.contractName = options.contractName || "";
    this.contractAddress = options.contractAddress || "";
    this.assetName = options.assetName;
    this.assetId = options.assetId || -1;
    this.block_height = options.block_height || 0;
    this.tx_id = options.tx_id || "";
    this.seriesId = options.seriesId || -99;
    this.displayClass = options.displayClass || "";
    this.creator = options.creator || "";
    this.collectionSize = options.collectionSize || null;
    this.asset_identifier = options.asset_identifier || "";
    this.value = options.value || {};
  }
}
