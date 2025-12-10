"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateCampaign() {
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        goal: "",
        thumbnail: null as File | null,
        budget: "",
        timeline: "",
        deliverables: "",
        creative: null as File | null,
    });

    // Text input handler
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // File input handler
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData({ ...formData, [name]: files[0] });
        }
    };

    const next = () => setStep((s) => Math.min(3, s + 1));
    const prev = () => setStep((s) => Math.max(1, s - 1));

    const handleSubmit = async () => {
        const token = localStorage.getItem("token");
        const payload = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) {
                payload.append(key, value as any);
            }
        });

        const res = await fetch(
            "http://localhost/influencer_hub_server/campaign/createCampaign.php",
            {
                method: "POST",
                body: payload,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();
        alert(data.success ? "Campaign created successfully!" : data.message);
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6">
            {/* Step 1 */}
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Step 1: Campaign Details</h2>

                    {/* Title */}
                    <div>
                        <label className="text-sm font-medium">Campaign Title *</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Write campaign title"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-sm font-medium">Description *</label>
                        <Textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Write brief description..."
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500">
                            {formData.description.length}/500
                        </p>
                    </div>

                    {/* Goal */}
                    <div>
                        <label className="text-sm font-medium">Goal *</label>
                        <Textarea
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            placeholder="Write campaign goal..."
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500">
                            {formData.goal.length}/500
                        </p>
                    </div>

                    {/* Thumbnail */}
                    <div>
                        <label className="text-sm font-medium">Thumbnail</label>
                        <Input
                            type="file"
                            name="thumbnail"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                        />
                        <p className="text-xs text-muted-foreground">
                            Supported: PNG, JPEG
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={next}>Next</Button>
                    </div>
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Step 2: Budget & Timeline</h2>

                    {/* Budget */}
                    <div>
                        <label className="text-sm font-medium">Budget *</label>
                        <Input
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder="Write campaign budget"
                        />
                    </div>

                    {/* Timeline */}
                    <div>
                        <label className="text-sm font-medium">Campaign Timeline (Days) *</label>
                        <Input
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            placeholder="e.g. 25"
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button onClick={prev}>Previous</Button>
                        <Button onClick={next}>Next</Button>
                    </div>
                </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Step 3: Deliverables & Creative</h2>

                    {/* Deliverables */}
                    <div>
                        <label className="text-sm font-medium">Deliverables *</label>
                        <Textarea
                            name="deliverables"
                            value={formData.deliverables}
                            onChange={handleChange}
                            placeholder="Write deliverables..."
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500">
                            {formData.deliverables.length}/500
                        </p>
                    </div>

                    {/* Creative File */}
                    <div>
                        <label className="text-sm font-medium">Creative Guidelines</label>
                        <Input
                            type="file"
                            name="creative"
                            accept="application/pdf,image/png,image/jpeg"
                            onChange={handleFileChange}
                        />
                        <p className="text-xs text-muted-foreground">
                            Supported: PDF, PNG, JPEG
                        </p>
                    </div>

                    <div className="flex justify-between">
                        <Button onClick={prev}>Previous</Button>
                        <Button onClick={handleSubmit}>Create Now</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
