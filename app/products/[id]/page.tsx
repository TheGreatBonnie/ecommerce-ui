"use client";

import { products } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Star } from "lucide-react";
import AddToCartButton from "@/components/add-to-cart-button";
import type { Metadata } from "next";
import { H1, H2, Body } from "@leafygreen-ui/typography";
import Card from "@leafygreen-ui/card";
import Badge from "@leafygreen-ui/badge";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-md">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col">
          <H1>{product.name}</H1>

          <div className="flex items-center my-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <Body className="ml-2 text-gray-600">
              {product.rating.toFixed(1)}
            </Body>
          </div>

          <Body size="large" weight="medium" className="mb-4">
            ${product.price.toFixed(2)}
          </Body>

          <Body className="text-gray-600 mb-6">{product.description}</Body>

          <div className="flex items-center mb-6">
            <Badge variant={product.inStock ? "green" : "red"}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
            <Badge variant="gray" className="ml-4">
              {product.category}
            </Badge>
          </div>

          <AddToCartButton
            product={product}
            className="w-full md:w-auto mb-4"
          />

          <Card className="mt-8">
            <div className="p-4">
              <H2>Product Details</H2>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>
                  <Body>Premium quality materials</Body>
                </li>
                <li>
                  <Body>Designed for durability and comfort</Body>
                </li>
                <li>
                  <Body>30-day money-back guarantee</Body>
                </li>
                <li>
                  <Body>Free shipping on orders over $50</Body>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </main>
  );
}
