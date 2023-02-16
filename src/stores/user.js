import { defineStore } from "pinia";

// export interface Profile {
//   '@type': 'Person';
//   name?: string,
//   givenName?: string;
//   familyName?: string;
//   description?: string;
//   image?: {'@type': 'ImageObject';
//     name?: string;
//     contentUrl?: string;
//     [k: string]: unknown;
//   }[];
//   website?: {
//     '@type'?: string;
//     url?: string;
//     [k: string]: unknown;
//   }[];
//   account?: {
//     '@type'?: string;
//     service?: string;
//     identifier?: string;
//     proofType?: string;
//     proofUrl?: string;
//     proofMessage?: string;
//     proofSignature?: string;
//     [k: string]: unknown;
//   }[];
//   worksFor?: {
//     '@type'?: string;
//     '@id'?: string;
//     [k: string]: unknown;
//   }[];
//   knows?: {
//     '@type'?: string;
//     '@id'?: string;
//     [k: string]: unknown;
//   }[];
//   address?: {
//     '@type'?: string;
//     streetAddress?: string;
//     addressLocality?: string;
//     postalCode?: string;
//     addressCountry?: string;
//     [k: string]: unknown;
//   };
//   birthDate?: string;
//   taxID?: string;
//   [k: string]: unknown;
// }

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    profile: null,
    stxAddress: null,
    bitcoinAddress: null,
    lightning: null,
    nostrAddress: null,
    avatar: null,
    name: null,
    email: null,
    username: null,
  }),
  actions: {
    setUser(usr) {
      this.user = usr;
      this.profile = usr.profile || null;
    },
    // async login() {

    //   const data = await m.user.getMetadata();
    //   this.user = userData;
    //   localStorage.setItem("user", JSON.stringify(userData));
    // },
  },
});
