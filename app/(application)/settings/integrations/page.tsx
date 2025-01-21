"use client";

import * as React from "react";
import {
    RiAddCircleLine,
    RiArrowRightSLine,
    RiFolderSettingsLine,
    RiTimer2Line,
} from "@remixicon/react";

import * as TabMenuHorizontal from "@/components/ui/tab-menu-horizontal";
import * as TabMenuVertical from "@/components/ui/tab-menu-vertical";

import Integrations from "./integrations";
import Suggestion from "./suggestion";
import Upcoming from "./upcoming";

const tabs = [
    {
        label: "Integrations",
        icon: RiFolderSettingsLine,
        component: Integrations,
    },
    {
        label: "Upcoming",
        icon: RiTimer2Line,
        component: Upcoming,
    },
    {
        label: "Make a Suggestion",
        icon: RiAddCircleLine,
        component: Suggestion,
    },
] as const;

export default function PageIntegrations() {
    const [activeTab, setActiveTab] = React.useState<
        (typeof tabs)[number]["label"] | (string & {})
    >("Integrations");

    return (
        <>
            {" "}
            {/* mobile */}
            <TabMenuHorizontal.Root
                value={activeTab}
                onValueChange={setActiveTab}
                className="md:hidden"
            >
                <TabMenuHorizontal.List
                    wrapperClassName="-mx-4 mb-6"
                    className="px-4"
                >
                    {tabs.map(({ label, icon: Icon }) => (
                        <TabMenuHorizontal.Trigger key={label} value={label}>
                            <TabMenuHorizontal.Icon as={Icon} />
                            {label}
                        </TabMenuHorizontal.Trigger>
                    ))}
                </TabMenuHorizontal.List>

                {tabs.map(({ label, component: Component }) => (
                    <TabMenuHorizontal.Content
                        key={label}
                        value={label}
                        className="data-[state=active]:duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-4"
                    >
                        <Component />
                    </TabMenuHorizontal.Content>
                ))}
            </TabMenuHorizontal.Root>
            {/* desktop */}
            <TabMenuVertical.Root
                value={activeTab}
                onValueChange={setActiveTab}
                className="hidden grid-cols-[auto,1fr] items-start gap-8 md:grid xl:grid-cols-[1fr_minmax(0,446px)_1fr]"
            >
                <div className="w-[258px] shrink-0 rounded-2xl bg-bg-white-0 p-2.5 shadow-regular-xs ring-1 ring-inset ring-stroke-soft-200">
                    <h4 className="mb-2 px-2 py-1 text-subheading-xs uppercase text-text-soft-400">
                        select menu
                    </h4>
                    <TabMenuVertical.List>
                        {tabs.map(({ label, icon: Icon }) => (
                            <TabMenuVertical.Trigger key={label} value={label}>
                                <TabMenuVertical.Icon as={Icon} />
                                {label}
                                <TabMenuVertical.ArrowIcon
                                    as={RiArrowRightSLine}
                                />
                            </TabMenuVertical.Trigger>
                        ))}
                    </TabMenuVertical.List>
                </div>

                {tabs.map(({ label, component: Component }) => (
                    <TabMenuVertical.Content
                        key={label}
                        value={label}
                        className="data-[state=active]:duration-300 data-[state=active]:animate-in data-[state=active]:fade-in-0 data-[state=active]:slide-in-from-bottom-4"
                    >
                        <Component />
                    </TabMenuVertical.Content>
                ))}
            </TabMenuVertical.Root>
        </>
    );
}
