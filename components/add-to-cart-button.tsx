"use client"

import Button from "@leafygreen-ui/button"
import IconButton from "@leafygreen-ui/icon-button"
import { Body } from "@leafygreen-ui/typography"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import { useState } from "react"

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export default function AddToCartButton({ product, className = "" }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setQuantity(1)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="flex items-center border rounded-md overflow-hidden">
        <IconButton
          aria-label="Decrease quantity"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          disabled={quantity <= 1}
        >
          <Minus size={16} />
        </IconButton>
        <Body className="px-6 py-2 flex items-center justify-center min-w-[60px]">{quantity}</Body>
        <IconButton aria-label="Increase quantity" onClick={() => setQuantity((prev) => prev + 1)}>
          <Plus size={16} />
        </IconButton>
      </div>

      <Button
        variant="primary"
        className={className}
        onClick={handleAddToCart}
        disabled={!product.inStock}
        leftGlyph={<ShoppingCart size={16} />}
      >
        {product.inStock ? "Add to Cart" : "Out of Stock"}
      </Button>
    </div>
  )
}
