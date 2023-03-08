import {SmartContractsApi} from '@stacks/blockchain-api-client';
import {cvToHex, cvToJSON, hexToCV, uintCV} from '@stacks/transactions';

const contractApi = new SmartContractsApi();

export const newBoomNfts = {
  getMetadata: async (contractId, assetId) => {
    const [contractAddress, contractName] = contractId.split('.');
    let resultEntry, seriesEntry;
    try {
      resultEntry = await contractApi.getContractDataMapEntry({
        contractAddress,
        contractName,
        mapName: 'meta',
        key: cvToHex(uintCV(assetId)),
        proof: 0,
      });
    } catch (e) {
      console.log('new boom nft error: ', e);
      return {
        title: 'Asset not found',
        image: '/images/avatar-wow.png',
        seriesId: -99,
        number: -1,
        uri: '',
        mimeType: '',
        hash: '',
      };
    }
    if (resultEntry.data === '0x09') {
      console.log('new boom nfts asset not found: ', assetId);
      return {
        title: 'Asset not found',
        image: '/images/avatar-wow.png',
        seriesId: -99,
        number: -1,
        uri: '',
        mimeType: '',
        hash: '',
      };
    } else {
      const resultData = hexToCV(resultEntry.data);
      const meta = cvToJSON(resultData.value);
      // console.log(`meta for asset #${assetId}: ${JSON.stringify(meta)}`);
      const seriesId = meta.value['series-id'].value;
      try {
        seriesEntry = await contractApi.getContractDataMapEntry({
          contractAddress,
          contractName,
          mapName: 'series-meta',
          key: cvToHex(uintCV(seriesId)),
          proof: 0,
        });
      } catch (err) {
        console.log('new boom nfts series error: ', err);
        return {
          title: 'Asset not found',
          image: '/images/avatar-wow.png',
          seriesId: -99,
          number: -1,
          uri: '',
          mimeType: '',
          hash: '',
        };
      }
      let creator, seriesName, count;
      if (seriesEntry.data === '0x09') {
        // console.log('new boom nfts seriesmeta not found: ', seriesId);
        creator = 'Not found';
        seriesName = 'Not found';
        count = -1;
      } else {
        const seriesData = hexToCV(seriesEntry.data);
        const seriesMeta = cvToJSON(seriesData.value);
        // console.log(
        //   `series meta for #${assetId}: ${JSON.stringify(seriesMeta)}`,
        // );

        return {
          title: `${meta.value['name'].value}`,
          image: meta.value.uri.value,
          seriesId,
          number: `${meta.value.number.value}`,
          image: `${meta.value.uri.value}`,
          mimeType: `${meta.value['mime-type'].value}`,
          hash: `${meta.value['hash'].value}`,
          creator: seriesMeta.value['creator'].value || '',
          seriesName: seriesMeta.value['series-name'].value,
          count: seriesMeta.value['count'].value,
        };
      }
    }
  },
};
