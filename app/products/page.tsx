"use client";

import ProductGrid from "@/components/product-grid";
import { products } from "@/lib/mock-data";
import { Suspense } from "react";
import ProductsFilter from "@/components/products-filter";
import type { Metadata } from "next";
import { H1 } from "@leafygreen-ui/typography";

export default function ProductsPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <H1>All Products</H1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
        <div className="lg:col-span-1">
          <ProductsFilter />
        </div>

        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading products...</div>}>
            <ProductGrid products={products} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
