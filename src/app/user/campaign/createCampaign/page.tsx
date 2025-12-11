"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import apiList from "@/services/apiList";
import apiCall, { TMethods } from "@/services/apiMethodList";
import { useRouter } from "next/navigation";

export default function CreateCampaign() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
        if (!token) return alert("You must be logged in to create a campaign");

        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null) payload.append(key, value as any);
        });

        try {
            setLoading(true);
            const response = await apiCall(
                TMethods.post,
                apiList.createCampaign,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log(response);

            if (response.success === true) {
                alert("Campaign created successfully!");
                router.push('/user')
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred while creating the campaign");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-4 space-y-6 bg-white shadow-lg rounded-xl">
            {/* Step 1 */}
            {step === 1 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">Step 1: Campaign Details</h2>

                    <div>
                        <label className="text-sm font-medium">Campaign Title *</label>
                        <Input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Write campaign title"
                        />
                    </div>

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

                    <div>
                        <label className="text-sm font-medium">Goal *</label>
                        <Textarea
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            placeholder="Write campaign goal..."
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-500">{formData.goal.length}/500</p>
                    </div>

                    <div>
                        <label className="text-sm font-medium">Thumbnail</label>
                        <Input
                            type="file"
                            name="thumbnail"
                            accept="image/png, image/jpeg"
                            onChange={handleFileChange}
                        />
                        <p className="text-xs text-gray-400">Supported: PNG, JPEG</p>
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

                    <div>
                        <label className="text-sm font-medium">Budget *</label>
                        <Input
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            placeholder="Write campaign budget"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium">Timeline (Days) *</label>
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

                    <div>
                        <label className="text-sm font-medium">Creative Guidelines</label>
                        <Input
                            type="file"
                            name="creative"
                            accept="application/pdf,image/png,image/jpeg"
                            onChange={handleFileChange}
                        />
                        <p className="text-xs text-gray-400">Supported: PDF, PNG, JPEG</p>
                    </div>

                    <div className="flex justify-between">
                        <Button onClick={prev}>Previous</Button>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? "Creating..." : "Create Campaign"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
