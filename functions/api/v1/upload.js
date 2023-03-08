import {NFTStorage, File, Blob} from 'nft.storage';

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function onRequest(context) {
  const {request, env} = context;
  // const {CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, NFT_STORAGE_TOKEN} = env;
  const {NFT_STORAGE_TOKEN} = env;

  const nftStorage = new NFTStorage({token: NFT_STORAGE_TOKEN});

  try {
    const input = await request.formData();

    const nft = {
      name: input.get('name'),
      description: input.get('description'),
      image: input.get('file'),
    };

    const metadata = await nftStorage.store({
      name: nft.name,
      description: nft.description,
      image: new File([nft.image], nft.name, {type: nft.image.type}),
    });

    return new Response(JSON.stringify(metadata), {
      status: 200,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response('Error parsing Form content', {status: 400});
  }

}
