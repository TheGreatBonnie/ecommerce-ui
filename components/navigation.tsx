"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ShoppingBag, ShoppingCart, User, Menu, X } from "lucide-react";
import IconButton from "@leafygreen-ui/icon-button";
import { H2 } from "@leafygreen-ui/typography";
import Badge from "@leafygreen-ui/badge";
import { SideNav } from "@leafygreen-ui/side-nav";
import { useState } from "react";
import { useMobile } from "@/hooks/use-mobile";
import { useCart } from "@/context/cart-context";
import { palette } from "@leafygreen-ui/palette";

const navItems = [
  { name: "Home", href: "/", icon: Home },
  // { name: "Products", href: "/products", icon: ShoppingBag },
  { name: "Cart", href: "/cart", icon: ShoppingCart },
  // { name: "Profile", href: "/profile", icon: User },
];

export default function Navigation() {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <H2>ShopSmart</H2>
          </Link>

          {isMobile ? (
            <>
              <IconButton
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                onClick={toggleMenu}
                className="md:hidden">
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </IconButton>

              {isMenuOpen && (
                <div className="fixed inset-0 z-50 bg-white pt-16">
                  <SideNav aria-label="Navigation">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isCart = item.name === "Cart";
                      const isActive = pathname === item.href;

                      return (
                        <SideNav.Item
                          key={item.name}
                          href={item.href}
                          active={isActive}
                          onClick={() => setIsMenuOpen(false)}>
                          <div className="flex items-center">
                            <Icon size={16} className="mr-2" />
                            {item.name}
                            {isCart && cartCount > 0 && (
                              <Badge variant="blue" className="ml-2">
                                {cartCount}
                              </Badge>
                            )}
                          </div>
                        </SideNav.Item>
                      );
                    })}
                  </SideNav>
                </div>
              )}
            </>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isCart = item.name === "Cart";
                const isActive = pathname === item.href;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                      isActive
                        ? `bg-[${palette.blue.light2}] text-[${palette.blue.dark2}]`
                        : "text-gray-600 hover:bg-gray-100"
                    }`}>
                    <Icon size={16} className="mr-2" />
                    <span>{item.name}</span>
                    {isCart && cartCount > 0 && (
                      <Badge variant="blue" className="ml-2">
                        {cartCount}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
