"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface UserProfile {
  id: number;
  username: string;
  email: string;
  phone?: string;
  location?: string;
  business_category?: string;
  profile_image?: string;
  bio?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  tiktok?: string;
  contact_person_name?: string;
  contact_person_phone?: string;
  contact_person_email?: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [file, setFile] = useState<File | null>(null);

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (userId) fetchProfile(userId);
  }, [userId]);

  const fetchProfile = async (id: string) => {
    try {
      const res = await axios.get(
        `http://localhost/influencer_hub_server/users/getUserProfile.php?user_id=${id}`
      );
      if (res.data.success) {
        setUser(res.data.data);
        setFormData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    if (!user) return;

    const data = new FormData();
    data.append("id", String(user.id));
    Object.keys(formData).forEach((key) => {
      if (formData[key as keyof UserProfile] !== undefined) {
        data.append(key, formData[key as keyof UserProfile] as string);
      }
    });
    if (file) data.append("profile_image", file);

    try {
      const res = await axios.post(
        "http://localhost/influencer_hub_server/users/updateUserProfile.php",
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.data.success) {
        alert("Profile updated successfully!");
        fetchProfile(user.id.toString());
        setEditing(false);
        setFile(null);
      } else {
        alert("Update failed: " + res.data.message);
      }
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed");
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading profile...</p>;
  if (!user) return <p className="p-6 text-red-500">Profile not found</p>;

  return (
    <main className="max-w-5xl mx-auto p-6 md:p-12 flex flex-col gap-10">
      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-lg">
          <Image
            src={file ? URL.createObjectURL(file) : user.profile_image ? `http://localhost/influencer_hub_server/${user.profile_image}` : "/user-placeholder.png"}
            alt={user.username}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        {editing && (
          <label className="mt-2 flex flex-col text-sm text-gray-600">
            Profile Image
            <input type="file" onChange={handleFileChange} className="mt-1" />
          </label>
        )}

        <div className="flex-1 flex flex-col gap-2">
          <div className="flex items-center gap-4">
            {!editing ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
                <button
                  className="ml-auto px-4 py-2 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition"
                  onClick={() => setEditing(true)}
                >
                  Edit
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full md:w-auto">
                  <label className="text-sm font-medium text-gray-700">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username || ""}
                    onChange={handleChange}
                    className="border px-2 py-1 rounded w-full"
                  />
                </div>
                <button
                  onClick={handleSave}
                  className="ml-2 px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="ml-2 px-4 py-2 rounded-lg border border-gray-400 hover:bg-gray-100"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
          {!editing && <p className="text-gray-600 text-lg">@{user.username}</p>}
        </div>
      </section>

      {/* Business Category & About */}
      <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Business Category</h2>
          {!editing ? (
            <div className="flex flex-wrap gap-3">
              {user.business_category?.split(",").map((cat, i) => (
                <span key={i} className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm">{cat.trim()}</span>
              ))}
            </div>
          ) : (
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Business Category (comma separated)</label>
              <input
                type="text"
                name="business_category"
                value={formData.business_category || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">About Business</h3>
          {!editing ? (
            <p className="text-gray-600 leading-relaxed">{user.bio}</p>
          ) : (
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">About Business</label>
              <textarea
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded w-full"
              />
            </div>
          )}
        </div>
      </section>

      {/* Contact Person */}
      <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-gray-900">Contact Person</h2>
        {!editing ? (
          <>
            {user.contact_person_name && <p className="text-gray-700"><strong>Name:</strong> {user.contact_person_name}</p>}
            {user.contact_person_phone && <p className="text-gray-700"><strong>Phone:</strong> {user.contact_person_phone}</p>}
            {user.contact_person_email && <p className="text-gray-700"><strong>Email:</strong> {user.contact_person_email}</p>}
          </>
        ) : (
          <>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="contact_person_name" value={formData.contact_person_name || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Phone</label>
              <input type="text" name="contact_person_phone" value={formData.contact_person_phone || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input type="text" name="contact_person_email" value={formData.contact_person_email || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
            </div>
          </>
        )}
      </section>

      {/* Social Links */}
      <section className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-900">Social Links</h2>
        {!editing ? (
          <div className="flex gap-4 mt-2">
            {user.instagram && <a href={user.instagram} target="_blank" className="text-blue-500">Instagram</a>}
            {user.facebook && <a href={user.facebook} target="_blank" className="text-blue-700">Facebook</a>}
            {user.youtube && <a href={user.youtube} target="_blank" className="text-red-600">YouTube</a>}
            {user.tiktok && <a href={user.tiktok} target="_blank" className="text-black">TikTok</a>}
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">Instagram</label>
              <input type="text" name="instagram" value={formData.instagram || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
            </div>
            <div className="flex flex-col">
              <label id="facebook" className="text-sm font-medium text-gray-700">Facebook</label>
              <input type="text" name="facebook" value={formData.facebook || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">YouTube</label>
              <input type="text" name="youtube" value={formData.youtube || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-700">TikTok</label>
              <input type="text" name="tiktok" value={formData.tiktok || ""} onChange={handleChange} className="border px-2 py-1 rounded w-full" />
            </div>
          </>
        )}
      </section>

      <Link
        href="/login"
        className="mt-6 inline-block w-full text-center bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition"
      >
        Logout
      </Link>
    </main>
  );
}
