"use client";

import { useState } from "react";
import Card from "@leafygreen-ui/card";
import { H3, Subtitle } from "@leafygreen-ui/typography";
import Checkbox from "@leafygreen-ui/checkbox";
import Button from "@leafygreen-ui/button";
import { RadioBoxGroup } from "@leafygreen-ui/radio-box-group";

const categories = [
  { id: "outdoor", label: "Outdoor" },
  { id: "footwear", label: "Footwear" },
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing" },
  { id: "accessories", label: "Accessories" },
];

export default function ProductsFilter() {
  const [priceRange, setPriceRange] = useState<string>("0-100");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (value: string) => {
    setPriceRange(value);
  };

  const handleReset = () => {
    setPriceRange("0-100");
    setSelectedCategories([]);
  };

  return (
    <Card className="sticky top-4">
      <div className="p-4">
        <H3>Filters</H3>

        <div className="mt-6">
          <Subtitle>Price Range</Subtitle>
          <RadioBoxGroup
            className="mt-2"
            name="price-range"
            value={priceRange}
            onChange={(e) => handlePriceChange(e.target.value)}>
            <RadioBoxGroup.Option value="0-100" className="mb-2">
              $0 - $100
            </RadioBoxGroup.Option>
            <RadioBoxGroup.Option value="100-500" className="mb-2">
              $100 - $500
            </RadioBoxGroup.Option>
            <RadioBoxGroup.Option value="500-1000" className="mb-2">
              $500 - $1000
            </RadioBoxGroup.Option>
            <RadioBoxGroup.Option value="1000+">$1000+</RadioBoxGroup.Option>
          </RadioBoxGroup>
        </div>

        <div className="mt-6">
          <Subtitle>Categories</Subtitle>
          <div className="mt-2 space-y-2">
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                onChange={() => handleCategoryChange(category.id)}
                checked={selectedCategories.includes(category.id)}
                label={category.label}
              />
            ))}
          </div>
        </div>

        <div className="mt-6">
          <Subtitle>Rating</Subtitle>
          <div className="mt-2 space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <Checkbox key={rating} label={`${rating}+ Stars`} />
            ))}
          </div>
        </div>

        <Button variant="default" className="w-full mt-6" onClick={handleReset}>
          Reset Filters
        </Button>
      </div>
    </Card>
  );
}
