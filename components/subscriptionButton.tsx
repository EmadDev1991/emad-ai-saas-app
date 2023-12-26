"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {

    const [ loading, setLoading] = useState(false)


  const onClick = async () => {
    setLoading(true)
    try {

        const response = await axios.get('/api/stripe')
        window.location.href = response.data.url

    } catch (error: any) {
        console.log('billing error ', error)
    }finally{
        setLoading(false)
    }
  };

  return (
    <Button
    disabled= {loading}
      onClick={onClick}
      className=" bg-gradient-to-r from-purple-400 to-pink-600 flex justify-center items-center gap-2"
    >
      {!isPro && <Zap className="w-4" />}
      {isPro ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
};

export default SubscriptionButton;
