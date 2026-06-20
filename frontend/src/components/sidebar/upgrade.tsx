"use client";
import { authClient } from '@/lib/auth-client';
import React from 'react'
import { Button } from '../ui/button';
import { Crown, Sparkles } from 'lucide-react';

export default function Upgrade() {
    const upgrade  = async () => {
        await authClient.checkout({
            products: ["f0f1fb50-8f14-4ed8-ad8a-3eaa3402545a", "b7a2c644-02d3-4c6c-8723-917dbe1bbcd1", "2cb38766-a54a-4f9e-b9f2-9a77e4f0e472"],
            successUrl: "/dashboard?checkout_id={CHECKOUT_ID}",
        });
    }
  return (
    <Button
      variant="outline"
      size="sm"
      className="group relative ml-2 overflow-hidden border-orange-400/50 bg-linear-to-r400/10 to-pink-500/10 text-orange-400 transition-all duration-300 hover:border-orange-500/70 bg-linear-to-r hover:from-orange-500 hover:to-pink-600 hover:text-white hover:shadow-lg hover:shadow-orange-500/25"
      onClick={upgrade}
    >
      <div className="flex items-center gap-2">
        <Crown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12" />
        <span className="font-medium">Upgrade</span>
        <Sparkles className="h-3 w-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-md bg-linear-to-r 400/20 to-pink-500/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </Button>
  )
}
