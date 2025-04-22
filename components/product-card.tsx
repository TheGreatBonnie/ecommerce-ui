"use client";

import type { Product } from "@/lib/types";
import Card from "@leafygreen-ui/card";
import Button from "@leafygreen-ui/button";
import { H3, Body } from "@leafygreen-ui/typography";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import IconButton from "@leafygreen-ui/icon-button";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="relative h-64 w-full overflow-hidden rounded-t-lg">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-1 flex-grow">
        <H3>{product.name}</H3>
        <Body className="text-sm text-gray-500 mb-2 line-clamp-2">
          {product.description}
        </Body>
        <Body weight="medium" className="text-lg">
          ${product.price.toFixed(2)}
        </Body>
      </div>
      <div className="p-4 pt-0 flex gap-2">
        <Button
          variant="primary"
          className="flex-1"
          onClick={onAddToCart}
          leftGlyph={<ShoppingCart size={16} />}>
          Add to Cart
        </Button>
        <Link href={`/products/${product.id}`}>
          <IconButton aria-label="View details">
            <Eye size={16} />
          </IconButton>
        </Link>
      </div>
    </Card>
  );
}
