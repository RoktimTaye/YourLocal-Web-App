import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const UploadForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [items, setItems] = useState([{ item: "", price: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to save items to localStorage
  const saveItemsToStorage = (newItems) => {
    try {
      const existingItems = JSON.parse(
        localStorage.getItem("localGlowItems") || "[]"
      );
      const updatedItems = [...existingItems, ...newItems];
      localStorage.setItem("localGlowItems", JSON.stringify(updatedItems));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  const addItem = () => {
    setItems([...items, { item: "", price: "" }]);
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const removeItem = (index) => {
    if (items.length > 1) {
      const newItems = items.filter((_, i) => i !== index);
      setItems(newItems);
    }
  };

  const validateForm = () => {
    // Check if location is provided
    if (!location.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a location.",
        variant: "destructive",
      });
      return false;
    }

    // Check if at least one item is properly filled
    const validItems = items.filter(
      (item) => item.item.trim() && item.price.trim()
    );
    if (validItems.length === 0) {
      toast({
        title: "Validation Error",
        description: "Please add at least one item with both name and price.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Filter out empty items
      const validItems = items.filter(
        (item) => item.item.trim() && item.price.trim()
      );

      // Create items with additional metadata
      const itemsToSave = validItems.map((item, index) => ({
        id: Date.now() + index, // Simple ID generation
        item: item.item.trim(),
        price: item.price.trim(),
        area: location.trim(),
        range: "0.5 miles", // Default range
        verified: false, // New items start unverified
        votes: { up: 0, down: 0 }, // Initialize voting
        uploadedAt: new Date().toISOString(),
      }));

      // Save to localStorage
      const success = saveItemsToStorage(itemsToSave);

      if (success) {
        toast({
          title: "Success!",
          description: `Successfully uploaded ${validItems.length} item(s) to ${location}.`,
        });

        // Reset form
        setLocation("");
        setItems([{ item: "", price: "" }]);

        // Navigate back after a short delay
        setTimeout(() => {
          navigate(-1);
        }, 1500);
      } else {
        throw new Error("Failed to save items");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description:
          "There was an error uploading your items. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2 border-b border-border">
        <div className="text-lg font-semibold text-foreground">YourLocal</div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="bg-black text-white px-4 py-2 rounded-md text-sm flex items-center justify-center hover:bg-gray-800 transition-colors"
        >
          ← Back
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Grocery Items */}
            {items.map((item, index) => (
              <div
                key={index}
                className="space-y-4 p-4 border border-border rounded-md"
              >
                {/* Location input only for the first item */}
                {index === 0 && (
                  <div>
                    <label className="form-label">Location</label>
                    <Input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter district in Assam (e.g., Guwahati, Jorhat)"
                    />
                  </div>
                )}
                <div>
                  <label className="form-label">Grocery Item</label>
                  <Input
                    type="text"
                    value={item.item}
                    onChange={(e) => updateItem(index, "item", e.target.value)}
                    placeholder="e.g., Basmati Rice, Fresh Vegetables"
                  />
                </div>
                <div>
                  <label className="form-label">Price</label>
                  <Input
                    type="text"
                    value={item.price}
                    onChange={(e) => updateItem(index, "price", e.target.value)}
                    placeholder="e.g., ₹80-120/kg, ₹50/liter"
                  />
                </div>
                {items.length > 1 && (
                  <div className="flex justify-end">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(index)}
                      className="text-destructive hover:text-destructive-foreground hover:bg-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={addItem}
              className="w-full flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add+</span>
            </Button>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Uploading...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Upload Items
                </>
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default UploadForm;
