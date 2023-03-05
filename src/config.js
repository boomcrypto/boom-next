// chain/network settings
const Mainnet_CONFIG = {
  network: "mainnet",
  BOOM_SERIES_MAX_HOW_MANY: 10,
  BOOM_NFTS_CONTRACT_NAME: "boom-nfts",
  BOOM_NFTS_CONTRACT_ADDRESS: "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ",
  API_BASE_PATH: "https://stacks-node-api.mainnet.stacks.co",
  BADGES_CONTRACT_ID: "SP1K1A1PMGW2ZJCNF46NWZWHG8TS1D23EGH1KNK60.badges",
  BNS_CONTRACT_ID: "SP000000000000000000002Q6VF78.bns",
  POX_CONTRACT_ADDRESS: "SP000000000000000000002Q6VF78",
  POX_CONTRACT_NAME: "pox",
  boomNFTContracts: [
    "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts",
    "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boom-nfts-50",
    "SP1K1A1PMGW2ZJCNF46NWZWHG8TS1D23EGH1KNK60.boom-nfts",
  ],
  badgeContract: "SP1K1A1PMGW2ZJCNF46NWZWHG8TS1D23EGH1KNK60.badges::badge",
  boomboxAdminContract: {
    address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
    name: "boombox-admin-v3",
    contractId: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boombox-admin-v3",
  },
  boomboxTraitContract: {
    sip: 16,
    address: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE",
    name: "boomboxes-cycle-50",
    contractId: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE.boomboxes-cycle-50",
    assetName: "b-50",
    seriesName: "Boombox [19th Edition] - Not So Cold Winter",
    collection: "Boombox [19th Edition] - Not So Cold Winter",
    title: "Boombox [19th Edition] - Not So Cold Winter",
    image:
      "https://nftstorage.link/ipfs/bafybeicgqfrvl5mnfnkbller5um3sqt42id6guqb6obbgsb6vac7k6pxce",
    burnBlockExpiry: 770750, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
    description:
      "The time of creation is crypto winter. Boombox, Stacks and Bitcoin are doing little fun.",
    stacksBlockPayout: 95277, // add 4000 blocks to the previous block height
    properties: {
      creator: "SP21CYC2GKWTVK3FHFF4VVJNKVNQDMRY5GQS27XQB",
      author: "morguf",
      music: "Fun Life by FASSounds",
      website: "https://owl.link/morguf.btc",
      created: "1672033332",
    },
    animation_url:
      "https://nftstorage.link/ipfs/bafybeicqxvfiwjozmt6cykw4hxm3asygxmahpucvycegldj2ecjkd55bom",
    seriesId: "boomboxes-cycle-50",
    adminId: 17,
    pool: "FriedgerPool",
    poolUrl: "https://pool.friedger.de",
    rewardCycleStart: "50",
    numberOfCycles: "1",
    poxRewardAddress: "33WSGLeVoEpuZDjB54HKZ1y5YsERELoVNq",
  },
  boomboxContracts: [
    {
      address: "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT",
      name: "boomboxes-cycle-6",
      contractId: "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT.boomboxes-cycle-6",
      assetName: "boomboxes-cycle-6",
      seriesName: "INVALID CONTRACT",
      title: `INVALID CONTRACT`,
    },
    {
      address: "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ",
      name: "boomboxes-cycle-12",
      contractId: "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boomboxes-cycle-12",
      assetName: "b-12",
      seriesName: "Boombox [1st Edition]",
      title: `STX Boombox [1st Edition]`,
      image:
        "https://cloudflare-ipfs.com/ipfs/bafkreicpyq7jvun4wb6e3zkt5lib5w5npihumljyfzjopzlwfans6lvarq",
      burnBlockExpiry: 690950,
      description:
        "1st Edition Boombox.  Utilizing the community-oriented Friedger Pool for Stacking rewards. Stacks reward cycle 12.",
      stacksBlockPayout: 24000,
      properties: {},
      attributes: [],
      seriesId: "b-12",
    },
    {
      address: "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ",
      name: "boomboxes-cycle-14",
      contractId: "SP497E7RX3233ATBS2AB9G4WTHB63X5PBSP5VGAQ.boomboxes-cycle-14",
      assetName: "b-14",
      seriesName: "Boombox [2nd Edition]",
      title: "Boombox [2nd Edition]",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeiggzpkjeiekc4cafp3bjtijirafhot5upg5rbsztfs7kdt3uo7y7u",
      burnBlockExpiry: 695150,
      description:
        "2nd Edition Boombox.  Utilizing the community-oriented Friedger Pool for Stacking rewards. Stacks reward cycle 14.",
      stacksBlockPayout: 28000,
      properties: {},
      attributes: [],
      seriesId: "b-14",
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-16",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-16",
      assetName: "b-16",
      seriesName: "Boombox [3rd Edition] - CityCoins in Miami",
      title: `Boombox [3rd Edition] - CityCoins in Miami`,
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeicwed3mcgfp5vzjcsbuov7zb52g2fxubxh3lx7qobrxyae7nmpmq4/citycoin-miami-boom-3b.jpg",
      burnBlockExpiry: 699350,
      description:
        "For our 3rd Boombox, we wanted to celebrate one of the most exciting projects in the Stacks ecosystem: CityCoins' launch of MiamiCoin! CityCoins gives communities the power to improve their cities, while providing crypto rewards to individual contributors and city governments alike. Miami is the first city they launched in, where 30% of MiamiCoin mining rewards are sent directly to a wallet reserved for the city.\n\nNow what does Boom have to do with this? Why launch a Boombox that depicts Boom and CityCoins chilling in Miami together? First of all, we love the Stacks community and think this is a great innovation for the ecosystem…why wouldn't we want to celebrate? Moreover, we believe that CityCoins' vision of utilizing stacking as a mechanism to reward cities with bespoke coins, aligns closely with our vision to reward creators with bespoke Boomboxes.\n\nSo there you have it! Hope you enjoy the 3rd Edition as much as we do.",
      stacksBlockPayout: 32000,
      properties: {
        date_created: {
          display_type: "date",
          trait_type: "date",
          value: 1630105670613,
        },
        external_url: {
          display_type: "url",
          trait_type: "string",
          value:
            "https://app.sigle.io/boom.id.blockstack/JFJsrZRPQ9dXZI6UwYD-q",
        },
      },
      attributes: [],
      seriesId: "b-16",
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-17",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-17",
      assetName: "b-17",
      seriesName: "Boombox [Foundation Edition]",
      title: "Boombox [Foundation Edition]",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeig64f7ns6dppx26lcu6cruk2siq67edddqvl2evjvbtlejtg5zxv4",
      burnBlockExpiry: 699350,
      description:
        "This is a limited edition Boombox sponsored by the Stacks Foundation",
      stacksBlockPayout: 32000,
      properties: {
        series_size: {
          display_type: "number",
          trait_type: "string",
          value: 3,
        },
        external_url: {
          display_type: "url",
          trait_type: "string",
          value: "https://stacks.org/",
        },
        twitter_url: {
          display_type: "url",
          trait_type: "string",
          value: "https://twitter.com/StacksOrg",
        },
        telegram_url: {
          display_type: "url",
          trait_type: "string",
          value: "https://t.me/BlockstackChat",
        },
      },
      attributes: [],
      seriesId: "b-17",
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-18",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-18",
      assetName: "b-18",
      seriesName: "Boombox [4th Edition]",
      title: "Boombox [4th Edition]",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeiggfn5e4k3lu23ibs3mgpfonsscr4nadwwkyflqk7xo5kepmfnwhu",
      burnBlockExpiry: 703550,
      description:
        "The first ever Boombox to exist IRL, this art was created by 3D printing a model and photographing it under some very Boomerific lighting. 💥",
      stacksBlockPayout: 35000,
      properties: {},
      attributes: [],
      seriesId: "b-18",
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-20-v1",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-20-v1",
      assetName: "b-20",
      seriesName: "Boombox [5th Edition] - Building Blocks by M.C. Turner",
      title: "Boombox [5th Edition] - Building Blocks by M.C. Turner",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeigdvavx4g5eiehcufsbanii2ss53tp4n5utogsbqgyq2sqzitmp4i",
      burnBlockExpiry: 707750,
      description:
        'This is the first Boombox designed by a member of the Stacks community. The artist, M.C. Turner, had this to say about the piece: "The world of developers can be tight knit but also distant at times. They stand on each other\'s shoulders in order to form function and I wanted to portray how they exist in the shadows and see the world in complexity so others can see it easily."',
      stacksBlockPayout: 39000,
      properties: {},
      attributes: [],
      seriesId: "b-20",
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-20-v2",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-20-v2",
      assetName: "b-20",
      seriesName: "Boombox [5th Edition] - Building Blocks by M.C. Turner",
      title: "Boombox [5th Edition] - Building Blocks by M.C. Turner",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeigdvavx4g5eiehcufsbanii2ss53tp4n5utogsbqgyq2sqzitmp4i",
      burnBlockExpiry: 707925,
      description:
        'This is the first Boombox designed by a member of the Stacks community. The artist, M.C. Turner, had this to say about the piece: "The world of developers can be tight knit but also distant at times. They stand on each other\'s shoulders in order to form function and I wanted to portray how they exist in the shadows and see the world in complexity so others can see it easily."',
      stacksBlockPayout: 39000,
      properties: {},
      attributes: [],
      seriesId: "b-20",
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-22",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-22",
      assetName: "b-22",
      seriesName: "Boombox [6th Edition] - Bitcoin Day/Night Clock",
      title: "Boombox [6th Edition] - Bitcoin Day/Night Clock",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeiai3e3pz7qad2qzeqktgk3mgy2d44z6i4ua2cqbnndsunczartsya",
      burnBlockExpiry: 711950,
      description:
        "For Boombox 6, we wanted to nod to the universal clock...Bitcoin. On average, 144 blocks are mined per day. Boombox 6 indicates Bitcoin Day or Bitcoin Night by taking the modulus of the current block height and 144. (i.e. block_height % 144) In effect, that means this Boombox will change aesthetically about twice a day.",
      stacksBlockPayout: 42235,
      properties: {},
      attributes: [],
      seriesId: "b-22",
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "charity-core-surf",
      contractId: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.charity-core-surf",
      assetName: "bb-24",
      seriesName: "The Surfer Kids",
      title: "The Surfer Kids",
      image:
        "https://cloudflare-ipfs.com/ipfs/QmZrKbZu6cDMw5xTAwKgA7huF8SYwJ2rVET5Y7rG1ZugSn/images/{id}.png",
      burnBlockExpiry: 716150,
      description:
        "The Surfer Kids NPO founded in 2010, focuses on empowering marginalized and impoverished youth through surfing. The Non-profit runs a surf camp in Mossel Bay, South Africa where they teach commitment and dedication through surfing five days a week. For more information: https://www.thesurferkids.com/core-surfing-program",
      stacksBlockPayout: 46047,
      properties: {},
      attributes: [],
      seriesId: "charity-core-surf",
      adminId: 2,
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-26",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-26",
      assetName: "b-26",
      seriesName:
        "Boombox [7th Edition] - Lightning Jewel Orchid by Veronica Diament",
      title:
        "Boombox [7th Edition] - Lightning Jewel Orchid by Veronica Diament",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeif2xerv7a6pevhw6hjzrwn2rxrctudyyyewps2ldin5h22k5qlzuy",
      burnBlockExpiry: 720450,
      description:
        'This edition was hand-painted by fine artist Veronica Diament. A "Lightning Jewel Orchid" emerges from her interpretation of a Boombox — styled in the vein of her Synthesizing Flora series. Learn more about Veronica\'s work at veronicadiament.com.',

      stacksBlockPayout: 48952,
      properties: {
        collection:
          "Boombox [7th Edition] - Lightning Jewel Orchid by Veronica Diament",
        total_supply: "",
        creators: [
          {
            address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
            share: 100,
          },
        ],
        created: 1634362906010,
        categories: [0],
        royalty_amount: 2,
      },
      attributes: [
        {
          trait_type: "artist",
          display_type: "string",
          value: "Veronica Diament",
        },
      ],
      seriesId: "boomboxes-cycle-26",
      adminId: 4,
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-28-moonbox",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-28-moonbox",
      assetName: "b-28",
      seriesName: "Boombox [8th Edition] - Moonbox",
      title: "Boombox [8th Edition] - Moonbox",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeiaya2humpnp4g3jsxbt7xfd3o6x2mq4ixpcygbrx5ykbsdkibagsq",
      burnBlockExpiry: 724650,
      description:
        'This Boombox was hand-drawn in the style of "Moons" — an upcoming randomly generated NFT collection. Only holders of this edition (aka the "Moonbox") will have access to mint Moons when they drop. Learn more at the moons.buzz website.',
      stacksBlockPayout: 52440,
      properties: {
        collection: "Boombox [8th Edition] - Moonbox",
        creator: "SP8F65F85PMRZK043DTME3E1TQ4EM5R3VS8TSJC7",
        created: 1644775581,
        royalty_amount: 2,
        royalty_address: "SP8F65F85PMRZK043DTME3E1TQ4EM5R3VS8TSJC7",
      },
      seriesId: "boomboxes-cycle-28-moonbox",
      adminId: 6,
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-30",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-30",
      assetName: "b-30",
      seriesName: "Boombox [9th Edition] - Mushroom by Flower",
      title: "Boombox [9th Edition] - Mushroom by Flower",
      image:
        "https://cloudflare-ipfs.com/ipfs/bafybeidm35vzhppmxzjfumv5aaj2baln25l6osijdqm5grbfgafiiqjftm",
      burnBlockExpiry: 728750,
      description:
        "A mushroom transformed into a jellyfish. This is my (symbolic) way of showing the conflicts between Ukraine and Russia.",
      stacksBlockPayout: 55700,
      properties: {
        collection: "Boombox [9th Edition] - Mushroom by Flower",
        creator: "SP1PGB1T5KRNWZGDS1JEV7775HJMYBSEM2Z333Y8Y",
        created: 1647282498,
        royalty_amount: 2,
        royalty_address: "SP1PGB1T5KRNWZGDS1JEV7775HJMYBSEM2Z333Y8Y",
      },
      seriesId: "boomboxes-cycle-30",
      adminId: 7,
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-32",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-32",
      assetName: "b-32",
      seriesName: "Boombox [10th Edition]",
      title: "Boombox [10th Edition]",
      image:
        "https://bafybeianpd32x3sfh3ebpj33vca47uohdw53qtqlhscwmorgihvdaqd75a.ipfs.nftstorage.link/ipfs/bafybeianpd32x3sfh3ebpj33vca47uohdw53qtqlhscwmorgihvdaqd75a/b-10/a8dfed34-7db1-454f-8eff-1a54ce67a1e0.mp4.png",
      burnBlockExpiry: 733050,
      description:
        "10th edition Boombox.  The 10th Edition is the first video Boombox.",
      stacksBlockPayout: 59700,
      properties: {
        collection: "Boombox [10th Edition]",
        creator: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
        created: 1649887232,
        royalty_amount: 2,
        royalty_address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      },
      animation_url:
        "https://bafybeianpd32x3sfh3ebpj33vca47uohdw53qtqlhscwmorgihvdaqd75a.ipfs.nftstorage.link/ipfs/bafybeianpd32x3sfh3ebpj33vca47uohdw53qtqlhscwmorgihvdaqd75a/b-10/a8dfed34-7db1-454f-8eff-1a54ce67a1e0.mp4",
      seriesId: "boomboxes-cycle-32",
      adminId: 8,
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-34",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-34",
      assetName: "b-34",
      seriesName: "Boombox [11th Edition] - Bitcoin Pizza NFT collection 2022",
      title: "Boombox [11th Edition] - Bitcoin Pizza NFT collection 2022",
      image:
        "https://gateway.pinata.cloud/ipfs/QmNNaFzJ3HSBui4MjW4xWw21Mr82qsL2Yd5NBzNZLufj16/{id}.png",
      burnBlockExpiry: 737127, // 100 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description: "11th Edition Boombox.  Bitcoin Pizza NFT collection 2022",
      stacksBlockPayout: 63277, // add 4000 blocks to the previous block height
      properties: {
        collection:
          "Boombox [11th Edition] - Bitcoin Pizza NFT collection 2022",
        creator: "SP3DADFZ5M352BV2XZY1RSPV307QH0JPKKEQMFAP3",
        created: 1651765570,
        royalty_amount: 2,
        royalty_address: "SP3DADFZ5M352BV2XZY1RSPV307QH0JPKKEQMFAP3",
      },
      seriesId: "boomboxes-cycle-34",
      adminId: 9,
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-36",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-36",
      assetName: "b-36",
      seriesName: "Boombox [12th Edition] - Bloombox by Grace Hye",
      title: "Boombox [12th Edition] - Bloombox by Grace Hye",
      image:
        "https://bafybeiboslbmvvolvsv35gfqwxbg57gqqcvhjc72sundtn27kavvdwx5eq.ipfs.nftstorage.link/",
      burnBlockExpiry: 741350, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description:
        "This BloomBox NFT is a Grace Hye's collaboration with Boom.",
      stacksBlockPayout: 67277, // add 4000 blocks to the previous block height
      properties: {
        collection: "Boombox [12th Edition] - Bloombox by Grace Hye",
        creator: "SP35K3WCA9GCJV2XC7X021MR2D9D2PKF855CVCKB0",
        created: 1653973200,
        royalty_pct: 2.5,
        royalty_address: "SP35K3WCA9GCJV2XC7X021MR2D9D2PKF855CVCKB0",
        license: "CC BY-SA 4.0",
        license_uri: "https://creativecommons.org/licenses/by-sa/4.0/",
      },
      seriesId: "boomboxes-cycle-36",
      adminId: 10,
    },
    {
      address: "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW",
      name: "boomboxes-cycle-38",
      contractId:
        "SP1QK1AZ24R132C0D84EEQ8Y2JDHARDR58R72E1ZW.boomboxes-cycle-38",
      assetName: "b-38",
      seriesName: "Boombox [13th Edition]",
      title: "Boombox [13th Edition]",
      image:
        "https://bafybeig66vzknrhnfi76qpvlryvi6tyneb3rm5kmp3sotcptjtbkvqx4ne.ipfs.nftstorage.link/",
      burnBlockExpiry: 745550, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description: "Boombox 13 is inspired by the psychadelic age.",
      stacksBlockPayout: 71277, // add 4000 blocks to the previous block height
      properties: {
        collection: "Boombox [13th Edition]",
        creator: "SP3XQHHBWE3XC1KWDZVSKVKMSB99GF9X1WCQTJYS0",
        created: 1653973200,
        royalty_pct: 2.5,
        royalty_address: "SP3XQHHBWE3XC1KWDZVSKVKMSB99GF9X1WCQTJYS0",
      },
      seriesId: "boomboxes-cycle-38",
      adminId: 11,
    },
    {
      address: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE",
      name: "boomboxes-cycle-40",
      contractId: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE.boomboxes-cycle-40",
      assetName: "b-40",
      seriesName: "Boombox [14th Edition] - STX of Toys",
      title: "Boombox [14th Edition] - STX of Toys",
      image:
        "https://bafybeia33qd7f2h3rddnqs37lcxs77qqtsqou77td6zztve2t6yvm42gre.ipfs.nftstorage.link/",
      burnBlockExpiry: 749640, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description:
        "This Boombox was designed by TheArtist behind The Guests. It portrays a Guest in the box, and hopes to infuse some playfulness back in to the Crypto and NFT community.",
      stacksBlockPayout: 75277, // add 4000 blocks to the previous block height
      properties: {
        collection: "Boombox [14th Edition] - STX of Toys",
        creator: "SP3SC5PSKQM9ABTYPNYDV1J7SBGHA08VRW1DKTJK6",
        created: 1659790672,
        royalty_pct: 2.5,
        royalty_address: "SP3SC5PSKQM9ABTYPNYDV1J7SBGHA08VRW1DKTJK6",
      },
      seriesId: "boomboxes-cycle-40",
      adminId: 12,
    },
    {
      address: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE",
      name: "boomboxes-cycle-42",
      contractId: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE.boomboxes-cycle-42",
      assetName: "b-42",
      seriesName: "Boombox [15th Edition] - Boombox",
      title: "Boombox [15th Edition] - Boombox",
      image:
        "https://bafybeigc43lfz6gcyix7qfegsk45mtfxszigqep2qaxajcrq7ssmr2qek4.ipfs.nftstorage.link/",
      burnBlockExpiry: 753950, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description:
        "This is collaboration NFT between Boom & 3hunnatheartist. Artwork inspired by Boombox 5 from @MarcOfCane.",
      stacksBlockPayout: 79277, // add 4000 blocks to the previous block height
      properties: {
        collection: "Boombox [15th Edition] - Boombox",
        creator: "SP3AJC728JY0Y43E8RT6K4VDWPT265RDMXJ8M0VH0",
        created: "1662018944",
        royalty_amount: 25,
        royalty_address: "SP3AJC728JY0Y43E8RT6K4VDWPT265RDMXJ8M0VH0",
      },
      animation_url:
        "https://bafybeiabjoxd6xibj7ldzkyl3jgj4mf7lornyzov7rbpl4uzgntqg4cria.ipfs.nftstorage.link/",
      file_type: "video/mp4",
      seriesId: "boomboxes-cycle-42",
      adminId: 13,
    },
    {
      address: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE",
      name: "boomboxes-cycle-44",
      contractId: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE.boomboxes-cycle-44",
      assetName: "b-44",
      seriesName: "Boombox [16th Edition] - Boombox Brain",
      title: "Boombox [16th Edition] - Boombox Brain",
      image:
        "https://nftstorage.link/ipfs/bafybeiajaa427r3dbbaomgdr23fzrjg6jxdlonr6b34tq22amrhktwvhke",
      burnBlockExpiry: 758150, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description: "by Hooch Haus artist Boozy.btc",
      stacksBlockPayout: 83277, // add 4000 blocks to the previous block height
      properties: {
        collection: "Boombox [16th Edition] - Boombox Brain",
        creator: "SP3M05ETW09E98NNFMFHT1WND3ZRX9DV31TFC6DFW",
        created: "1664756016",
        royalty_amount: 25,
        royalty_address: "SP3M05ETW09E98NNFMFHT1WND3ZRX9DV31TFC6DFW",
        twitter: "https://twitter.com/boozybtc",
      },
      seriesId: "boomboxes-cycle-44",
      adminId: 14,
    },
    {
      address: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE",
      name: "boomboxes-cycle-46",
      contractId: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE.boomboxes-cycle-46",
      assetName: "b-46",
      seriesName: "Boombox [17th Edition]",
      collection: "Boombox [17th Edition]",
      title: "Boombox [17th Edition]",
      image:
        "https://nftstorage.link/ipfs/bafybeig3zwuo6t6c5exxeyvextus6qmujmzhblro6awm2pram4usk2gpjm",
      burnBlockExpiry: 762350, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description: "Boombox 17",
      stacksBlockPayout: 87277, // add 4000 blocks to the previous block height
      properties: {
        collection: "Boombox [17th Edition]",
        creator: "SP3XQHHBWE3XC1KWDZVSKVKMSB99GF9X1WCQTJYS0",
        created: "1667535505",
        royalty_amount: 25,
        royalty_address: "SP3XQHHBWE3XC1KWDZVSKVKMSB99GF9X1WCQTJYS0",
      },
      seriesId: "boomboxes-cycle-46",
      adminId: 15,
      pool: "FriedgerPool",
      poolUrl: "https://pool.friedger.de",
      rewardCycleStart: "46",
      numberOfCycles: "1",
      poxRewardAddress: "33WSGLeVoEpuZDjB54HKZ1y5YsERELoVNq",
    },
    {
      sip: 16,
      address: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE",
      name: "boomboxes-cycle-48",
      contractId: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE.boomboxes-cycle-48",
      assetName: "b-48",
      seriesName: "Boombox [18th Edition] - Fresh Orange",
      collection: "Boombox [18th Edition] - Fresh Orange",
      title: "Boombox [18th Edition] - Fresh Orange",
      image:
        "https://nftstorage.link/ipfs/bafybeih4s7wyzxbteqkdgl2ouglaamrne3xbtr6s6jykliwwvfbjlhkjmi",
      burnBlockExpiry: 766350, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description:
        "Fresh Orange is an isometric illustration by Nickole. Orange juice can be incredibly refreshing on a hot sunny day. This tiny human noticed that this box still had some juice in it, so he didn't miss the opportunity to spend some refreshing time here.",
      stacksBlockPayout: 91277, // add 4000 blocks to the previous block height
      properties: {
        creator: "SP26GZCVY8FYHNZ6C73W68TCFJHS8F8C9E772XX7X",
        created: "1669664343",
        royalty_amount: 15000,
        royalty_address: "SP26GZCVY8FYHNZ6C73W68TCFJHS8F8C9E772XX7X",
        Discord: "https://discord.gg/Y3wKntCEC5",
        Twitter: "https://twitter.com/NickoleNFT",
        Instagram: "https://www.instagram.com/nickole.btc/",
        Gamma: "https://gamma.io/nickole.btc",
      },
      seriesId: "boomboxes-cycle-48",
      adminId: 16,
      pool: "FriedgerPool",
      poolUrl: "https://pool.friedger.de",
      rewardCycleStart: "48",
      numberOfCycles: "1",
      poxRewardAddress: "33WSGLeVoEpuZDjB54HKZ1y5YsERELoVNq",
    },
    {
      sip: 16,
      address: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE",
      name: "boomboxes-cycle-50",
      contractId: "SPMS4E9RQ4GCGG68R6D15PKV01TYNCBPYZG1ZMFE.boomboxes-cycle-50",
      assetName: "b-50",
      seriesName: "Boombox [19th Edition] - Not So Cold Winter",
      collection: "Boombox [19th Edition] - Not So Cold Winter",
      title: "Boombox [19th Edition] - Not So Cold Winter",
      image:
        "https://nftstorage.link/ipfs/bafybeicgqfrvl5mnfnkbller5um3sqt42id6guqb6obbgsb6vac7k6pxce",
      burnBlockExpiry: 770750, // 200 blocks before `prepare_phase_start_block_height` from the v2/pox endpoint
      description:
        "The time of creation is crypto winter. Boombox, Stacks and Bitcoin are doing little fun.",
      stacksBlockPayout: 95277, // add 4000 blocks to the previous block height
      properties: {
        creator: "SP21CYC2GKWTVK3FHFF4VVJNKVNQDMRY5GQS27XQB",
        author: "morguf",
        music: "Fun Life by FASSounds",
        website: "https://owl.link/morguf.btc",
        created: "1672033332",
      },
      animation_url:
        "https://nftstorage.link/ipfs/bafybeicqxvfiwjozmt6cykw4hxm3asygxmahpucvycegldj2ecjkd55bom",
      seriesId: "boomboxes-cycle-50",
      adminId: 17,
      pool: "FriedgerPool",
      poolUrl: "https://pool.friedger.de",
      rewardCycleStart: "50",
      numberOfCycles: "1",
      poxRewardAddress: "33WSGLeVoEpuZDjB54HKZ1y5YsERELoVNq",
    },
  ],
  CIDContracts: ["SP27SD3H5TTZXPBFXHN1ZNMFJ3HNE2070QWHH3BXX.cube"],
  stacksArtContracts: [
    "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v0",
    "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v1",
    "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v2",
    "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-punks-v3",
    "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.stacks-pops",
    "SPJW1XE278YMCEYMXB8ZFGJMH8ZVAAEDP2S2PJYG.phases-of-satoshi",
  ],
};

const TESTNET_CONFIG = {
  network: "testnet",
  BOOM_SERIES_MAX_HOW_MANY: 50,
  BOOM_NFTS_CONTRACT_NAME: "boom-nfts",
  BOOM_NFTS_CONTRACT_ADDRESS: "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW",
  API_BASE_PATH: "https://stacks-node-api.testnet.stacks.co",
  BADGES_CONTRACT_ID: "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT.badges",
  POX_CONTRACT_ADDRESS: "ST000000000000000000002AMW42H",
  POX_CONTRACT_NAME: "pox",
  boomboxAdminContract: {
    address: "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW",
    name: "boombox-admin",
    contractId: "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW.boombox-admin",
  },
  boomNFTContracts: [
    "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW.boom-nfts",
    "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT.boom-nfts-v5",
    "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT.boom-nfts-v6",
    "ST3ZKEEAH65V6P0PEY91QHFKSQEP8RJXDPM1SBBVB.boom-nft-x",
  ],
  badgeContract: "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT.badges::badge",
  CIDContracts: ["SP27SD3H5TTZXPBFXHN1ZNMFJ3HNE2070QWHH3BXX.cube"],
  boomboxContracts: [
    {
      address: "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT",
      name: "boomboxes-v1",
      contractId: "ST314JC8J24YWNVAEJJHQXS5Q4S9DX1FW5Z9DK9NT.boomboxes-v1",
      assetName: "boom",
      seriesName: "Boombox Test [0th Edition]",
      title: `STX Boombox Test [0st Edition]`,
    },
    {
      address: "ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW",
      name: "premier-apricot-hedgehog",
      contractId:
        "ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.premier-apricot-hedgehog",
      assetName: "boom",
      seriesName: "Boombox Test [1st Edition]",
      title: `STX Boombox Test [1st Edition]`,
      image:
        "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/24762181-0ba6-4c5b-9065-1c874fb334d2.svg",
      burnBlockExpiry: 2004532,
      stacksBlockPayout: 15072,
    },
    {
      address: "ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW",
      name: "premier-apricot-hedgehog",
      contractId:
        "ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.premier-apricot-hedgehog",
      assetName: "boom",
      seriesName: "Boombox Test [1st Edition]",
      title: `STX Boombox Test [1st Edition]`,
      image:
        "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/24762181-0ba6-4c5b-9065-1c874fb334d2.svg",
      burnBlockExpiry: 2004532,
      stacksBlockPayout: 15072,
    },
    {
      address: "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW",
      name: "communist-amber-sailfish",
      contractId:
        "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW.communist-amber-sailfish",
      assetName: "boom",
      seriesName: "Boombox Test [3rd Edition]",
      title: `STX Boombox Test [3rd Edition]`,
      image:
        "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/24762181-0ba6-4c5b-9065-1c874fb334d2.svg",
      burnBlockExpiry: 2093966,
      stacksBlockPayout: 11072,
    },
    {
      address: "ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW",
      name: "premier-apricot-hedgehog",
      contractId:
        "ST2PABAF9FTAJYNFZH93XENAJ8FVY99RRM4DF2YCW.premier-apricot-hedgehog",
      assetName: "boom",
      seriesName: "Boombox Test [1st Edition]",
      title: `STX Boombox Test [1st Edition]`,
      image:
        "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/24762181-0ba6-4c5b-9065-1c874fb334d2.svg",
      burnBlockExpiry: 2004532,
      stacksBlockPayout: 15072,
    },
    {
      address: "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW",
      name: "communist-amber-sailfish",
      contractId:
        "ST1QK1AZ24R132C0D84EEQ8Y2JDHARDR58SMAYMMW.communist-amber-sailfish",
      assetName: "boom",
      seriesName: "Boombox Test [3rd Edition]",
      title: `STX Boombox Test [3rd Edition]`,
      image:
        "https://boom-nft-41369b66-36da-4442-be60-fff6d755b065.s3.amazonaws.com/24762181-0ba6-4c5b-9065-1c874fb334d2.svg",
      burnBlockExpiry: 2093966,
      stacksBlockPayout: 11072,
    },
  ],
  stacksArtContracts: [],
};

const NETWORK_CONFIG =
  process.env.TESTNET === "TRUE" ? TESTNET_CONFIG : Mainnet_CONFIG;

export const BOOM_CONFIG = {
  ...NETWORK_CONFIG,
  MIN_USTX_FOR_BOOMBOX: 40_001_000,
  EXPLORER_URL: "https://explorer.stacks.co/txid",
  boomboxContractIndex: 21, // indexing starts at 0, so this is the 8th contract in the array
};
