import { Settings, Loader } from "lucide-react";

import Heading from '@/components/heading'
import React from 'react'
import { checkSubscription } from "@/lib/subscription";
import SubscriptionButton from "@/components/subscriptionButton";

const SettingsPage =async () => {
    const isPro = await checkSubscription()
  return (
    <div className="max-w-[1400px] m-auto">
        <Heading
        title="Settings"
        description="Manage your account settings "
        icon={Settings}
        iconColor="text-gray-500"
        bgColor="bg-gray-700/40"
      />

      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-gray-300 text-sm">
            {isPro? 'You are currently on a pro plan ': 'You are currently on a Free plan ' }
        </div>
        <SubscriptionButton isPro={isPro}/>
      </div>
    </div>
  )
}

export default SettingsPage