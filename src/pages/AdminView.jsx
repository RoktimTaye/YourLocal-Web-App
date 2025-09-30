import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";

const AdminView = () => {
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

  // Function to save sample items verification status
  const saveSampleVerification = (sampleVerifications) => {
    try {
      localStorage.setItem(
        "sampleVerifications",
        JSON.stringify(sampleVerifications)
      );
      return true;
    } catch (error) {
      console.error("Error saving sample verifications:", error);
      return false;
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

  // Sample grocery data for Assam districts with admin controls
  const getSampleListings = () => {
    const savedVerifications = loadSampleVerification();
    return [
      // Rice & Grains
      {
        item: "Basmati Rice (Premium)",
        price: "₹120-150/kg",
        range: "0.5 miles",
        area: "Guwahati",
        verified:
          savedVerifications[1] !== undefined ? savedVerifications[1] : true,
        id: 1,
        isSample: true,
      },
      {
        item: "Assam Rice (Local)",
        price: "₹60-80/kg",
        range: "0.3 miles",
        area: "Jorhat",
        verified:
          savedVerifications[13] !== undefined ? savedVerifications[13] : true,
        id: 13,
        isSample: true,
      },
      {
        item: "Brown Rice (Organic)",
        price: "₹100-120/kg",
        range: "1.2 miles",
        area: "Sivasagar",
        verified:
          savedVerifications[14] !== undefined ? savedVerifications[14] : false,
        id: 14,
        isSample: true,
      },
      // Vegetables
      {
        item: "Fresh Tomatoes",
        price: "₹30-45/kg",
        range: "0.8 miles",
        area: "Dibrugarh",
        verified:
          savedVerifications[2] !== undefined ? savedVerifications[2] : true,
        id: 2,
        isSample: true,
      },
      {
        item: "Green Leafy Vegetables",
        price: "₹15-25/bundle",
        range: "0.6 miles",
        area: "Nagaon",
        verified:
          savedVerifications[15] !== undefined ? savedVerifications[15] : true,
        id: 15,
        isSample: true,
      },
      {
        item: "Organic Carrots",
        price: "₹40-55/kg",
        range: "1.5 miles",
        area: "Tezpur",
        verified:
          savedVerifications[16] !== undefined ? savedVerifications[16] : false,
        id: 16,
        isSample: true,
      },
      {
        item: "Fresh Potatoes",
        price: "₹20-30/kg",
        range: "0.4 miles",
        area: "Dhubri",
        verified:
          savedVerifications[9] !== undefined ? savedVerifications[9] : true,
        id: 9,
        isSample: true,
      },
      {
        item: "Red Onions",
        price: "₹35-50/kg",
        range: "0.7 miles",
        area: "Golaghat",
        verified:
          savedVerifications[8] !== undefined ? savedVerifications[8] : true,
        id: 8,
        isSample: true,
      },
      // Tea & Beverages
      {
        item: "Assam Tea (CTC)",
        price: "₹200-300/kg",
        range: "0.2 miles",
        area: "Jorhat",
        verified:
          savedVerifications[3] !== undefined ? savedVerifications[3] : true,
        id: 3,
        isSample: true,
      },
      {
        item: "Green Tea (Premium)",
        price: "₹400-600/kg",
        range: "1.0 miles",
        area: "Dibrugarh",
        verified:
          savedVerifications[17] !== undefined ? savedVerifications[17] : true,
        id: 17,
        isSample: true,
      },
      // Fish & Meat
      {
        item: "Fresh River Fish (Rohu)",
        price: "₹180-220/kg",
        range: "1.8 miles",
        area: "Silchar",
        verified:
          savedVerifications[4] !== undefined ? savedVerifications[4] : true,
        id: 4,
        isSample: true,
      },
      {
        item: "Local Chicken (Free Range)",
        price: "₹250-300/kg",
        range: "2.1 miles",
        area: "Tezpur",
        verified:
          savedVerifications[5] !== undefined ? savedVerifications[5] : true,
        id: 5,
        isSample: true,
      },
      {
        item: "Dried Fish (Traditional)",
        price: "₹400-500/kg",
        range: "1.3 miles",
        area: "Barpeta",
        verified:
          savedVerifications[18] !== undefined ? savedVerifications[18] : false,
        id: 18,
        isSample: true,
      },
      // Dairy & Essentials
      {
        item: "Fresh Milk (Buffalo)",
        price: "₹55-70/liter",
        range: "0.5 miles",
        area: "Nagaon",
        verified:
          savedVerifications[6] !== undefined ? savedVerifications[6] : true,
        id: 6,
        isSample: true,
      },
      {
        item: "Fresh Curd (Homemade)",
        price: "₹60-80/kg",
        range: "0.8 miles",
        area: "Guwahati",
        verified:
          savedVerifications[19] !== undefined ? savedVerifications[19] : true,
        id: 19,
        isSample: true,
      },
      // Grains & Pulses
      {
        item: "Wheat Flour (Whole)",
        price: "₹45-60/kg",
        range: "1.2 miles",
        area: "Barpeta",
        verified:
          savedVerifications[7] !== undefined ? savedVerifications[7] : true,
        id: 7,
        isSample: true,
      },
      {
        item: "Black Gram (Urad Dal)",
        price: "₹120-150/kg",
        range: "0.9 miles",
        area: "Sivasagar",
        verified:
          savedVerifications[11] !== undefined ? savedVerifications[11] : true,
        id: 11,
        isSample: true,
      },
      {
        item: "Red Lentils (Masoor Dal)",
        price: "₹90-120/kg",
        range: "1.5 miles",
        area: "Kokrajhar",
        verified:
          savedVerifications[20] !== undefined ? savedVerifications[20] : false,
        id: 20,
        isSample: true,
      },
      // Cooking Essentials
      {
        item: "Mustard Oil (Cold Pressed)",
        price: "₹150-200/liter",
        range: "0.6 miles",
        area: "Kokrajhar",
        verified:
          savedVerifications[10] !== undefined ? savedVerifications[10] : true,
        id: 10,
        isSample: true,
      },
      {
        item: "Rock Salt (Natural)",
        price: "₹20-30/kg",
        range: "1.4 miles",
        area: "Cachar",
        verified:
          savedVerifications[21] !== undefined ? savedVerifications[21] : true,
        id: 21,
        isSample: true,
      },
      {
        item: "Fresh Farm Eggs",
        price: "₹6-9/piece",
        range: "0.7 miles",
        area: "Cachar",
        verified:
          savedVerifications[12] !== undefined ? savedVerifications[12] : true,
        id: 12,
        isSample: true,
      },
      // Spices & Local Specialties
      {
        item: "Bhut Jolokia (Ghost Pepper)",
        price: "₹800-1200/kg",
        range: "2.3 miles",
        area: "Tezpur",
        verified:
          savedVerifications[22] !== undefined ? savedVerifications[22] : false,
        id: 22,
        isSample: true,
      },
      {
        item: "Turmeric Powder (Fresh)",
        price: "₹200-250/kg",
        range: "1.1 miles",
        area: "Jorhat",
        verified:
          savedVerifications[23] !== undefined ? savedVerifications[23] : true,
        id: 23,
        isSample: true,
      },
      // Fruits
      {
        item: "Assam Oranges",
        price: "₹80-120/kg",
        range: "1.6 miles",
        area: "Dibrugarh",
        verified:
          savedVerifications[24] !== undefined ? savedVerifications[24] : true,
        id: 24,
        isSample: true,
      },
      {
        item: "Local Bananas",
        price: "₹40-60/dozen",
        range: "0.9 miles",
        area: "Silchar",
        verified:
          savedVerifications[25] !== undefined ? savedVerifications[25] : false,
        id: 25,
        isSample: true,
      },
    ];
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

  // Initialize with all listings on component mount
  useEffect(() => {
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();
    const combinedListings = [...sampleListings, ...storedItems];
    setFilteredListings(combinedListings);
  }, []);

  const handleSearch = () => {
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();
    let filtered = [...sampleListings, ...storedItems];

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

    setFilteredListings(filtered);
    console.log(
      "Searching for:",
      { location, item },
      "Results:",
      filtered.length
    );
  };

  // Reset filters to show all listings
  const handleReset = () => {
    setLocation("");
    setItem("");
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();
    const combinedListings = [...sampleListings, ...storedItems];
    setFilteredListings(combinedListings);
  };

  const handleVerify = (id, verified) => {
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();

    // Check if it's a sample item
    const sampleItem = sampleListings.find((item) => item.id === id);
    if (sampleItem) {
      // Handle sample item verification
      const savedVerifications = loadSampleVerification();
      const updatedVerifications = {
        ...savedVerifications,
        [id]: verified,
      };

      if (saveSampleVerification(updatedVerifications)) {
        // Refresh the displayed listings
        const updatedSampleListings = getSampleListings();
        const combinedListings = [...updatedSampleListings, ...storedItems];
        setFilteredListings(combinedListings);
        console.log("Verify sample item:", id, verified);
      }
    } else {
      // Handle uploaded item verification
      const updatedStoredItems = storedItems.map((item) =>
        item.id === id ? { ...item, verified } : item
      );

      if (saveItemsToStorage(updatedStoredItems)) {
        // Refresh the displayed listings
        const combinedListings = [...sampleListings, ...updatedStoredItems];
        setFilteredListings(combinedListings);
        console.log("Verify uploaded item:", id, verified);
      }
    }
  };

  const handleDelete = (id) => {
    const storedItems = loadItemsFromStorage();
    const sampleListings = getSampleListings();

    // Check if it's a sample item
    const sampleItem = sampleListings.find((item) => item.id === id);
    if (sampleItem) {
      // For sample items, we'll remove them from the display by marking them as deleted
      const savedVerifications = loadSampleVerification();
      const updatedVerifications = {
        ...savedVerifications,
        [`deleted_${id}`]: true,
      };

      if (saveSampleVerification(updatedVerifications)) {
        // Refresh the displayed listings (filter out deleted sample items)
        const updatedSampleListings = getSampleListings().filter(
          (item) => !savedVerifications[`deleted_${item.id}`]
        );
        const combinedListings = [...updatedSampleListings, ...storedItems];
        setFilteredListings(combinedListings);
        console.log("Deleted sample item:", id);
      }
    } else {
      // Handle uploaded item deletion
      const updatedStoredItems = storedItems.filter((item) => item.id !== id);

      if (saveItemsToStorage(updatedStoredItems)) {
        // Refresh the displayed listings
        const combinedListings = [...sampleListings, ...updatedStoredItems];
        setFilteredListings(combinedListings);
        console.log("Deleted uploaded item:", id);
      } else {
        console.log("Failed to delete item:", id);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-border">
        <div className="text-lg font-semibold text-foreground">YourLocal</div>
        <Link
          to="/admin"
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
            <table className="data-table w-full min-w-[800px]">
              <thead>
                <tr>
                  <th className="table-header">Item</th>
                  <th className="table-header">Price</th>
                  <th className="table-header">Range</th>
                  <th className="table-header">Area</th>
                  <th className="table-header">Verify</th>
                  <th className="table-header">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredListings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="table-cell text-center text-muted-foreground py-8"
                    >
                      No listings found. Try adjusting your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredListings.map((listing) => (
                    <tr key={listing.id} className="hover:bg-muted/20">
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
                        <div className="flex items-center space-x-2 min-w-[120px]">
                          <Checkbox
                            checked={listing.verified}
                            onCheckedChange={(checked) =>
                              handleVerify(listing.id, checked)
                            }
                          />
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {listing.verified ? "Verified" : "Pending"}
                          </span>
                        </div>
                      </td>
                      <td className="table-cell">
                        <div className="min-w-[80px]">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(listing.id)}
                            className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
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

export default AdminView;
