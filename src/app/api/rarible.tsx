import axios from 'axios';

// Rarible API base URL
const RARIBLE_API_URL = 'https://testnet-api.rarible.org/v0.1';

// Create an Axios instance with default configuration
const rarible = axios.create({
  baseURL: RARIBLE_API_URL,
});

// Function to set the API key
const auth = (apiKey: string) => {
  rarible.defaults.headers.common['X-API-KEY'] = apiKey; // Set the API key in the X-API-KEY header
};

// Function to get NFT item by ID
const getItemById = async ({ itemId }: { itemId: string }) => {
  try {
    console.log(`Fetching NFT data for ID: ${itemId}`);
    const response = await rarible.get(`/items/${itemId}`);
    return response.data; // Return the NFT data
  } catch (error) {
    console.error(`Failed to fetch NFT data: ${error}`);
    throw new Error(`Failed to fetch NFT data: ${error}`);
  }
};

// Function to get NFTs by collection
const getItemsByCollection = async ({ collectionId }: { collectionId: string }) => {
  try {
    console.log(`Fetching NFTs for collection ID: ${collectionId}`);
    const response = await rarible.get(`/items/byCollection?collection=${collectionId}`);
    return response.data; // Return the NFTs data
  } catch (error) {
    console.error(`Failed to fetch NFTs data: ${error}`);
    throw new Error(`Failed to fetch NFTs data: ${error}`);
  }
};

// Export the functions
export default {
  auth,
  getItemById,
  getItemsByCollection, // Add this line
};

