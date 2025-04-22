"use client"

import Button from "@leafygreen-ui/button"
import Card from "@leafygreen-ui/card"
import IconButton from "@leafygreen-ui/icon-button"
import { H1, H2, H3, Body, Subtitle } from "@leafygreen-ui/typography"
import { useCart } from "@/context/cart-context"
import Image from "next/image"
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"
import { Separator } from "@/components/ui/separator"

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-8">
        <H1>Your Cart</H1>
        <div className="text-center py-16">
          <H2>Your cart is empty</H2>
          <Body className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</Body>
          <Button as="a" href="/products" variant="primary">
            Browse Products
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <H1>Your Cart</H1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
        <div className="lg:col-span-2">
          <Card>
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b">
              <div className="col-span-6">
                <Subtitle>Product</Subtitle>
              </div>
              <div className="col-span-2 text-center">
                <Subtitle>Price</Subtitle>
              </div>
              <div className="col-span-2 text-center">
                <Subtitle>Quantity</Subtitle>
              </div>
              <div className="col-span-2 text-right">
                <Subtitle>Subtotal</Subtitle>
              </div>
            </div>

            {cart.map((item) => (
              <div key={item.id} className="p-4 border-b last:border-b-0">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="col-span-1 md:col-span-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div>
                        <Body weight="medium">{item.name}</Body>
                        <Body className="text-sm text-gray-500">{item.category}</Body>
                        <Button
                          onClick={() => removeFromCart(item.id)}
                          variant="danger"
                          size="small"
                          className="md:hidden mt-1"
                          leftGlyph={<Trash2 size={12} />}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-left md:text-center">
                    <Body className="md:hidden text-sm text-gray-500">Price: </Body>
                    <Body>${item.price.toFixed(2)}</Body>
                  </div>

                  <div className="col-span-1 md:col-span-2 text-left md:text-center">
                    <div className="flex items-center md:justify-center">
                      <IconButton
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </IconButton>
                      <Body className="mx-3 w-8 text-center">{item.quantity}</Body>
                      <IconButton
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </IconButton>
                    </div>
                  </div>

                  <div className="col-span-1 md:col-span-2 flex justify-between md:justify-end items-center">
                    <Body className="md:hidden text-sm text-gray-500">Subtotal: </Body>
                    <Body weight="medium">${(item.price * item.quantity).toFixed(2)}</Body>
                    <IconButton
                      aria-label="Remove item"
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 ml-4 hidden md:block"
                    >
                      <Trash2 size={16} />
                    </IconButton>
                  </div>
                </div>
              </div>
            ))}
          </Card>

          <div className="mt-4 flex justify-between">
            <Button
              variant="default"
              as="a"
              href="/products"
              leftGlyph={<ArrowRight size={16} className="transform rotate-180" />}
            >
              Continue Shopping
            </Button>

            <Button variant="danger" onClick={() => clearCart()}>
              Clear Cart
            </Button>
          </div>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <div className="p-6">
              <H3>Order Summary</H3>

              <div className="space-y-3 mt-4">
                <div className="flex justify-between">
                  <Body className="text-gray-600">Subtotal</Body>
                  <Body>${subtotal.toFixed(2)}</Body>
                </div>

                <div className="flex justify-between">
                  <Body className="text-gray-600">Shipping</Body>
                  <Body>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</Body>
                </div>

                <Separator />

                <div className="flex justify-between">
                  <Body weight="medium">Total</Body>
                  <Body weight="medium">${total.toFixed(2)}</Body>
                </div>
              </div>

              <Button variant="primary" className="w-full mt-6" size="large" leftGlyph={<ArrowRight size={16} />}>
                Checkout
              </Button>

              <Body className="text-xs text-gray-500 mt-4 text-center">Secure checkout powered by Stripe</Body>
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}
