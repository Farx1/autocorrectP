"use client";

import * as React from "react";
import { RiInformationFill } from "@remixicon/react";

import * as Button from "@/components/ui/button";
import * as Divider from "@/components/ui/divider";
import * as Hint from "@/components/ui/hint";
import * as Input from "@/components/ui/input";
import * as Label from "@/components/ui/label";
import * as Textarea from "@/components/ui/textarea";
import * as Tooltip from "@/components/ui/tooltip";
import { PhoneNumberInput } from "@/components/phone-number-input";
import { InfoCircleFilled } from "@/components/ui/icons";
import { useAuthStore } from "@/providers/auth-store-provider";

export default function ContactInformation() {
    const user = useAuthStore((state) => state.user);
    const uniqueId = React.useId();

    return (
        <div className="flex w-full flex-col gap-4">
            <div>
                <div className="text-label-md">Contact Information</div>
                <p className="mt-1 text-paragraph-sm text-text-sub-600">
                    Enter your contact details for communication.
                </p>
            </div>

            <Divider.Root variant="line-spacing" />

            <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                    <Label.Root htmlFor={`${uniqueId}-email`}>
                        Email Address <Label.Asterisk />
                    </Label.Root>

                    <Input.Root>
                        <Input.Wrapper>
                            <Input.Input
                                id={`${uniqueId}-email`}
                                type="email"
                                defaultValue={user?.email}
                            />
                        </Input.Wrapper>
                    </Input.Root>
                </div>

                <div className="flex flex-col gap-1">
                    <Label.Root htmlFor={`${uniqueId}-phone`}>
                        Phone Number <Label.Sub>(Optional)</Label.Sub>
                        <Tooltip.Root>
                            <Tooltip.Trigger>
                                <InfoCircleFilled className="size-5 text-text-disabled-300" />
                            </Tooltip.Trigger>
                            <Tooltip.Content side="top" size="xsmall">
                                Enter your phone number without the country
                                code, as it is selected separately. Only numbers
                                are allowed.
                            </Tooltip.Content>
                        </Tooltip.Root>
                    </Label.Root>

                    <PhoneNumberInput inputId={`${uniqueId}-phone`} />
                </div>

                <div className="flex flex-col gap-1">
                    <Label.Root htmlFor={`${uniqueId}-address`}>
                        Address <Label.Asterisk />
                    </Label.Root>

                    <Textarea.Root
                        className="min-h-[58px]"
                        id={`${uniqueId}-address`}
                        placeholder="Enter your full address here..."
                    >
                        <Textarea.CharCounter current={0} max={200} />
                    </Textarea.Root>

                    <Hint.Root>
                        <Hint.Icon as={RiInformationFill} />
                        Input your residential address for HR records.
                    </Hint.Root>
                </div>
            </div>

            <div className="mt-1 grid grid-cols-2 gap-3">
                <Button.Root variant="neutral" mode="stroke">
                    Discard
                </Button.Root>
                <Button.Root>Apply Changes</Button.Root>
            </div>
        </div>
    );
}
