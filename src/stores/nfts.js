import { defineStore } from "pinia";
import { useNetworkStore } from "./network";
import { useUserStore } from "./user";
import { ASSET_PAGE_LIMIT } from "../common/constants";

export const useNFTStore = defineStore("nfts", {
  state: () => ({
    items: [],
    ids: [],
    loaded: false,
  }),

  getters: {
    boomboxes() {
      return true;
    },
  },

  actions: {
    async getAll() {
      const userStore = useUserStore();
      const res = await getNFTsPaginated(userStore.stxAddress);
      this.items = res;
    },
  },
});

async function getNftsByPage(principal, page) {
  const networkStore = useNetworkStore();
  const offset = page * ASSET_PAGE_LIMIT;
  const response = await fetch(
    `${networkStore.apiUrl}/extended/v1/tokens/nft/holdings?principal=${principal}&limit=${ASSET_PAGE_LIMIT}&offset=${offset}&unachored=true`
  );
  return await response.json();
}

async function getNFTsPaginated(principal) {
  let page = 0;
  let total = [];

  while (true) {
    let { results } = await getNftsByPage(principal, page);
    console.info("results", results);
    if (results.length === 0) break;
    total.push(results);
    page++;
  }
  return total;
}

// const nfts = [
//   {
//     contractId: "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v3",
//     contractName: "stacks-punks-v3",
//     metadata: {
//       title: "Punk 2011",
//       image: "https://www.stackspunks.com/assets/punks/punk2011.png",
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v3",
//         assetId: 2011,
//       },
//     },
//     assetName: "stacks-punks",
//     assetId: 2011,
//     owner: "Unknown",
//     blockHeight: 72473,
//     tx_id: "0x682d62075986e719a448e8aafc8b6c78e7f7be90faed8dabc0a4e965d33c08ba",
//     seriesName: "StacksPunks",
//     seriesId: -1,
//     sender: "SP21728T40XTN7EV3PZXXZDHVT8GJH1JPKDEC8WGX",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image: "",
//     description: "",
//     name: "",
//     properties: {},
//     attributes: [],
//     serialNumber: -1,
//     seriesCreator: "StacksPunks",
//     seriesCount: 0,
//   },
//   {
//     contractId: "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-pops",
//     contractName: "stacks-pops",
//     metadata: {
//       title: "Stacks Pops #6442",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/QmPAenbtyzFXCYWnmbcp1gRoJeH229nr4y37Gb32ePLSv6/6442.png",
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-pops",
//         assetId: 6442,
//       },
//     },
//     assetName: "stacks-pops",
//     assetId: 6442,
//     owner: "Unknown",
//     blockHeight: 63121,
//     tx_id: "0xce8519e89a9e4022e4dfa8496eaff60e73017573e962f6700e6abb616b471488",
//     seriesName: "Stacks Pops",
//     seriesId: -1,
//     sender: "SP21728T40XTN7EV3PZXXZDHVT8GJH1JPKDEC8WGX",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image: "",
//     description: "",
//     name: "",
//     properties: {},
//     attributes: [],
//     serialNumber: -1,
//     seriesCreator: "axopoa.stx",
//     seriesCount: 0,
//   },
//   {
//     contractId: "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.free-punks-v0",
//     contractName: "free-punks-v0",
//     metadata: {
//       title: "Punk 8504",
//       image:
//         "https://punks.fra1.cdn.digitaloceanspaces.com/assets/punks/punk8504.png",
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.free-punks-v0",
//         assetId: 8504,
//       },
//     },
//     assetName: "free-punks",
//     assetId: 8504,
//     owner: "Unknown",
//     blockHeight: 63121,
//     tx_id: "0x16a30547c2d647040bb52aa6f0d630d82713233a9c1345d7ced64566223773bb",
//     seriesName: "Free Punks",
//     seriesId: -1,
//     sender: "SP21728T40XTN7EV3PZXXZDHVT8GJH1JPKDEC8WGX",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image: "",
//     description: "",
//     name: "",
//     properties: {},
//     attributes: [],
//     serialNumber: -1,
//     seriesCreator: "Unknown",
//     seriesCount: 0,
//   },
//   {
//     contractId: "SP000000000000000000002Q6VF78.bns",
//     contractName: "bns",
//     metadata: {
//       title: "BNS",
//       image: "/images/tokens/metaverse_big-bitcoin.png",
//     },
//     userActions: {},
//     assetName: "bns",
//     assetId: -999,
//     owner: "Unknown",
//     blockHeight: 63121,
//     tx_id: "0x6fc37ae361fa64ba69e8114e2934196a9174ea03d1a1229668a2d9913c47709b",
//     seriesName: "BNS",
//     seriesId: -99,
//     sender: "SP21728T40XTN7EV3PZXXZDHVT8GJH1JPKDEC8WGX",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image: "",
//     description: "",
//     name: "",
//     properties: {},
//     attributes: [],
//   },
//   {
//     contractId: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.steady-lads-msa",
//     contractName: "steady-lads-msa",
//     metadata: {
//       title: "Steady Lads MSA #5074",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/QmZWhtWG1uaM9N8bpyU3xxSG8TuPNwxumC8gAMh5oBDvYj/5074.png",
//       description: "Steady Lads MSA leaves no lad behind on Stacks.",
//       attributes: [
//         { trait_type: "Helmet", value: "Lost" },
//         { trait_type: "Head", value: "Red Candle" },
//         { trait_type: "Background", value: "Running Man" },
//         { trait_type: "Base", value: "Cherry" },
//         { trait_type: "Markings", value: "Pyramidal" },
//         { trait_type: "Sleeves", value: "Dull blue" },
//         { trait_type: "Back", value: "Backpack Heavy" },
//         { trait_type: "Shoulders", value: "Riband" },
//       ],
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SP3D6PV2ACBPEKYJTCMH7HEN02KP87QSP8KTEH335.steady-lads-msa",
//         assetId: 5074,
//       },
//     },
//     assetName: "Steady-Lads-MSA",
//     assetId: 5074,
//     owner: "Unknown",
//     blockHeight: 89911,
//     tx_id: "0xe0d436e2266b8113ebaf2e521f78d0726e87533ff013739de5c11ae95246bfda",
//     seriesName: "Steady-Lads-MSA",
//     seriesId: -99,
//     sender: "",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image:
//       "https://cloudflare-ipfs.com/ipfs/QmZWhtWG1uaM9N8bpyU3xxSG8TuPNwxumC8gAMh5oBDvYj/5074.png",
//     description: "Steady Lads MSA leaves no lad behind on Stacks.",
//     name: "Steady Lads MSA #5074",
//     properties: {},
//     attributes: [
//       { trait_type: "Helmet", value: "Lost" },
//       { trait_type: "Head", value: "Red Candle" },
//       { trait_type: "Background", value: "Running Man" },
//       { trait_type: "Base", value: "Cherry" },
//       { trait_type: "Markings", value: "Pyramidal" },
//       { trait_type: "Sleeves", value: "Dull blue" },
//       { trait_type: "Back", value: "Backpack Heavy" },
//       { trait_type: "Shoulders", value: "Riband" },
//     ],
//   },
//   {
//     contractId:
//       "SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.your-black-flowers-grace-hye",
//     contractName: "your-black-flowers-grace-hye",
//     metadata: {
//       title: "YourBlackFlowers #23",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/QmexJ2S2hPk9G9FMWFoBT4zzuUJVr1JCe4MBNV8srqNNCq/23.jpg",
//       description:
//         "Your Black Flowers is Grace Hye's third artistic NFT project to be minted on Stacks.\n Each NFT is a step in the creative process of the artist.\n All holders will become members of a vibrant artistic community within the Stacks ecosystem.\n Some NFTs will unlock special content IRL.",
//       attributes: [
//         { trait_type: "Artistic Potential", value: "54" },
//         { trait_type: "Surprise Gift", value: "" },
//       ],
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId:
//           "SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.your-black-flowers-grace-hye",
//         assetId: 20,
//       },
//     },
//     assetName: "your-black-flowers",
//     assetId: 20,
//     owner: "Unknown",
//     blockHeight: 72473,
//     tx_id: "0xcbfdf2a76c2f6829e98cf4e82f10d7f232dcf6d2fb28a3b92384aee39aa7830a",
//     seriesName: "your-black-flowers",
//     seriesId: -99,
//     sender: "SP21728T40XTN7EV3PZXXZDHVT8GJH1JPKDEC8WGX",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image:
//       "https://cloudflare-ipfs.com/ipfs/QmexJ2S2hPk9G9FMWFoBT4zzuUJVr1JCe4MBNV8srqNNCq/23.jpg",
//     description:
//       "Your Black Flowers is Grace Hye's third artistic NFT project to be minted on Stacks.\n Each NFT is a step in the creative process of the artist.\n All holders will become members of a vibrant artistic community within the Stacks ecosystem.\n Some NFTs will unlock special content IRL.",
//     name: "YourBlackFlowers #23",
//     properties: {},
//     attributes: [
//       { trait_type: "Artistic Potential", value: "54" },
//       { trait_type: "Surprise Gift", value: "" },
//     ],
//   },
//   {
//     contractId: "SPGGAEQWA7Y9HRZY5T0XJCEYEZ28J6RKCCC1HP9M.PaperPlanes",
//     contractName: "PaperPlanes",
//     metadata: {
//       title: "PaperPlanes",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/bafybeic7zxzw2bcsghryhdrkgij4atchwb2evbl4lvex5uyb5x6qq4ljdi/PaperPlanes.undefined",
//       description:
//         "Congratulations to Jacob Ryan for STR. As a way to celebrate, I minted Paper Planes one of my favorite songs from my long discography. \n\nThis Music Video is Performed by Brythreesixty also known as 3hunnatheArtist in Web3 community.\n\nTo those who mint this copy of the song, they are free to use it for free without any copyright claims.\n\n",
//       attributes: [
//         { trait_type: "genre", value: "hiphop" },
//         { trait_type: "license", value: "Licence for Indie Artists CC360." },
//         { trait_type: "creator", value: "brythreesixty-3hunnatheartist" },
//       ],
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SPGGAEQWA7Y9HRZY5T0XJCEYEZ28J6RKCCC1HP9M.PaperPlanes",
//         assetId: 9,
//       },
//     },
//     assetName: "PaperPlanes",
//     assetId: 9,
//     owner: "Unknown",
//     blockHeight: 72471,
//     tx_id: "0x95ddf806fcbecee1e91ce2bcf760de868d58232654d8c7ebd9e688e08222dc99",
//     seriesName: "PaperPlanes",
//     seriesId: -99,
//     sender: "SPGGAEQWA7Y9HRZY5T0XJCEYEZ28J6RKCCC1HP9M",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image:
//       "https://cloudflare-ipfs.com/ipfs/bafybeic7zxzw2bcsghryhdrkgij4atchwb2evbl4lvex5uyb5x6qq4ljdi/PaperPlanes.undefined",
//     description:
//       "Congratulations to Jacob Ryan for STR. As a way to celebrate, I minted Paper Planes one of my favorite songs from my long discography. \n\nThis Music Video is Performed by Brythreesixty also known as 3hunnatheArtist in Web3 community.\n\nTo those who mint this copy of the song, they are free to use it for free without any copyright claims.\n\n",
//     name: "PaperPlanes",
//     properties: {},
//     attributes: [
//       { trait_type: "genre", value: "hiphop" },
//       { trait_type: "license", value: "Licence for Indie Artists CC360." },
//       { trait_type: "creator", value: "brythreesixty-3hunnatheartist" },
//     ],
//   },
//   {
//     contractId: "SP1CSHTKVHMMQJ7PRQRFYW6SB4QAW6SR3XY2F81PA.the-guests",
//     contractName: "the-guests",
//     metadata: {
//       title: "The Guests #27",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/QmXbsvpfhCKFSVdE1m31p7rhWYDTA6P81f3NT3n5aVc6A7/images/219.png",
//       attributes: [
//         { trait_type: "background", value: "Lilac" },
//         { trait_type: "eyes", value: "Barstool" },
//         { trait_type: "fiend", value: "None" },
//         { trait_type: "skin", value: "Saint" },
//         { trait_type: "clothing", value: "JDill" },
//         { trait_type: "accessory", value: "ChainGang" },
//         { trait_type: "hat", value: "Mason" },
//       ],
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SP1CSHTKVHMMQJ7PRQRFYW6SB4QAW6SR3XY2F81PA.the-guests",
//         assetId: 27,
//       },
//     },
//     assetName: "the-guests",
//     assetId: 27,
//     owner: "Unknown",
//     blockHeight: 70749,
//     tx_id: "0xe2613f04e7c8596c391c6696f06698e8fffd525e5e099fdf2ebaeca7484f18a7",
//     seriesName: "the-guests",
//     seriesId: -99,
//     sender: "SPNWZ5V2TPWGQGVDR6T7B6RQ4XMGZ4PXTEE0VQ0S.marketplace-v4",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image:
//       "https://cloudflare-ipfs.com/ipfs/QmXbsvpfhCKFSVdE1m31p7rhWYDTA6P81f3NT3n5aVc6A7/images/219.png",
//     description: "",
//     name: "The Guests #27",
//     properties: {},
//     attributes: [
//       { trait_type: "background", value: "Lilac" },
//       { trait_type: "eyes", value: "Barstool" },
//       { trait_type: "fiend", value: "None" },
//       { trait_type: "skin", value: "Saint" },
//       { trait_type: "clothing", value: "JDill" },
//       { trait_type: "accessory", value: "ChainGang" },
//       { trait_type: "hat", value: "Mason" },
//     ],
//   },
//   {
//     contractId: "SP7AMEBV4Z6V4J9ENAFBH0T1DGQ67X6NF79GX3V3.U2",
//     contractName: "U2",
//     metadata: {
//       title: "Songs of Innocence DELUXE EDITION",
//       image: "/images/avatar-wow.png",
//       description:
//         "I had this beautiful idea, but (we) got carried away with ourselves. Artists are prone to that kind of thing. A drop of megalomania, a touch of generosity, a dash of self-promotion and deep fear that these songs, that we poured our life into over the last few years, mightn't be heard. There's a lot of noise out there. I guess we got a little noisy ourselves to get through it",
//       properties: {
//         collection: "Apple Itunes",
//         collection_root: {
//           type: "string",
//           value:
//             "ipfs://QmRBDKFs3e2naEKh8eMT27ir8fTKtwXcoqMdzLwk9nTqcp/friends.png",
//         },
//         artist_name: { type: "string", value: "U2" },
//         album_name: { type: "string", value: "Songs of Innocence" },
//         recorded: { type: "string", value: "2009:2014" },
//         studio: {
//           type: "string",
//           value:
//             "Electric Lady (New York City)Pull (New York City)The Church (London)Assault and Battery (London)Shangri-La (Los Angeles)The Woodshed (Los Angeles)Strathmore House (Killiney)",
//         },
//         release_date: { type: "string", value: "9 September 2014" },
//         length: { type: "string", value: "48 minutes:11 seconds " },
//         genre: { type: "string", value: "Rock" },
//         label: { type: "string", value: "Island, Interscope" },
//         Producers: {
//           type: "string",
//           value:
//             "Danger MousePaul Epworth (add.)Ryan Tedder (add.)Declan Gaffney (add.)Flood (add.)",
//         },
//         seed: "unknown",
//       },
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SP7AMEBV4Z6V4J9ENAFBH0T1DGQ67X6NF79GX3V3.U2",
//         assetId: 15,
//       },
//     },
//     assetName: "Songs-of-Innocence",
//     assetId: 15,
//     owner: "Unknown",
//     blockHeight: 64348,
//     tx_id: "0x1ed005a941b7680fc2b9f99a4003616c7a234a1fc3b2f1a14f7600a6722a2b03",
//     seriesName: "Songs-of-Innocence",
//     seriesId: -99,
//     sender: "",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image: "/images/avatar-wow.png",
//     description:
//       "I had this beautiful idea, but (we) got carried away with ourselves. Artists are prone to that kind of thing. A drop of megalomania, a touch of generosity, a dash of self-promotion and deep fear that these songs, that we poured our life into over the last few years, mightn't be heard. There's a lot of noise out there. I guess we got a little noisy ourselves to get through it",
//     name: "Songs of Innocence DELUXE EDITION",
//     properties: {
//       collection: "Apple Itunes",
//       collection_root: {
//         type: "string",
//         value:
//           "ipfs://QmRBDKFs3e2naEKh8eMT27ir8fTKtwXcoqMdzLwk9nTqcp/friends.png",
//       },
//       artist_name: { type: "string", value: "U2" },
//       album_name: { type: "string", value: "Songs of Innocence" },
//       recorded: { type: "string", value: "2009:2014" },
//       studio: {
//         type: "string",
//         value:
//           "Electric Lady (New York City)Pull (New York City)The Church (London)Assault and Battery (London)Shangri-La (Los Angeles)The Woodshed (Los Angeles)Strathmore House (Killiney)",
//       },
//       release_date: { type: "string", value: "9 September 2014" },
//       length: { type: "string", value: "48 minutes:11 seconds " },
//       genre: { type: "string", value: "Rock" },
//       label: { type: "string", value: "Island, Interscope" },
//       Producers: {
//         type: "string",
//         value:
//           "Danger MousePaul Epworth (add.)Ryan Tedder (add.)Declan Gaffney (add.)Flood (add.)",
//       },
//       seed: "unknown",
//     },
//     attributes: [],
//   },
//   {
//     contractId: "SP3252T1HMQHZTA9S22WZ2HZMKC4CVH965SHSERTH.merry-guestmas",
//     contractName: "merry-guestmas",
//     metadata: {
//       title: "Merry Guestmas #109",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/QmWpyMgAdbQ1Nz19G9moPHPRaD8RfTzQjTR8TPTLdmtnnL/images/109.png",
//       description:
//         "The Guests have been learning arts and crafts, it hasn't been going well, but they were determined to send these out to you, Thank you for an amazing 2022!",
//       attributes: [
//         { trait: "Card", value: "Cheers" },
//         { trait: "Message", value: "Glitter Bomb" },
//         { trait: "Member", value: "RIP GREENERY" },
//       ],
//       properties: { collection: "Merry Guestmas" },
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SP3252T1HMQHZTA9S22WZ2HZMKC4CVH965SHSERTH.merry-guestmas",
//         assetId: 109,
//       },
//     },
//     assetName: "merry-guestmas",
//     assetId: 109,
//     owner: "Unknown",
//     blockHeight: 88180,
//     tx_id: "0x3fa8b5e29046942fbb26de86599ce59b0187dba64e806be12e5c468227e34521",
//     seriesName: "merry-guestmas",
//     seriesId: -99,
//     sender: "",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image:
//       "https://cloudflare-ipfs.com/ipfs/QmWpyMgAdbQ1Nz19G9moPHPRaD8RfTzQjTR8TPTLdmtnnL/images/109.png",
//     description:
//       "The Guests have been learning arts and crafts, it hasn't been going well, but they were determined to send these out to you, Thank you for an amazing 2022!",
//     name: "Merry Guestmas #109",
//     properties: { collection: "Merry Guestmas" },
//     attributes: [
//       { trait: "Card", value: "Cheers" },
//       { trait: "Message", value: "Glitter Bomb" },
//       { trait: "Member", value: "RIP GREENERY" },
//     ],
//   },
//   {
//     contractId: "SP1RYXGJP8R1CCMTDHJJQSP93ECDKPP9A0YWYZTGZ.ryder-nft",
//     contractName: "ryder-nft",
//     metadata: {
//       title: "Ryder Digital Collectible #55",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/bafybeicnudjxjxmxduyekwq67j4xhdcq5baen6pt52vkxqbc73nlrqejqu",
//       description:
//         "Ryder is the world's first social wallet. One tap to save, swap, and recover assets. The first edition is limited to 5,003 pieces redeemable for the Ryder device. Each collectible comes with its own unique early backer benefits.",
//       attributes: [{ trait_type: "tier", value: "2" }],
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SP1RYXGJP8R1CCMTDHJJQSP93ECDKPP9A0YWYZTGZ.ryder-nft",
//         assetId: 55,
//       },
//     },
//     assetName: "ryder",
//     assetId: 55,
//     owner: "Unknown",
//     blockHeight: 86903,
//     tx_id: "0xf0dea408177de5f164f5c284b45761154b06966b3e6a13fe7c467ed758767508",
//     seriesName: "ryder",
//     seriesId: -99,
//     sender: "",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image:
//       "https://cloudflare-ipfs.com/ipfs/bafybeicnudjxjxmxduyekwq67j4xhdcq5baen6pt52vkxqbc73nlrqejqu",
//     description:
//       "Ryder is the world's first social wallet. One tap to save, swap, and recover assets. The first edition is limited to 5,003 pieces redeemable for the Ryder device. Each collectible comes with its own unique early backer benefits.",
//     name: "Ryder Digital Collectible #55",
//     properties: {},
//     attributes: [{ trait_type: "tier", value: "2" }],
//   },
//   {
//     contractId: "SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.okcoin-airdrop",
//     contractName: "okcoin-airdrop",
//     metadata: {
//       title: "Okcoin NFT Giveaway #1586",
//       image:
//         "https://cloudflare-ipfs.com/ipfs/QmU373zSCohus5RNN7jD3JxcwtbyaA4M7RphopzoxHknib",
//     },
//     userActions: {
//       transfer: {
//         functionName: "transfer",
//         contractId: "SP2BE8TZATXEVPGZ8HAFZYE5GKZ02X0YDKAN7ZTGW.okcoin-airdrop",
//         assetId: 1586,
//       },
//     },
//     assetName: "okcoin-airdrop",
//     assetId: 1586,
//     owner: "Unknown",
//     blockHeight: 63121,
//     tx_id: "0xf9bc6397c4c623eef93b0c19c1398cfed67d269e969a0ecf9fa8ffaa86f8df9f",
//     seriesName: "okcoin-airdrop",
//     seriesId: -99,
//     sender: "SP21728T40XTN7EV3PZXXZDHVT8GJH1JPKDEC8WGX",
//     recipient: "SP2RTE7F21N6GQ6BBZR7JGGRWAT0T5Q3Z9ZHB9KRS",
//     animation_url: "",
//     audio: "",
//     video: "",
//     image:
//       "https://cloudflare-ipfs.com/ipfs/QmU373zSCohus5RNN7jD3JxcwtbyaA4M7RphopzoxHknib",
//     description: "",
//     name: "Okcoin NFT Giveaway #1586",
//     properties: {},
//     attributes: [],
//   },
// ];
