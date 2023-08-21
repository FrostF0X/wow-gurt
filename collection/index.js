import {promises} from "fs";
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import downloader from "image-downloader";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const collection = process.argv[2];

if (!collection) {
    console.log("Collection name should be present.")
    process.exit(1);
}

async function fetchNftsPage(collection, next) {
    const pageUrl = `https://api.opensea.io/v2/collection/${collection}/nfts?limit=50&next=${next}`;
    console.log(`Fetching ${pageUrl}`);
    let response = await fetch(pageUrl, {
        headers: {'X-API-KEY': '9da430327c714dca924efe8e973068f5'},
    });
    if (response.status === 429) {
        console.log(`Response throttled, wait 5 second`);
        await new Promise((res) => setTimeout(() => res(), 5000));
        return fetchNftsPage(collection, next);
    }
    if (response.status === 200) {
        return await response.json();
    }

    throw new Error(`Unsupported status: ${response.status}, ${await response.json()}`);
}

async function nfts(collection) {
    let next = '';
    let nftMetadata = [];
    do {
        const res = await fetchNftsPage(collection, next);
        nftMetadata = [...nftMetadata, ...res.nfts];
        next = res.next;
    } while (next);
    return nftMetadata;
}

async function exists(name) {
    try {
        await promises.stat(name);
        return true;
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }
        throw err;
    }
}

async function download(collection) {
    const all = await nfts(collection);
    const outputDir = `${__dirname}/output/${collection}`;
    console.log(`Downloading ${all.length} nfts!`);
    try {
        await promises.mkdir(outputDir);
    } catch (e) {
    }
    for (const nft of all) {
        if (!nft.image_url) {
            console.log(`Skipping nft with id ${nft.identifier}`);
        } else {
            if (await exists(`${outputDir}/${nft.identifier}.avif`)) {
                console.log(`Skipping ${nft.image_url}`);
            } else {
                console.log(`Downloading ${nft.image_url}`);
                await downloader.image({
                    url: nft.image_url,
                    dest: `${outputDir}/${nft.identifier}.avif`,
                });
            }
        }
    }
}

download(collection).then(_ => true);
