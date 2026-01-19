"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function EditServiceForm({ serviceId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    city: "",
    price: "",
    description: "",
    image: "",
    available: true,
  });

  // 🔹 Fetch existing service
  useEffect(() => {
    if (!serviceId) return;

    setLoading(true);
    fetch(`/api/services/${serviceId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setForm(data.service);
        } else {
          toast.error(data.error || "Failed to load service");
        }
      })
      .catch((err) => {
        toast.error(err.message || "Failed to load service");
      })
      .finally(() => setLoading(false));
  }, [serviceId]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 🔹 Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Service updated successfully!");
        router.push("/dashboard/all-services");
      } else {
        toast.error(result.error || "Failed to update service");
      }
    } catch (err) {
      toast.error(err.message || "Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.title) {
    return <div className="p-8 text-center">Loading service...</div>;
  }

  return (
    <>
      <Toaster position="top-right" />

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 max-w-2xl space-y-4 rounded-xl bg-white p-8 shadow"
      >
        <h2 className="mb-4 text-2xl font-bold text-blue-700">
          Edit Service
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Service Title"
            className="w-full rounded border px-3 py-2"
          />

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
            placeholder="City"
            className="w-full rounded border px-3 py-2"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            required
            type="number"
            min="0"
            placeholder="Price"
            className="w-full rounded border px-3 py-2"
          />

          <input
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          placeholder="Service Description"
          className="min-h-20 w-full rounded border px-3 py-2"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          Available
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full cursor-pointer rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Service"}
        </button>
      </form>
    </>
  );
}
