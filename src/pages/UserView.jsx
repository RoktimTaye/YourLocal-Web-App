import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronUp, ChevronDown } from "lucide-react";

const UserView = () => {
  const [location, setLocation] = useState("");
  const [item, setItem] = useState("");
  const [filteredListings, setFilteredListings] = useState([]);

  // Function to load items from localStorage
  const loadItemsFromStorage = () => {
    try {
      const storedItems = JSON.parse(
        localStorage.getItem("localGlowItems") || "[]"
      );
      return storedItems;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return [];
    }
  };

  // Function to save items back to localStorage
  const saveItemsToStorage = (items) => {
    try {
      localStorage.setItem("localGlowItems", JSON.stringify(items));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  // Function to save sample items votes to localStorage
  const saveSampleVotes = (sampleVotes) => {
    try {
      localStorage.setItem("sampleItemVotes", JSON.stringify(sampleVotes));
      return true;
    } catch (error) {
      console.error("Error saving sample votes:", error);
      return false;
    }
  };

  // Function to load sample items votes from localStorage
  const loadSampleVotes = () => {
    try {
      const votes = JSON.parse(localStorage.getItem("sampleItemVotes") || "{}");
      return votes;
    } catch (error) {
      console.error("Error loading sample votes:", error);
      return {};
    }
  };

  // Function to load sample items verification status
  const loadSampleVerification = () => {
    try {
      const verifications = JSON.parse(
        localStorage.getItem("sampleVerifications") || "{}"
      );
      return verifications;
    } catch (error) {
      console.error("Error loading sample verifications:", error);
      return {};
    }
  };

  // Sample grocery data for Assam districts
  const getSampleListings = () => {
    const savedVotes = loadSampleVotes();
    const savedVerifications = loadSampleVerification();

    const sampleItems = [
      // Rice & Grains
      {
        item: "Basmati Rice (Premium)",
        price: "₹120-150/kg",
        range: "0.5 miles",
        area: "Guwahati",
        votes: savedVotes["basmati-rice"] || { up: 45, down: 3 },
        id: "basmati-rice",
        isSample: true,
        verified:
          savedVerifications[1] !== undefined ? savedVerifications[1] : true,
      },
      {
        item: "Assam Rice (Local)",
        price: "₹60-80/kg",
        range: "0.3 miles",
        area: "Jorhat",
        votes: savedVotes["assam-rice"] || { up: 38, down: 2 },
        id: "assam-rice",
        isSample: true,
        verified:
          savedVerifications[13] !== undefined ? savedVerifications[13] : true,
      },
      {
        item: "Brown Rice (Organic)",
        price: "₹100-120/kg",
        range: "1.2 miles",
        area: "Sivasagar",
        votes: savedVotes["brown-rice"] || { up: 25, down: 1 },
        id: "brown-rice",
        isSample: true,
        verified:
          savedVerifications[14] !== undefined ? savedVerifications[14] : false,
      },
      // Vegetables
      {
        item: "Fresh Tomatoes",
        price: "₹30-45/kg",
        range: "0.8 miles",
        area: "Dibrugarh",
        votes: savedVotes["fresh-tomatoes"] || { up: 42, down: 5 },
        id: "fresh-tomatoes",
        isSample: true,
        verified:
          savedVerifications[2] !== undefined ? savedVerifications[2] : true,
      },
      {
        item: "Green Leafy Vegetables",
        price: "₹15-25/bundle",
        range: "0.6 miles",
        area: "Nagaon",
        votes: savedVotes["leafy-vegetables"] || { up: 35, down: 2 },
        id: "leafy-vegetables",
        isSample: true,
        verified:
          savedVerifications[15] !== undefined ? savedVerifications[15] : true,
      },
      {
        item: "Organic Carrots",
        price: "₹40-55/kg",
        range: "1.5 miles",
        area: "Tezpur",
        votes: savedVotes["organic-carrots"] || { up: 28, down: 1 },
        id: "organic-carrots",
        isSample: true,
        verified:
          savedVerifications[16] !== undefined ? savedVerifications[16] : false,
      },
      {
        item: "Fresh Potatoes",
        price: "₹20-30/kg",
        range: "0.4 miles",
        area: "Dhubri",
        votes: savedVotes["fresh-potatoes"] || { up: 40, down: 3 },
        id: "fresh-potatoes",
        isSample: true,
        verified:
          savedVerifications[9] !== undefined ? savedVerifications[9] : true,
      },
      {
        item: "Red Onions",
        price: "₹35-50/kg",
        range: "0.7 miles",
        area: "Golaghat",
        votes: savedVotes["red-onions"] || { up: 36, down: 2 },
        id: "red-onions",
        isSample: true,
        verified:
          savedVerifications[8] !== undefined ? savedVerifications[8] : true,
      },
      // Tea & Beverages
      {
        item: "Assam Tea (CTC)",
        price: "₹200-300/kg",
        range: "0.2 miles",
        area: "Jorhat",
        votes: savedVotes["assam-tea-ctc"] || { up: 55, down: 1 },
        id: "assam-tea-ctc",
        isSample: true,
        verified:
          savedVerifications[3] !== undefined ? savedVerifications[3] : true,
      },
      {
        item: "Green Tea (Premium)",
        price: "₹400-600/kg",
        range: "1.0 miles",
        area: "Dibrugarh",
        votes: savedVotes["green-tea"] || { up: 32, down: 0 },
        id: "green-tea",
        isSample: true,
        verified:
          savedVerifications[17] !== undefined ? savedVerifications[17] : true,
      },
      // Fish & Meat
      {
        item: "Fresh River Fish (Rohu)",
        price: "₹180-220/kg",
        range: "1.8 miles",
        area: "Silchar",
        votes: savedVotes["river-fish"] || { up: 48, down: 4 },
        id: "river-fish",
        isSample: true,
        verified:
          savedVerifications[4] !== undefined ? savedVerifications[4] : true,
      },
      {
        item: "Local Chicken (Free Range)",
        price: "₹250-300/kg",
        range: "2.1 miles",
        area: "Tezpur",
        votes: savedVotes["local-chicken"] || { up: 44, down: 3 },
        id: "local-chicken",
        isSample: true,
        verified:
          savedVerifications[5] !== undefined ? savedVerifications[5] : true,
      },
      {
        item: "Dried Fish (Traditional)",
        price: "₹400-500/kg",
        range: "1.3 miles",
        area: "Barpeta",
        votes: savedVotes["dried-fish"] || { up: 22, down: 2 },
        id: "dried-fish",
        isSample: true,
        verified:
          savedVerifications[18] !== undefined ? savedVerifications[18] : false,
      },
      // Dairy & Essentials
      {
        item: "Fresh Milk (Buffalo)",
        price: "₹55-70/liter",
        range: "0.5 miles",
        area: "Nagaon",
        votes: savedVotes["buffalo-milk"] || { up: 41, down: 1 },
        id: "buffalo-milk",
        isSample: true,
        verified:
          savedVerifications[6] !== undefined ? savedVerifications[6] : true,
      },
      {
        item: "Fresh Curd (Homemade)",
        price: "₹60-80/kg",
        range: "0.8 miles",
        area: "Guwahati",
        votes: savedVotes["fresh-curd"] || { up: 33, down: 1 },
        id: "fresh-curd",
        isSample: true,
        verified:
          savedVerifications[19] !== undefined ? savedVerifications[19] : true,
      },
      // Grains & Pulses
      {
        item: "Wheat Flour (Whole)",
        price: "₹45-60/kg",
        range: "1.2 miles",
        area: "Barpeta",
        votes: savedVotes["wheat-flour"] || { up: 29, down: 2 },
        id: "wheat-flour",
        isSample: true,
        verified:
          savedVerifications[7] !== undefined ? savedVerifications[7] : true,
      },
      {
        item: "Black Gram (Urad Dal)",
        price: "₹120-150/kg",
        range: "0.9 miles",
        area: "Sivasagar",
        votes: savedVotes["black-gram"] || { up: 26, down: 1 },
        id: "black-gram",
        isSample: true,
        verified:
          savedVerifications[11] !== undefined ? savedVerifications[11] : true,
      },
      {
        item: "Red Lentils (Masoor Dal)",
        price: "₹90-120/kg",
        range: "1.5 miles",
        area: "Kokrajhar",
        votes: savedVotes["red-lentils"] || { up: 31, down: 2 },
        id: "red-lentils",
        isSample: true,
        verified:
          savedVerifications[20] !== undefined ? savedVerifications[20] : false,
      },
      // Cooking Essentials
      {
        item: "Mustard Oil (Cold Pressed)",
        price: "₹150-200/liter",
        range: "0.6 miles",
        area: "Kokrajhar",
        votes: savedVotes["mustard-oil"] || { up: 37, down: 1 },
        id: "mustard-oil",
        isSample: true,
        verified:
          savedVerifications[10] !== undefined ? savedVerifications[10] : true,
      },
      {
        item: "Rock Salt (Natural)",
        price: "₹20-30/kg",
        range: "1.4 miles",
        area: "Cachar",
        votes: savedVotes["rock-salt"] || { up: 24, down: 0 },
        id: "rock-salt",
        isSample: true,
        verified:
          savedVerifications[21] !== undefined ? savedVerifications[21] : true,
      },
      {
        item: "Fresh Farm Eggs",
        price: "₹6-9/piece",
        range: "0.7 miles",
        area: "Cachar",
        votes: savedVotes["farm-eggs"] || { up: 39, down: 2 },
        id: "farm-eggs",
        isSample: true,
        verified:
          savedVerifications[12] !== undefined ? savedVerifications[12] : true,
      },
      // Spices & Local Specialties
      {
        item: "Bhut Jolokia (Ghost Pepper)",
        price: "₹800-1200/kg",
        range: "2.3 miles",
        area: "Tezpur",
        votes: savedVotes["bhut-jolokia"] || { up: 18, down: 1 },
        id: "bhut-jolokia",
        isSample: true,
        verified:
          savedVerifications[22] !== undefined ? savedVerifications[22] : false,
      },
      {
        item: "Turmeric Powder (Fresh)",
        price: "₹200-250/kg",
        range: "1.1 miles",
        area: "Jorhat",
        votes: savedVotes["turmeric-powder"] || { up: 27, down: 1 },
        id: "turmeric-powder",
        isSample: true,
        verified:
          savedVerifications[23] !== undefined ? savedVerifications[23] : true,
      },
      // Fruits
      {
        item: "Assam Oranges",
        price: "₹80-120/kg",
        range: "1.6 miles",
        area: "Dibrugarh",
        votes: savedVotes["assam-oranges"] || { up: 34, down: 2 },
        id: "assam-oranges",
        isSample: true,
        verified:
          savedVerifications[24] !== undefined ? savedVerifications[24] : true,
      },
      {
        item: "Local Bananas",
        price: "₹40-60/dozen",
        range: "0.9 miles",
        area: "Silchar",
        votes: savedVotes["local-bananas"] || { up: 30, down: 1 },
        id: "local-bananas",
        isSample: true,
        verified:
          savedVerifications[25] !== undefined ? savedVerifications[25] : false,
      },
    ];

    // Filter out deleted sample items
    return sampleItems.filter((item) => {
      const numericId =
        typeof item.id === "string"
          ? Object.keys(savedVerifications)
              .find((key) => key.includes(item.id))
              ?.replace("deleted_", "")
          : item.id;
      return !savedVerifications[`deleted_${numericId}`];
    });
  };

  // Function to normalize search terms (handle singular/plural)
  const normalizeSearchTerm = (term) => {
    const lowerTerm = term.toLowerCase().trim();

    // Common singular to plural mappings
    const singularToPlural = {
      tomato: "tomatoes",
      potato: "potatoes",
      carrot: "carrots",
      onion: "onions",
      banana: "bananas",
      orange: "oranges",
      egg: "eggs",
      vegetable: "vegetables",
      lentil: "lentils",
      pepper: "peppers",
      fish: "fish", // same for both
      rice: "rice", // same for both
      milk: "milk", // same for both
      oil: "oil", // same for both
      flour: "flour", // same for both
      tea: "tea", // same for both
      chicken: "chicken", // same for both
      salt: "salt", // same for both
    };

    // Common plural to singular mappings (reverse)
    const pluralToSingular = {};
    Object.entries(singularToPlural).forEach(([singular, plural]) => {
      if (singular !== plural) {
        pluralToSingular[plural] = singular;
      }
    });

    // Return array of possible search variations
    const variations = [lowerTerm];

    // Add plural form if searching singular
    if (
      singularToPlural[lowerTerm] &&
      singularToPlural[lowerTerm] !== lowerTerm
    ) {
      variations.push(singularToPlural[lowerTerm]);
    }

    // Add singular form if searching plural
    if (pluralToSingular[lowerTerm]) {
      variations.push(pluralToSingular[lowerTerm]);
    }

    // Handle common -s endings for basic pluralization
    if (lowerTerm.endsWith("s") && lowerTerm.length > 3) {
      const singularForm = lowerTerm.slice(0, -1);
      if (!variations.includes(singularForm)) {
        variations.push(singularForm);
      }
    } else if (!lowerTerm.endsWith("s")) {
      const pluralForm = lowerTerm + "s";
      if (!variations.includes(pluralForm)) {
        variations.push(pluralForm);
      }
    }

    return variations;
  };

  // Enhanced search function that checks if any search variation matches the item
  const itemMatchesSearch = (itemName, searchTerm) => {
    const itemLower = itemName.toLowerCase();
    const searchVariations = normalizeSearchTerm(searchTerm);

    // Check if any search variation is found in the item name
    return searchVariations.some((variation) => itemLower.includes(variation));
  };

  // Function to sort listings by vote score (highest first)
  const sortByVotes = (listings) => {
    return listings.sort((a, b) => {
      const scoreA = a.votes.up - a.votes.down;
      const scoreB = b.votes.up - b.votes.down;
      return scoreB - scoreA; // Higher score first
    });
  };

  // Initialize with all listings on component mount
  useEffect(() => {
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();
    // Filter to show only verified items for users
    const verifiedSampleItems = sampleListings.filter(
      (item) => item.verified === true
    );
    const verifiedStoredItems = storedItems.filter(
      (item) => item.verified === true
    );
    const combinedListings = [...verifiedSampleItems, ...verifiedStoredItems];
    const sortedListings = sortByVotes(combinedListings);
    setFilteredListings(sortedListings);
  }, []);

  const handleSearch = () => {
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();
    // Filter to show only verified items for users
    const verifiedSampleItems = sampleListings.filter(
      (item) => item.verified === true
    );
    const verifiedStoredItems = storedItems.filter(
      (item) => item.verified === true
    );
    let filtered = [...verifiedSampleItems, ...verifiedStoredItems];

    // Filter by item name (enhanced with singular/plural support)
    if (item.trim()) {
      filtered = filtered.filter((listing) =>
        itemMatchesSearch(listing.item, item)
      );
    }

    // Filter by location/area (case-insensitive partial match)
    if (location.trim()) {
      filtered = filtered.filter((listing) =>
        listing.area.toLowerCase().includes(location.toLowerCase())
      );
    }

    // Sort by vote score (highest first)
    const sortedFiltered = sortByVotes(filtered);
    setFilteredListings(sortedFiltered);

    console.log(
      "Searching for:",
      { location, item },
      "Results:",
      sortedFiltered.length
    );
  };

  // Reset filters to show all listings
  const handleReset = () => {
    setLocation("");
    setItem("");
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();
    // Filter to show only verified items for users
    const verifiedSampleItems = sampleListings.filter(
      (item) => item.verified === true
    );
    const verifiedStoredItems = storedItems.filter(
      (item) => item.verified === true
    );
    const combinedListings = [...verifiedSampleItems, ...verifiedStoredItems];
    const sortedListings = sortByVotes(combinedListings);
    setFilteredListings(sortedListings);
  };

  // Handle voting for items
  const handleVote = (listingId, voteType, isSample = false) => {
    if (isSample) {
      // Handle sample items voting
      const savedVotes = loadSampleVotes();
      const currentVotes = savedVotes[listingId] || { up: 0, down: 0 };

      const updatedVotes = {
        ...currentVotes,
        [voteType]: currentVotes[voteType] + 1,
      };

      const allSampleVotes = {
        ...savedVotes,
        [listingId]: updatedVotes,
      };

      if (saveSampleVotes(allSampleVotes)) {
        // Refresh listings with updated votes and sort by score
        const storedItems = loadItemsFromStorage();
        const sampleListings = getSampleListings();
        // Filter to show only verified items for users
        const verifiedSampleItems = sampleListings.filter(
          (item) => item.verified === true
        );
        const verifiedStoredItems = storedItems.filter(
          (item) => item.verified === true
        );
        const combinedListings = [
          ...verifiedSampleItems,
          ...verifiedStoredItems,
        ];
        const sortedListings = sortByVotes(combinedListings);
        setFilteredListings(sortedListings);
      }
    } else {
      // Handle uploaded items voting
      const storedItems = loadItemsFromStorage();
      const updatedStoredItems = storedItems.map((item) => {
        if (item.id === listingId) {
          return {
            ...item,
            votes: {
              ...item.votes,
              [voteType]: item.votes[voteType] + 1,
            },
          };
        }
        return item;
      });

      if (saveItemsToStorage(updatedStoredItems)) {
        // Refresh listings with updated votes and sort by score
        const sampleListings = getSampleListings();
        // Filter to show only verified items for users
        const verifiedSampleItems = sampleListings.filter(
          (item) => item.verified === true
        );
        const verifiedStoredItems = updatedStoredItems.filter(
          (item) => item.verified === true
        );
        const combinedListings = [
          ...verifiedSampleItems,
          ...verifiedStoredItems,
        ];
        const sortedListings = sortByVotes(combinedListings);
        setFilteredListings(sortedListings);
      }
    }

    console.log(`${voteType} vote for item:`, listingId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-border">
        <div className="text-lg font-semibold text-foreground">
          LocalDirectory
        </div>
        <Link
          to="/"
          className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          ← Back
        </Link>
      </header>

      {/* Search/Filter Bar */}
      <div className="px-6 py-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter district in Assam (e.g., Guwahati, Jorhat)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Enter grocery item (e.g., Rice, Vegetables, Tea)"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
          </div>
          <Button onClick={handleSearch}>Search</Button>
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-6">
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table w-full min-w-[700px]">
              <thead>
                <tr>
                  <th className="table-header">Item</th>
                  <th className="table-header">Price</th>
                  <th className="table-header">Range</th>
                  <th className="table-header">Area</th>
                  <th className="table-header">Vote</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="table-cell text-center text-muted-foreground py-8"
                    >
                      No listings found. Try adjusting your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredListings.map((listing, index) => (
                    <tr key={listing.id || index} className="hover:bg-muted/20">
                      <td className="table-cell font-medium whitespace-nowrap">
                        {listing.item}
                      </td>
                      <td className="table-cell whitespace-nowrap">
                        {listing.price}
                      </td>
                      <td className="table-cell whitespace-nowrap">
                        {listing.range}
                      </td>
                      <td className="table-cell whitespace-nowrap">
                        {listing.area}
                      </td>
                      <td className="table-cell">
                        <div className="flex items-center space-x-2 min-w-[140px]">
                          <button
                            className="btn-vote hover:bg-green-100 hover:text-green-600 transition-colors"
                            onClick={() =>
                              handleVote(
                                listing.id || `item-${index}`,
                                "up",
                                listing.isSample
                              )
                            }
                          >
                            <ChevronUp className="w-4 h-4" />
                          </button>
                          <span className="text-sm font-medium min-w-[30px] text-center whitespace-nowrap">
                            {listing.votes.up - listing.votes.down}
                          </span>
                          <button
                            className="btn-vote hover:bg-red-100 hover:text-red-600 transition-colors"
                            onClick={() =>
                              handleVote(
                                listing.id || `item-${index}`,
                                "down",
                                listing.isSample
                              )
                            }
                          >
                            <ChevronDown className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserView;
