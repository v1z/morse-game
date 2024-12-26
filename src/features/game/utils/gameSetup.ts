export const gameSetup  = (nftNumbers: number[], totalCards: number): Map<number, number> => {
  // Step 1: Validate that totalCards is even
  if (totalCards % 2 !== 0) {
    throw new Error("Total number of cards must be even to ensure each NFT appears an even number of times.");
  }

  // Step 2: Calculate how many pairs are needed
  const totalPairsNeeded = totalCards / 2;

  // Step 3: Ensure there are enough NFTs (if not, repeat them)
  const selectedNFTs = [];
  const nftPool = [...nftNumbers]; // Copy of nftNumbers array

  while (selectedNFTs.length < totalPairsNeeded) {
      const randomIndex = Math.floor(Math.random() * nftPool.length);
      selectedNFTs.push(nftPool[randomIndex]);
  }

  // Step 4: Duplicate each selected NFT to ensure each appears twice
  const deck: number[] = [];

  selectedNFTs.forEach(nft => {
      deck.push(nft, nft); // Add each NFT twice to ensure even appearances
  });

  // Step 5: Shuffle the deck to randomize the card order
  for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap elements
  }

  // Step 6: Map the shuffled deck to card indexes
  const cardMap = new Map() as Map<number, number>;

  deck.forEach((nft, index) => {
      cardMap.set(index, nft);
  });

  return cardMap;
}
